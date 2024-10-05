import { CognitoUserType } from '@entities/auth'
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'
import CredentialsProvider from 'next-auth/providers/credentials'
import userPool from './cognito-userpool'

export const CognitoAuthentication = CredentialsProvider({
    name: 'cognito',
    credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
    },

    async authorize(credentials) {
        const cognitoUser = new CognitoUser({
            Username: credentials?.email as string,
            Pool: userPool,
        })

        const authenticationDetails = new AuthenticationDetails({
            Username: credentials?.email as string,
            Password: credentials?.password as string,
        })

        return new Promise<CognitoUserType>((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (session) => {
                    const info = session.getIdToken().payload
                    resolve({
                        id: info.sub,
                        email: info.email,
                        nickname: info.nickname,
                    })
                },
                onFailure: reject,
            })
        })
    },
})
