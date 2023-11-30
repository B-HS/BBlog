'use client'
import { LoadingContext } from '@/module/context/loading'
import axios from 'axios'
import { useContext, useMemo } from 'react'

const AxiosProvider = ({ children }: { children: React.ReactNode }) => {
    const { setLoading } = useContext(LoadingContext)
    useMemo(() => {
        axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACK
        axios.interceptors.request.use(
            (config) => {
                setLoading(true)
                return config
            },
            (error) => {
                setLoading(false)
                return Promise.reject(error)
            },
        )
        axios.interceptors.response.use(
            (response) => {
                setLoading(false)
                return response
            },
            (error) => {
                setLoading(false)
                return Promise.reject(error)
            },
        )
    }, [setLoading])
    return <>{children}</>
}

export default AxiosProvider
