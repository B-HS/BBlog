import { Suspense } from 'react'

const ListPage = async () => {
    //list page logic
    return (
        <Suspense fallback={<>On loading...</>}>
            <section>List</section>
        </Suspense>
    )
}
export default ListPage
