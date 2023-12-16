'use client'
import { tokenCheck } from '@/lib/token'
import { ComponentType, FC } from 'react'

const WithAuth = <T extends object>(Component: ComponentType<T>) => {
    const AuthContainer: FC<T> = (props: T) => {
        if (!tokenCheck()) {
            window.location.href = '/'
            return null
        }
        return <Component {...props} />
    }
    return AuthContainer
}

export default WithAuth
