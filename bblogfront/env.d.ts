/// <reference types="vite/client" />
interface stackset {

    sid: number, idx: number, title: string, context: string, new?:boolean
}
interface menuList {
    lid: Number, menuName: String
}

interface visitState {
    today: number, total: number
}

interface userInfo {
    token: string|undefined, id: string|undefined, num: number|undefined, username:string|undefined, admin:boolean
}

interface dropdown {
    name:string, img:string, replyCount:number
}

interface modalReply {
    articleid: number,
    context: string,
    regdate: string
}