import { getStartEndDate } from '@/lib/utils'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Bird from '../icons/bird'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import Link from 'next/link'

const SiteFooter = async () => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { startOfDay, endOfDay } = getStartEndDate()
    const visitCnt =
        (await supabase.from('visitors').select('*').gte('visit_date', startOfDay).lte('visit_date', endOfDay)).data?.filter(
            (value, index, self) => index === self.findIndex((t) => t.ip === value.ip),
        ).length || 0
    return (
        <footer className='sticky top-0 z-50 w-full border-t backdrop-blur'>
            <section className='flex h-14 justify-between items-center p-3 flex-wrap gap-3'>
                <span className='text-sm'>© {new Date().getFullYear()} Hyunseok Byun - All Rights Reserved.</span>
                <ContextMenu modal={false}>
                    <ContextMenuTrigger>
                        <Bird visitCnt={visitCnt} />
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <Link href='/editor'>
                            <ContextMenuItem className='cursor-pointer'>Markdown editor</ContextMenuItem>
                        </Link>
                    </ContextMenuContent>
                </ContextMenu>
            </section>
        </footer>
    )
}

export default SiteFooter
