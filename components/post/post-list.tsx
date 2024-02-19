'use client'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Grid2X2, List } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { FrontmatterProps } from '../mdx/custom-mdx'
import PostTile from './post-tile'
import PostTileLong from './post-tile-long'

const PostList = ({ which, posts }: { which: string; posts: Partial<FrontmatterProps>[] }) => {
    const menulist = ['ALL', ...Array.from(new Set(posts.map((ele) => ele.category)))]
    const [listtype, setListtype] = useState('list')
    const param = useSearchParams()
    const postlist = useMemo(
        () =>
            posts.filter((ele) => {
                const target = param.toString().split('=')[1]
                return target === 'ALL' ? true : ele.category === param.toString().split('=')[1]
            }),
        [posts, param],
    )
    return (
        <section className='p-3'>
            <section className='flex justify-between'>
                <ToggleGroup type='single' variant={'outline'} className='justify-start' defaultValue={param.toString().split('=')[1]}>
                    {menulist.map((ele, idx) => (
                        <Link key={which + idx} href={`/article?menu=${ele}`}>
                            <ToggleGroupItem value={ele!} aria-label={which + idx}>
                                {ele}
                            </ToggleGroupItem>
                        </Link>
                    ))}
                </ToggleGroup>
                <ToggleGroup type='single' variant={'outline'} className='justify-end' value={listtype}>
                    <ToggleGroupItem value='list' onClick={() => setListtype('list')}>
                        <List />
                    </ToggleGroupItem>
                    <ToggleGroupItem value='grid' onClick={() => setListtype('grid')}>
                        <Grid2X2 />
                    </ToggleGroupItem>
                </ToggleGroup>
            </section>
            {listtype === 'grid' ? (
                <section className='flex flex-wrap w-full gap-3 mt-3'>
                    {postlist.map((ele, idx) => (
                        <PostTile key={idx} post={ele} />
                    ))}
                </section>
            ) : (
                <section className='w-full mt-3 flex flex-col gap-3'>
                    {postlist.map((ele, idx) => (
                        <PostTileLong key={idx} post={ele} />
                    ))}
                </section>
            )}
        </section>
    )
}

export default PostList
