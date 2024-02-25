import { ListObjectsCommand } from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'
import { R2Client } from '../../r2client'

const imgList = async () => {
    const command = new ListObjectsCommand({
        Bucket: 'blog',
    })
    const list = await R2Client.send(command)
    return list
}

export const POST = async (request: NextRequest) => {
    try {
        const filelist = await imgList()
        const contents = filelist.Contents
        return NextResponse.json(contents?.filter((file) => !file.Key?.includes('HIDE_')))
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}
