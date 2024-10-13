import { Squirrel } from 'lucide-react'

export const NoMisskeyKey = () => {
    return (
        <section className='flex justify-center items-center flex-col gap-2 py-10'>
            <Squirrel className='animate-bounce' size={63} />
            <p className='text-xl font-bold'>
                No Misskey <span className='underline'>user ID</span> or <span className='underline'>instance URL</span> found in the environment
                variables.
            </p>
            <p className='text-lg'>Please set them in the .env file.</p>
        </section>
    )
}
