import Github from '@/components/icons/github'
import Misskey from '@/components/icons/misskey'
import Resume from '@/components/icons/resume'
import PostTile from '@/components/post/post-tile'
import { Separator } from '@/components/ui/separator'
import { getFileInfo } from '@/lib/files'
const Page = async () => {
    const posts = await getFileInfo(true)
    return (
        <section className='py-10 space-y-2 flex flex-col items-center justify-start'>
            <p className='text-5xl font-extrabold tracking-widest'>blog.</p>
            <section className='space-x-1'>
                <Github variant='outline' />
                <Resume variant='outline' />
                <Misskey variant='outline' />
            </section>

            <Separator className='w-20 h-2' />
            <section className='flex flex-col items-center p-3'>
                <p className='text-3xl font-bold'>Recent Posts</p>
            </section>
            <section className='flex flex-wrap gap-2 justify-center'>
                {posts.splice(0, 3).map((ele, idx) => (
                    <PostTile post={ele} key={idx} />
                ))}
            </section>
        </section>
    )
}

export default Page
