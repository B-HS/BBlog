import { readFileSync } from 'fs'
import { drizzle } from 'drizzle-orm/mysql2'
import * as mysql from 'mysql2/promise'
import * as schema from '../db/schema'
import * as relations from '../db/relations'
import sharp from 'sharp'
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

const { imageAssets, images, messageImages, messages } = schema

const LOG_USER_ID = 'wbRMlIqXHbqzHUAI0OM5MFRyNiIVCdpP'

const poolConnection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT!),
    user: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
})

const db = drizzle(poolConnection, { schema: { ...schema, ...relations }, mode: 'default' })

const R2Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_END_POINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
})

const uploadImage = async (file: File, fileName: string) => {
    const fileBuffer = await file.arrayBuffer()
    const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET || '',
        Key: fileName,
        Body: new Uint8Array(fileBuffer),
    })
    const response = await R2Client.send(command)
    return {
        url: `${process.env.R2_CUSTOME_DOMAIN}/${fileName}`,
        ...response,
    }
}

const createImage = async (data: {
    userId: string
    fileName: string
    originalName: string
    url: string
    mimeType: string
    fileSize: number
    width: number
    height: number
}) => {
    const [image] = await db.insert(images).values(data).$returningId()
    return image
}

type MisskeyFile = {
    id: string
    name: string
    type: string
    md5: string
    size: number
    url: string
    thumbnailUrl: string
    properties: {
        width: number
        height: number
    }
}

type MisskeyNote = {
    id: string
    text: string | null
    createdAt: string
    fileIds: string[]
    files: MisskeyFile[]
}

const downloadImage = async (url: string) => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Failed to download image: ${response.statusText}`)
    }
    const buffer = await response.arrayBuffer()
    return Buffer.from(buffer)
}

const processAndUploadImage = async (imageBuffer: Buffer, originalName: string) => {
    const fileName = `${crypto.randomUUID()}.webp`

    const sharpInstance = sharp(imageBuffer)
    const metadata = await sharpInstance.metadata()
    const convertedBuffer = await sharpInstance.webp({ quality: 80 }).toBuffer()

    const webpFile = new File([new Uint8Array(convertedBuffer)], fileName, { type: 'image/webp' })

    const uploadResult = await uploadImage(webpFile, fileName)

    await createImage({
        userId: LOG_USER_ID,
        fileName,
        originalName,
        url: uploadResult.url,
        mimeType: 'image/webp',
        fileSize: convertedBuffer.byteLength,
        width: metadata.width || 0,
        height: metadata.height || 0,
    })

    const imageAssetId = crypto.randomUUID()
    await db.insert(imageAssets).values({
        id: imageAssetId,
        r2Key: fileName,
        bucket: 'default',
        mimeType: 'image/webp',
        sizeBytes: convertedBuffer.byteLength,
        width: metadata.width || null,
        height: metadata.height || null,
        checksum: null,
        uploadedBy: LOG_USER_ID,
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    return imageAssetId
}

const migrateNote = async (note: MisskeyNote) => {
    if (!note.text) {
        console.log(`Skipping note ${note.id}: no text`)
        return
    }

    const imageIds: string[] = []

    if (note.files && note.files.length > 0) {
        for (const file of note.files) {
            try {
                console.log(`Downloading image: ${file.url}`)
                const imageBuffer = await downloadImage(file.url)
                const imageId = await processAndUploadImage(imageBuffer, file.name)
                imageIds.push(imageId)
                console.log(`Successfully uploaded image: ${file.name} -> ${imageId}`)
            } catch (error) {
                console.error(`Failed to process image ${file.url}:`, error)
            }
        }
    }

    const messageId = crypto.randomUUID()
    const createdAt = new Date(note.createdAt)

    await db.insert(messages).values({
        id: messageId,
        userId: LOG_USER_ID,
        body: note.text,
        replyToId: null,
        retweetOfId: null,
        createdAt,
        updatedAt: createdAt,
    })

    if (imageIds.length > 0) {
        await db.insert(messageImages).values(
            imageIds.map((imageId, index) => ({
                messageId,
                imageId,
                order: index,
                createdAt,
            })),
        )
    }

    console.log(`Migrated note ${note.id} -> message ${messageId}`)
}

const main = async () => {
    try {
        console.log('Reading backup.json...')
        const backupData = readFileSync('./backup.json', 'utf-8')
        const notes: MisskeyNote[] = JSON.parse(backupData)

        console.log(`Found ${notes.length} notes`)

        for (let i = 0; i < notes.length; i++) {
            const note = notes[i]
            console.log(`\nProcessing note ${i + 1}/${notes.length} (${note.id})`)
            try {
                await migrateNote(note)
            } catch (error) {
                console.error(`Failed to migrate note ${note.id}:`, error)
            }
        }

        console.log('\nMigration completed!')
    } catch (error) {
        console.error('Migration failed:', error)
        process.exit(1)
    }
}

main()
