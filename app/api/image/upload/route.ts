import { createImage, deleteImageByFileName, uploadImage } from '@entities/image'
import { auth } from '@lib/auth/auth'

import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

export const POST = async (request: NextRequest) => {
    const session = await auth.api.getSession({ headers: request.headers })
    if (session?.user.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const formData = await request.formData()
    const file = formData.get('image') as File
    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()
    const fileName = `${crypto.randomUUID()}.webp`

    const sharpInstance = sharp(buffer)
    const metadata = await sharpInstance.metadata()
    const convertedBuffer = await sharpInstance.webp().toBuffer()

    const webpFile = new File([new Uint8Array(convertedBuffer)], fileName, { type: 'image/webp' })

    try {
        const uploadResult = await uploadImage(webpFile, fileName)

        await createImage({
            userId: session.user.id,
            fileName,
            originalName: file.name,
            url: uploadResult.url,
            mimeType: 'image/webp',
            fileSize: convertedBuffer.byteLength,
            width: metadata.width || 0,
            height: metadata.height || 0,
        })

        return NextResponse.json({ url: uploadResult.url })
    } catch (error) {
        await deleteImageByFileName(fileName)
        return NextResponse.json({ error: 'Failed to save image' }, { status: 500 })
    }
}
