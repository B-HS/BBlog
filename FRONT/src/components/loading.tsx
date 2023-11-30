'use client'
import { LoadingContext } from '@/module/context/loading'
import { Loader2Icon } from 'lucide-react'
import { useContext } from 'react'
import Flex from './flex'

const Loading = () => {
    const { isLoading } = useContext(LoadingContext)
    return (
        isLoading && (
            <Flex className='absolute z-[9999] w-full h-full items-center justify-center bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 backdrop-blur-sm'>
                <Loader2Icon className='animate-spin' />
            </Flex>
        )
    )
}

export default Loading
