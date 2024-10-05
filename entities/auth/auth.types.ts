import { z } from 'zod'
import { UserData } from './auth.zod'

export type CognitoUserType = z.infer<typeof UserData>
