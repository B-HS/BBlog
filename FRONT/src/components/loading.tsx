'use client'

import { LoadingContext } from '@/module/context/loading'
import { Loader2Icon } from 'lucide-react'
import { useContext } from 'react'
import Flex from './flex'

const Loading = () => {
    const { isLoading } = useContext(LoadingContext)

    return (
        isLoading && (
            <Flex className='fixed z-[9999] w-full h-full items-center justify-center backdrop-blur-sm transition-all'>
                <Loader2Icon className='animate-spin' />
            </Flex>
        )
    )
}

export default Loading
