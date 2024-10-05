import { SessionProvider as Provider } from 'next-auth/react'
import { ReactNode } from 'react'

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    return <Provider>{children}</Provider>
}
