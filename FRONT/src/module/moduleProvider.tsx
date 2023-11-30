'use client'
import { useState } from 'react'
import { LoadingContext } from './context/loading'
import { UserContext, UserData, getInitialUserData } from './context/user'
import AxiosProvider from './modules/axios'
import ThemeProvider from './modules/theme'

const ModuleProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userdata, setUserData] = useState<UserData['userdata']>(getInitialUserData())

    return (
        <ThemeProvider attribute='class'>
            <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
                <UserContext.Provider value={{ userdata, setUser: setUserData }}>
                    <AxiosProvider>{children}</AxiosProvider>
                </UserContext.Provider>
            </LoadingContext.Provider>
        </ThemeProvider>
    )
}

export default ModuleProvider
