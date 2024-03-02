'use client'
import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@/components/ui/menubar'
import { MenuIcon, TagIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FrontmatterProps } from '../mdx/custom-mdx'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'

const Menu = ({ articleInfo }: { articleInfo: Partial<FrontmatterProps>[] | undefined }) => {
    const [categories, setCategories] = useState<string[]>(['All'])
    const [tags, setTags] = useState<string[]>([])

    useEffect(() => {
        if (articleInfo) {
            const uniqueCategories: Set<string> = new Set(['All'])
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
        <Menubar className='border-none p-0 space-0'>
            <MenubarMenu>
                <MenubarTrigger className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'p-2 cursor-pointer' })} aria-label='Menu'>
                    <MenuIcon />
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarGroup className='flex justify-center items-center font-bold'>
                        <MenuIcon className='py-1 pb-2' />
                        <span>Menu</span>
                    </MenubarGroup>
                    {categories.map((ele, idx) => (
                        <section key={ele + idx}>
                            <MenubarSeparator />
                            <Link href={`/article?menu=${ele}`}>
                                <MenubarItem className='cursor-pointer'>{ele}</MenubarItem>
                            </Link>
                        </section>
                    ))}
                    <MenubarSeparator />
                    <MenubarGroup className='flex justify-center items-center font-bold'>
                        <TagIcon className='py-1 pb-2' />
                        <span>Tags</span>
                    </MenubarGroup>
                    {tags.map((ele, idx) => (
                        <section key={ele + idx}>
                            <MenubarSeparator />
                            <Link href={`/article?tags=${ele}`}>
                                <MenubarItem className='cursor-pointer'>{ele}</MenubarItem>
                            </Link>
                        </section>
                    ))}
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}
export default Menu
