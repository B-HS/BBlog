'use client'
import { getLogs } from '@/api/admin/logs'
import { Button } from '@/components/ui/button'
import { TabsContent } from '@/components/ui/tabs'
import dayjs from 'dayjs'
import { ArrowUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DataTable } from '../table/components/data-table'

const LogManage = () => {
    const [loglist, setLoglist] = useState<Record<string, string>[]>([])
    const rawColumns = ['sid', 'controller', 'method', 'params', 'ipv6', 'ipv4', 'insertdate'].map((col) => ({
        accessorKey: col,
        header: ({ column }: any) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    {col.toLowerCase()}
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
    }))
    const setList = async () => setLoglist(await getLogs())
    useEffect(() => {
        setList()
    }, [])

    return (
        <TabsContent className='w-full' value='logs'>
            <DataTable
                columns={rawColumns}
                data={
                    loglist.map((log: Record<string, string>) => ({
                        ...log,
                        params: JSON.stringify(log.params).slice(0, 30),
                        insertdate: dayjs(log.insertdate, { format: 'YYYYMMDDHHmmss' }).format('YYYY. MM. DD. HH:mm'),
                    })) as any[]
                }
            />
        </TabsContent>
    )
}

export default LogManage
