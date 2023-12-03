'use client'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: false })

const UpdownAnime = ({ children, className, delay = 0 }: React.PropsWithChildren<{ className?: string; delay?: number }>) => {
    const { theme } = useTheme()
    return MotionDiv ? (
        <MotionDiv
            className={cn('', className)}
            key={theme}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay }}
        >
            {children}
        </MotionDiv>
    ) : (
        <>{children}</>
    )
}
export default UpdownAnime
