import { createAuthClient } from 'better-auth/client'

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_SITE_URL,
})
