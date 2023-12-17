'use client'
import { tokenCheck } from '@/lib/token'
import { LoadingContext } from '@/module/context/loading'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { useContext, useMemo } from 'react'

const AxiosProvider = ({ children }: { children: React.ReactNode }) => {
    const { setLoading } = useContext(LoadingContext)
    useMemo(async () => {
        axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACK
        await tokenCheck()
        const atk = getCookie('atk')
        const rtk = getCookie('rtk')
        if (atk && rtk) {
            axios.defaults.headers.common['atk'] = `Bearer ${atk}`
            axios.defaults.headers.common['rtk'] = rtk
        }

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
