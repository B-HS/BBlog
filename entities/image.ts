import 'server-only'
import { DeleteObjectCommand, ListObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { db } from '@db/db'
import { images } from '@db/schema'
import { desc, InferSelectModel } from 'drizzle-orm'

export type Image = InferSelectModel<typeof images>

const R2Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_END_POINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
})

export const uploadImage = async (file: File, fileName: string) => {
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

export const deleteImageByFileName = async (fileName: string) => {
    const command = new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET || '',
        Key: fileName,
    })
    await R2Client.send(command)
}

export const getList = async () => {
    const command = new ListObjectsCommand({
        Bucket: process.env.R2_BUCKET || '',
    })
    return await R2Client.send(command)
}

export const createImage = async (data: {
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

export const getImageList = async () => await db.select().from(images).orderBy(desc(images.createdAt))

export const postUploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    return await fetch('/api/image/upload', {
        method: 'POST',
        body: formData,
    })
}
