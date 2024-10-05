import { CognitoIdentityProviderClient, ListUsersCommand } from '@aws-sdk/client-cognito-identity-provider'
import { UserRegisteration } from '@entities/auth'
import userPool from '@shared/auth/cognito-userpool'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

const isUserExist = async (email: string) => {
    const client = new CognitoIdentityProviderClient({
        region: 'ap-northeast-2',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    })

    try {
        const command = new ListUsersCommand({
            UserPoolId: userPool.getUserPoolId(),
            Filter: `email = "${email}"`,
            Limit: 1,
        })

        const result = await client.send(command)

        if (result.Users && result.Users.length > 0) {
            console.log('User exists:', result.Users[0])
            return true
        } else {
            console.log('User does not exist')
            return false
        }
    } catch (error) {
        console.error('Error checking user existence:', error)
        return false
    }
}

const POST = async (req: NextRequest) => {
    const body = await req.json()
    try {
        const { email, nickname, password } = UserRegisteration.parse(body)
        const isExist = await isUserExist(email)
        if (isExist) return NextResponse.json(null, { status: 409 })

        await new Promise((resolve, reject) => {
            userPool.signUp(
                randomUUID(),
                password,
                [new CognitoUserAttribute({ Name: 'email', Value: email }), new CognitoUserAttribute({ Name: 'nickname', Value: nickname })],
                [],
                (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                },
            )
        })
        return NextResponse.json(null, { status: 200 })
    } catch (error) {
        return NextResponse.json(null, { status: 500 })
    }
}

export const authApi = { POST }
