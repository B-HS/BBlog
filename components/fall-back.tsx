import { BirdIcon } from 'lucide-react'

const Fallback = () => {
    return (
        <section className='mx-auto text-center container max-w-screen-lg py-7'>
            <BirdIcon className='animate-bounce mx-auto' />
            <span>Now on loading...</span>
        </section>
    )
}

export default Fallback
