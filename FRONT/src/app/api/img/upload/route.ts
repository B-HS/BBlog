import { PutObjectCommand } from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'
import { R2Client } from '../../r2client'

const uploadImg = async (file: Buffer, fileName: string) => {
    const fileBuffer: Buffer = file
    const command = new PutObjectCommand({
        Bucket: process.env.NEXT_R2_BUCKET_NAME,
        Key: `${fileName}`,
        Body: fileBuffer,
        ContentType: 'image/jpg',
    })
    await R2Client.send(command)
    return fileName
}

export const POST = async (request: NextRequest) => {
    try {
        const form = await request.formData()
        const file = form.get('file') as File
        if (!file) return NextResponse.json({ error: 'File is required.' })
        const buffer = Buffer.from(await file.arrayBuffer())
        const fileName = await uploadImg(buffer, file.name)

        return NextResponse.json(fileName)
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}
