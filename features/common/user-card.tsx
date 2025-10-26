'use client'

import { BLOG_DESCRIPTION, CUSTOM_LINKS, USER_INFO } from '@lib/constants'
import { cn } from '@lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar'
import { User } from 'better-auth'
import { AtSign, CheckCircle, ExternalLink, Mail, XCircle } from 'lucide-react'
import { type FC } from 'react'

interface BlogUserCardProps {
    blogDescription: string
    className?: string
}

interface UserCardContentProps {
    className?: string
    user?: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
}

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map((word) => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

const UserCardContent: FC<UserCardContentProps> = ({ user, className }) => {
    return (
        <div
            className={cn(
                'flex items-start sm:items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground sm:px-2 py-1 flex-col sm:flex-row border-b border-border',
                className,
            )}>
            <div className='flex flex-wrap gap-2'>
                {CUSTOM_LINKS.map((link, idx) => (
                    <a key={idx} className='flex items-center gap-1 sm:gap-2 text-blue-900 dark:text-blue-200' href={link.url} target='_blank'>
                        <ExternalLink className='size-3 sm:size-3.5' />
                        <span>{link.label}</span>
                    </a>
                ))}
            </div>
        </div>
    )
}

export const UserCard: FC<Partial<BlogUserCardProps>> = ({ className }) => {
    return (
        <div className={className}>
            <div className='flex items-start sm:items-center size-full flex-col sm:flex-row border-b border-border'>
                <div className='flex items-center gap-3 flex-shrink-0 p-1.5 px-3 sm:p-3 border-b sm:border-r sm:border-b-0 border-border sm:w-auto w-full'>
                    <Avatar className='size-10 sm:size-20'>
                        <AvatarImage src={USER_INFO.image} alt={USER_INFO.name} />
                        <AvatarFallback className='text-md sm:text-xl font-semibold'>{getInitials(USER_INFO.name || '')}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-1'>
                        <div className='flex items-center gap-1 sm:gap-2'>
                            <h3 className='text-sm sm:text-lg font-bold text-balance'>{USER_INFO.name}</h3>
                            {USER_INFO.emailVerified ? (
                                <CheckCircle className='size-3 sm:size-3.5 text-green-500' />
                            ) : (
                                <XCircle className='size-3 sm:size-3.5 text-red-500' />
                            )}
                        </div>
                        <div className='flex items-center gap-1 sm:gap-2'>
                            <AtSign className='size-3 sm:size-3.5 text-muted-foreground' />
                            <span className='text-xs sm:text-sm text-muted-foreground'>{USER_INFO.name}</span>
                        </div>
                        <div className='flex items-center gap-1 sm:gap-2'>
                            <Mail className='size-3 sm:size-3.5 text-muted-foreground' />
                            <span className='text-xs sm:text-sm text-muted-foreground'>{USER_INFO.email}</span>
                        </div>
                    </div>
                    <UserCardContent user={USER_INFO} className='flex sm:hidden border-b-0' />
                </div>

                <div className='size-full p-3 py-1.5'>
                    <p className='text-xs sm:text-sm text-primary/90 text-pretty leading-tight line-clamp-1 sm:line-clamp-3'>{BLOG_DESCRIPTION}</p>
                </div>
            </div>
            <UserCardContent user={USER_INFO} className='hidden sm:flex' />
        </div>
    )
}
