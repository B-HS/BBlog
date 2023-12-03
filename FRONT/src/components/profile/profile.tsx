import { adminProfile } from '@/api/user/user'
import { cn } from '@/lib/utils'
import Flex from '../flex'
import UpdownAnime from '../transition/updown'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { DELAY } from '@/lib/constant'

const Profile = async ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const bloginfo = await adminProfile(true)

    return (
        <Flex className={cn('max-h-72 h-72 flex-col justify-center items-center gap-5', className)} {...props}>
            <UpdownAnime className='flex flex-col justify-center items-center gap-5' delay={DELAY(1)}>
                <Avatar className='h-[12rem] w-[12rem]'>
                    <AvatarImage src='https://avatars.githubusercontent.com/u/49316060' alt={bloginfo.nickname} />
                    <AvatarFallback>{bloginfo.nickname}</AvatarFallback>
                </Avatar>
                <p className='text-center break-all' dangerouslySetInnerHTML={{ __html: bloginfo.introduce ? bloginfo.introduce : '' }}></p>
            </UpdownAnime>
        </Flex>
    )
}
export default Profile
