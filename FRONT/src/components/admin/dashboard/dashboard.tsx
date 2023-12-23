'use client'
import { getFullLogs } from '@/api/admin/logs'
import { TabsContent } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'

const Dashboard = () => {
    const [statistics, setStatistics] = useState<Record<string, any>>({})
    const requestStatistics = async () => setStatistics(await getFullLogs())
    useEffect(() => {
        requestStatistics()
    }, [])

    useEffect(() => {
        console.log(statistics)
    }, [statistics])

    return (
        <TabsContent className='w-full' value='dashboard'>
            Dashboard
        </TabsContent>
    )
}

export default Dashboard
