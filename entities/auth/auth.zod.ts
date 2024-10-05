import { z } from 'zod'

export const User = z.object({
    id: z.string(),
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
    nickname: z.string(),
})

export const UserData = User.pick({ email: true, id: true, nickname: true })
export const UserRegisteration = User.pick({ email: true, password: true, nickname: true })
export const UserLogin = User.pick({ email: true, password: true })
