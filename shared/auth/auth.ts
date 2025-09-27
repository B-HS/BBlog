import NextAuth from 'next-auth'
import { CognitoAuthentication } from './cognito'

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [CognitoAuthentication],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token }) {
            // @ts-expect-error
            session.user = token
            return session
        },
    },
})
