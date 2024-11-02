import { randomUUID } from 'crypto'
import { db } from 'drizzle'
import { images } from 'drizzle/schema'
import { NextRequest, NextResponse } from 'next/server'

export const imageGet = async (req: NextRequest, { params }: { params: { file: string } }) => {
    const isThumbnail = Number(req.nextUrl.searchParams.get('thumbnail') || false)
    const fileName = params.file
    const thumbnail = isThumbnail ? '?thumbnail=true' : ''

    const imageFileResponse = await fetch(`${process.env.IMAGE_SERVER_URL}/${fileName}${thumbnail}`)

    const contentType = imageFileResponse.headers.get('content-type') || 'application/octet-stream'
    const imageBuffer = await imageFileResponse.arrayBuffer()

    return new NextResponse(imageBuffer, {
        status: 200,
        headers: {
            'Content-Type': contentType,
            'Content-Length': imageFileResponse.headers.get('content-length') || '',
        },
    })
}

const GET = async () => {
    try {
        const filelist = await db.select().from(images)
        const refectoredFileList = filelist.map((file) => ({
            name: file.orgName,
            url: `/api/image/${file.imageId}.webp`,
            date: file.createdAt,
        }))

        return NextResponse.json(refectoredFileList)
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const formData = await request.formData()
        const files = formData.getAll('file') as File[]

        const imagePromise = files.map(async (file) => {
            const [fileName, fileExtension] = file.name.split('.')
            const fileUUID = randomUUID()
            const form = new FormData()
            form.append('file', file, `${fileUUID}.${fileExtension}`)
            const uploadResult = await fetch(`${process.env.IMAGE_SERVER_URL}/image/upload`, {
                method: 'POST',
                body: form,
            }).then((res) => res.json())

            if (uploadResult.error) {
                return {
                    imageId: fileUUID + `.${fileExtension}`,
                    orgName: fileName + `.${fileExtension}`,
                    createdAt: new Date(),
                    status: 'failed',
                }
            }
            await db
                .insert(images)
                .values({
                    imageId: fileUUID,
                    orgName: fileName,
                    extension: fileExtension,
                    createdAt: new Date(),
                })
                .$returningId()

            return {
                imageId: fileUUID,
                orgName: fileName,
                createdAt: new Date(),
                status: 'success',
            }
        })

        const result = await Promise.all(imagePromise)

        return NextResponse.json({ message: 'Files uploaded successfully', data: result }, { status: 200 })
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export const fileApi = { GET, POST, imageGet }
