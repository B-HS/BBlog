
'use client'

import { Pencil } from "lucide-react"
import { useSession } from "next-auth/react"
import { TooltipIcon } from "./tooltip-icon"

export const WriteButton = () => {
    const session = useSession()
    return session.status === 'authenticated' && <TooltipIcon icon={Pencil} linkUrl='/write' tooltipContent='New Article' />
}
