import { CognitoUserPool } from 'amazon-cognito-identity-js'

declare const globalThis: {
    cognitoUserPoolGlobal: CognitoUserPool
} & typeof global

const userPool =
    globalThis.cognitoUserPoolGlobal ??
    new CognitoUserPool({
        UserPoolId: process.env.COGNITO_USER_POOL_ID!,
        ClientId: process.env.COGNITO_CLIENT_ID!,
    })

export default userPool

if (process.env.NODE_ENV !== 'production') globalThis.cognitoUserPoolGlobal = userPool
