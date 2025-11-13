import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@db/db'
import { admin } from 'better-auth/plugins'

export const auth = betterAuth({
    baseURL: process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL,
    database: drizzleAdapter(db, {
        provider: 'mysql',
    }),
    emailAndPassword: {
        enabled: false,
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        },
    },
    plugins: [
        admin({
            defaultRole: 'user',
            adminRoles: ['admin'],
        }),
    ],
    trustedOrigins: ['https://blog.gumyo.net'],
})
