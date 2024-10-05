import { Button } from '@shared/ui/button'
import { cn } from '@shared/utils'
import { SquareArrowOutUpRight } from 'lucide-react'
import { ClassNameValue } from 'tailwind-merge'
import { useVideoControl } from '../hooks'

export const Pip = ({ className }: { className?: ClassNameValue }) => {
    const { pipModeToggle } = useVideoControl()
    return (
        <Button size={'icon'} variant={'ghost'} className={cn('rounded-none', className)} onClick={pipModeToggle}>
            <SquareArrowOutUpRight />
        </Button>
    )
}
