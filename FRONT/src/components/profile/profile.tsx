'use client'
import { adminProfile } from '@/api/user/user'
import { DELAY } from '@/lib/constant'
import { cn } from '@/lib/utils'
import DOMPurify from 'isomorphic-dompurify'
import { useEffect, useState } from 'react'
import Flex from '../flex'
import UpdownAnime from '../transition/updown'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const Profile = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const [bloginfo, setBloginfo] = useState<Record<string, string | number | boolean>>()
    const context = () => DOMPurify.sanitize((bloginfo?.introduce as string) || '')
    useEffect(() => {
        const getbloginfo = async () => setBloginfo(await adminProfile())
        getbloginfo()
    }, [])
    return (
        !!bloginfo && (
            <Flex className={cn('max-h-72 h-72 flex-col justify-center items-center gap-5', className)} {...props}>
                <UpdownAnime className='flex flex-col justify-center items-center gap-5' delay={DELAY(1)}>
                    <Avatar className='h-[12rem] w-[12rem]'>
                        <AvatarImage
                            src={bloginfo.img ? `https://img.gumyo.net/${bloginfo.img}` : 'https://avatars.githubusercontent.com/u/49316060'}
                            alt={bloginfo.nickname as string}
                        />
                        <AvatarFallback>{bloginfo.nickname}</AvatarFallback>
                    </Avatar>
                    <p className='text-center break-all' dangerouslySetInnerHTML={{ __html: context() }}></p>
                </UpdownAnime>
            </Flex>
        )
    )
}
export default Profile
