import dayjs from 'dayjs'
import { MessageSquareIcon, MoreHorizontalIcon } from 'lucide-react'
import Flex from '../flex'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

export interface Comment {
    cid: number
    aid: number
    nickname: string
    img: string
    context: string
    commentorder: number
    uppercid: number
    insertdate: null | string
    children?: Comment[]
    level: number
}

const ArticleComement = ({ data }: { data: Comment }) => {
    const isCildrenBorder = data.level > 0 ? { borderTop: 0 } : {}
    return (
        <Flex className='flex-col border dark:shadow-neutral-900' style={{ marginLeft: `${data.level * 50}px`, ...isCildrenBorder }}>
            <Flex className='gap-2 items-center'>
                <Avatar className='border'>
                    <AvatarImage src={data.img ? data.img : '/favicon.ico'} alt='usericon' />
                    <AvatarFallback>{data.nickname.split(' ').length === 1 ? data.nickname.slice(0, 2) : data.nickname}</AvatarFallback>
                </Avatar>
                <Flex className='gap-2 items-baseline -translate-y-0.5'>
                    <span className='text-lg font-bold'>{data.nickname}</span>
                    <span className='text-sm opacity-50'>{dayjs(data.insertdate, { format: 'YYYYMMDDHHmmss' }).format('YYYY. MM. DD. HH:mm')}</span>
                </Flex>
            </Flex>
            <section className='px-3.5 py-2'>
                <p>{data.context}</p>
            </section>
            <Flex className='p-1.5 gap-2'>
                <Button size={'icon'} variant={'ghost'}>
                    <MessageSquareIcon />
                </Button>
                <Button size={'icon'} variant={'ghost'}>
                    <MoreHorizontalIcon />
                </Button>
            </Flex>
        </Flex>
    )
}

export default ArticleComement
