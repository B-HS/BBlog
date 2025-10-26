import { cn } from '@lib/utils'
import { type LucideIcon, type LucideProps } from 'lucide-react'
import { createElement, type FC } from 'react'
import { Button } from '@ui/button'

interface EditorButtonProps {
    icon: LucideIcon
    iconProps?: LucideProps
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
}

export const EditorButton: FC<EditorButtonProps> = ({ icon, iconProps, onClick, isActive = false, disabled = false }) => {
    const Icon = createElement(icon, iconProps)

    return (
        <Button variant='ghost' size='icon' onClick={onClick} className={cn(isActive && 'bg-accent')} disabled={disabled}>
            {Icon}
        </Button>
    )
}
