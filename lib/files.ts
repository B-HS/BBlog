import { FrontmatterProps } from '@/components/mdx/custom-mdx'
import fs from 'fs/promises'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'

export const getFileInfo = async (recent?: boolean) => {
    try {
        const filePath = path.join(process.cwd(), 'public', 'post')
        const files = await fs.readdir(filePath, 'utf-8')
        const fileInfoPromises = files.map(async (file) => {
            const source = await fs.readFile(path.join(filePath, file), 'utf-8')
            const { frontmatter } = await compileMDX<Partial<FrontmatterProps>>({
                source,
                options: {
                    parseFrontmatter: true,
                },
            })
            return { ...frontmatter, file, category: frontmatter.category || 'NO_CATEGORY' }
        })
        const list = await Promise.all(fileInfoPromises)
        recent && list.sort((prev, next) => Number(next.date) - Number(prev.date))
        return list
    } catch (error) {
        return []
    }
}
