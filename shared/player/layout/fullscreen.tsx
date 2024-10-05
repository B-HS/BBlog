import { Button } from '@shared/ui/button'
import { cn } from '@shared/utils'
import { MaximizeIcon } from 'lucide-react'
import { ClassNameValue } from 'tailwind-merge'
import { useVideoControl } from '../hooks'

export const Fullscreen = ({ className }: { className?: ClassNameValue }) => {
    const { fullscreenToggle } = useVideoControl()
    return (
        <Button size={'icon'} variant={'ghost'} className={cn('rounded-none', className)} onClick={fullscreenToggle}>
            <MaximizeIcon />
        </Button>
    )
}
