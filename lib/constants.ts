import ProfileImage from '@lib/images/profile.jpeg'

export const QUERY_KEY = {
    IMAGE: {
        LIST: 'imageList',
    },
    CATEGORY: {
        LIST: 'categoryList',
    },
    TAG: {
        LIST: 'tagList',
    },
    LOG: {
        USER_INFO: (userId: string) => ['logUserInfo', userId],
        MESSAGES: (userId: string) => ['logMessages', userId],
    },
    POST: {
        GET: (id: string) => ['post', id],
        LIST: (params: Record<string, unknown>) => [
            'postList',
            Object.entries(params)
                .map(([key, value]) => `${key}-${value}`)
                .join('-'),
        ],
    },
    COMMENT: {
        LIST: (postId: string) => ['commentList', postId],
    },
}

export const USER_INFO = {
    image: ProfileImage.src,
    name: 'Hyunseok Byun',
    email: 'hs@gumyo.net',
    emailVerified: true,
}

export const CUSTOM_LINKS = [
    {
        url: 'https://github.com/B-HS',
        label: 'GitHub',
    },
    {
        url: 'https://resume.gumyo.net',
        label: 'Resume',
    },
]

export const BLOG_DESCRIPTION = '잡식성 개발자'
export const LOG_USER_ID = 'cGlz8UoIpMIIGqKwzNOgW9nSm9j6ZAiA'
