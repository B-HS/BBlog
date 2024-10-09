import * as React from 'react'

import { cn } from '@shared/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    styling?: boolean
}

const StyledTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, styling, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                'flex min-h-[80px] w-full',
                styling &&
                    'rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className,
            )}
            ref={ref}
            {...props}
        />
    )
})
StyledTextarea.displayName = 'StyledTextarea'

export { StyledTextarea }
