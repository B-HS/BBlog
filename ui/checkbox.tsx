import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

import { cn } from '@lib/utils'

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(
    ({ className, ...props }, ref) => (
        <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
                'peer size-4 shrink-0 rounded border border-input bg-background shadow-xs transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary',
                'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                className,
            )}
            {...props}>
            <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
                <Check className='size-3' />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    ),
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
