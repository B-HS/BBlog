'use client'
import { getAllpostByKeyword } from '@/api/article/post'
import { loadMenu } from '@/api/menu/menu'
import { Article } from '@/components/article/articleContext'
import Flex from '@/components/flex'
import { Command, CommandInput } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { buttonVariants } from '../../ui/button'
const Search = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isOnSearch, setIsOnSearch] = useState(false)
    const [timeoutList, setTimeoutList] = useState<NodeJS.Timeout[]>([])
    const [posts, setPosts] = useState<Article[]>([])
    const router = useRouter()
    const redirectToPost = (post: Article) => {
        router.push(`/${post.category?.toLowerCase() || 'post'}/${post.aid}`)
        setIsOpen(false)
    }

    const searchEvent = async (keyword: string) => {
        timeoutList.forEach((ele) => clearTimeout(ele))
        setTimeoutList([])
        setPosts(() => [])
        setIsOnSearch(true)
        const timeout = setTimeout(async () => {
            if (keyword === '') {
                setIsOnSearch(false)
                return
            }
            const menus = await loadMenu()
            const posts = await getAllpostByKeyword(keyword)
            const remappedPosts = posts.map((ele: { mekey: any }) => ({
                ...ele,
                category: menus.find((me: { mekey: any }) => me.mekey === ele.mekey)!.mename,
            }))
            setPosts(() => [...remappedPosts])
            setIsOnSearch(false)
        }, 500)
        setTimeoutList(() => [timeout])
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
                <SearchIcon />
            </PopoverTrigger>
            <PopoverContent className='p-0 sm:w-[639px] transition-all'>
                <Command>
                    <CommandInput onValueChange={searchEvent} />

                    <Flex className='flex-col p-0 divide-y-2'>
                        {isOnSearch && (
                            <Flex className='p-3 w-full h-full justify-center items-center'>
                                <SearchIcon className='animate-bounce' />
                            </Flex>
                        )}
                        {!isOnSearch &&
                            posts.map((ele, idx) => (
                                <Flex
                                    onClick={() => redirectToPost(ele)}
                                    key={idx}
                                    className='cursor-pointer px-3 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all'
                                >
                                    <Flex className='p-0 flex-1 justify-start gap-2 items-center'>
                                        <span>{ele.title}</span> <span className='opacity-50 text-xs'>- {ele.category}</span>
                                    </Flex>
                                </Flex>
                            ))}
                        {!isOnSearch && posts.length === 0 && (
                            <Flex className='p-3 w-full h-full justify-center items-center'>
                                <span>No result</span>
                            </Flex>
                        )}
                    </Flex>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default Search
