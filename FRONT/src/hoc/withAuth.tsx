'use client'
import { tokenCheck } from '@/lib/token'
import { useRouter } from 'next/navigation'
import { ComponentType, FC, useEffect } from 'react'

const WithAuth = <T extends object>(Component: ComponentType<T>) => {
    const AuthContainer: FC<T> = (props: T) => {
        const router = useRouter()
        useEffect(() => {
            if (!tokenCheck()) {
                router.push('/')
            }
        }, [router])
        return <Component {...props} />
    }
    return AuthContainer
}

export default WithAuth
