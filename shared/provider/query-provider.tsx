'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { query } from '../utils/query-client'

export const QueryProvider = ({ children }: { children: ReactNode }) => {
    return <QueryClientProvider client={query()}>{children}</QueryClientProvider>
}
