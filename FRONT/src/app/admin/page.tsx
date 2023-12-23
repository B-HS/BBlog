'use client'
import ArticleManage from '@/components/admin/article/articleManage'
import CommentManage from '@/components/admin/comment/commentManage'
import Dashboard from '@/components/admin/dashboard/dashboard'
import LogManage from '@/components/admin/log/logManage'
import UpdownAnime from '@/components/transition/updown'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import WithAuth from '@/hoc/withAuth'

const Admin = () => {
    return (
        <UpdownAnime className='h-full w-full'>
            <Tabs defaultValue='dashboard' className='w-full h-full flex flex-col overflow-y-scroll items-center'>
                <TabsList className='m-3 w-fit'>
                    <TabsTrigger value='dashboard'>Dashboard</TabsTrigger>
                    <TabsTrigger value='article'>Article</TabsTrigger>
                    <TabsTrigger value='comment'>Comment</TabsTrigger>
                    <TabsTrigger value='logs'>Logs</TabsTrigger>
                </TabsList>
                <Separator />
                <Dashboard />
                <ArticleManage />
                <CommentManage />
                <LogManage />
            </Tabs>
        </UpdownAnime>
    )
}

export default WithAuth(Admin)
