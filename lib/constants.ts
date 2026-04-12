import { Github } from '@ui/icons/github'
import ProfileImage from '@lib/images/profile.jpeg'
import { CalendarIcon, CloverIcon, FileTextIcon, FlameIcon, ImageIcon, MailIcon, ScrollTextIcon } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

export type LinkItem = {
    url: string
    label: string
    icon: ComponentType<SVGProps<SVGSVGElement> & { className?: string }>
    iconClassName?: string
}

export const QUERY_KEY = {
    AUTH: {
        SESSION: ['session'],
    },
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
        MAIN: 'mainPostLists'
    },
    COMMENT: {
        LIST: (postId: string) => ['commentList', postId],
    },
    ADMIN: {
        USERS: ['adminUsers'],
        POSTS: ['adminPosts'],
        COMMENTS: ['adminComments'],
    },
}

export const USER_INFO = {
    image: ProfileImage.src,
    name: 'Hyunseok Byun',
    email: 'hs@gumyo.net',
    emailVerified: true,
}

export const INFORMATION_LINKS: LinkItem[] = [
    {
        url: 'https://github.com/B-HS',
        label: '깃허브',
        icon: Github,
        iconClassName: 'dark:invert',
    },
    {
        url: 'https://resume.gumyo.net',
        label: '이력서',
        icon: ScrollTextIcon,
    },
]

export const TOOL_LINKS: LinkItem[] = [
    {
        url: 'https://mail.gumyo.net',
        label: '개인 메일함',
        icon: MailIcon,
    },
    {
        url: 'https://deal.gumyo.net',
        label: '핫딜 모음',
        icon: FlameIcon,
    },
    {
        url: 'https://calendar.gumyo.net',
        label: 'CalDAV 캘린더',
        icon: CalendarIcon,
    },
    {
        url: 'https://luck.gumyo.net',
        label: '로또 번호 확인기',
        icon: CloverIcon,
    },
    {
        url: 'https://badge.hyns.dev',
        label: '뱃지 생성기',
        icon: ImageIcon,
    },
    {
        url: 'https://rirekisyo.gumyo.net',
        label: '일본어 이력/경력기술서 생성기',
        icon: FileTextIcon,
    },
]

export const BLOG_DESCRIPTION = '잡식성 개발자'
export const LOG_USER_ID = 'qvYQiIyr480ya9GMqUhuxENjnfLBrvxS'
