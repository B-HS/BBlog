import { MisskeyUserInfo } from './misskey.types'

export const requestUserShowInfo = async () => {
    const misskeyUserInfo: MisskeyUserInfo = await fetch(`${process.env.MISSKEY_INSTANCE_URL}/api/users/show`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: process.env.MISSKEY_USER_ID,
        }),
        cache: 'no-cache',
    }).then(async (res) => await res.json())

    return {
        name: process.env.SITE_NAME || misskeyUserInfo.name,
        anchor: misskeyUserInfo.username,
        description: misskeyUserInfo.description,
        avatarUrl: misskeyUserInfo.avatarUrl,
        bannerUrl: misskeyUserInfo.bannerUrl,
        location: misskeyUserInfo.location,
        createdAt: misskeyUserInfo.createdAt,
        updatedAt: misskeyUserInfo.updatedAt,
    }
}
