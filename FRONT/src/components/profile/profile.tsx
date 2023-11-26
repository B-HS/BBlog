import { cn } from '@/lib/utils'
import Flex from '../flex'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const Profile = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const markdownText = `STRING_LENGH_MAX_100STRING_LENGH_MAX_100STRING_LENGH_MAX_100STRING_LENGH_MAX_100STRING_LENGH_MAX_100`
    return (
        <Flex className={cn('max-h-56 flex-col justify-center items-center gap-2 mt-5', className)} {...props}>
            <Avatar className='h-28 w-28'>
                <AvatarImage src='' alt='USERNAME' />
                <AvatarFallback>USER NAME</AvatarFallback>
            </Avatar>
            <p className='text-center break-all' dangerouslySetInnerHTML={{ __html: markdownText }}></p>
        </Flex>
    )
}
export default Profile
