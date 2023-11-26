import { cn } from '@/lib/utils'

const Flex = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    return (
        <section className={cn('flex p-2', className)} {...props}>
            {children}
        </section>
    )
}

export default Flex
