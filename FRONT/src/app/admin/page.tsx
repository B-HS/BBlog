'use client'
import ArticleManage from '@/components/admin/article/articleManage'
import CommentManage from '@/components/admin/comment/commentManage'
import LogManage from '@/components/admin/logs/logManage'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import WithAuth from '@/hoc/withAuth'

const Admin = () => {
    return (
        <section className='h-full w-full'>
            <Tabs defaultValue='dashboard' className='w-full h-full flex flex-col overflow-y-scroll items-center'>
                <TabsList className='m-3 w-fit'>
                    <TabsTrigger value='dashboard'>Dashboard</TabsTrigger>
                    <TabsTrigger value='article'>Article</TabsTrigger>
                    <TabsTrigger value='comment'>Comment</TabsTrigger>
                    <TabsTrigger value='logs'>Logs</TabsTrigger>
                </TabsList>
                <Separator />
                <TabsContent className='m-5 w-11/12' value='dashboard'>
                    Dashboard
                </TabsContent>
                <ArticleManage />
                <CommentManage />
                <LogManage />
            </Tabs>
        </section>
    )
}

export default WithAuth(Admin)
