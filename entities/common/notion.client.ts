import { cache } from 'react'
import { Client } from '@notionhq/client'

export const notion = cache(
    () =>
        new Client({
            auth: process.env.NOTION_API_KEY,
        }),
)
