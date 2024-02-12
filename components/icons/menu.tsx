'use client'
import { MenuIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { FrontmatterProps } from '../mdx/custom-mdx'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

const Menu = ({ articleInfo }: { articleInfo: Partial<FrontmatterProps>[] | undefined }) => {
    const [categories, setCategories] = useState<string[]>(['ALL'])
    const [tags, setTags] = useState<string[]>([])

    useEffect(() => {
        if (articleInfo) {
            const uniqueCategories: Set<string> = new Set(['ALL'])
            const uniqueTags: Set<string> = new Set()

            articleInfo.forEach((article) => {
                const { category, tags: articleTags } = article
                if (category) uniqueCategories.add(category)
                if (articleTags) articleTags.forEach((tag) => uniqueTags.add(tag))
            })

            setCategories(Array.from(uniqueCategories))
            setTags(Array.from(uniqueTags))
        }
    }, [articleInfo])

    return (
        <Dialog modal={false}>
            <DialogTrigger>
                <Button variant='ghost' size='icon' className='p-2 cursor-pointer' asChild>
                    <MenuIcon />
                </Button>
            </DialogTrigger>
            <DialogContent className='backdrop-blur-md h-screen w-screen max-w-full'>
                <MenuSection title='Menu' items={categories} />
                <MenuSection title='Tags' items={tags} />
            </DialogContent>
        </Dialog>
    )
}

const MenuSection = ({ title, items }: { title: string; items: string[] }) => (
    <section className='p-3'>
        <p className='text-2xl'>{title}</p>
        <section className='flex gap-1 p-3 flex-wrap'>
            {items.map((item, idx) => (
                <Badge key={idx}>{item}</Badge>
            ))}
        </section>
    </section>
)

export default Menu
