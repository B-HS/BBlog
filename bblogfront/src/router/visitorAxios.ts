import axios from "@/store/axios"

export const visitorAxios = () => {
    const requestInitVisitor = (prevURI: string) => {
        return axios.post("/visitor", { prevLink: prevURI, init: true })
    }
    const requestArticleOpenCount = (aid: number) => {
        return axios.post("/visitor", { init: false, articleid: aid })
    }
    return { requestInitVisitor, requestArticleOpenCount }
}
export default visitorAxios