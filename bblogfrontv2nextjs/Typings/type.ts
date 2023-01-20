export interface statusType {
    Loading: boolean;
    Done: boolean;
    Error: unknown | null;
}

export interface article extends statusType {
    articleDetail: articleInfo | null;
    article: articleInfo[];
    tabIndex?: number;
    page?: number;
    size?: number;
    imgName?: string[] | null;
    totalArticle: number;
}

export interface reply extends statusType {
    reply: replyInfo[];
    totalReply: number;
}

export interface member extends statusType, token{
    member: memberInfo | null;
    duplicated?: boolean;
    authorized?: boolean;
    authMailSent?: boolean;
}

export interface token {
    access?: string;
    refresh?: string;
}
export interface tokenInfo{
    exp:number;
    iat:number;
    userNumber:number
    nickname:string;
    email:string;
}

export interface memberInfo {
    mid: number;
    email?: string;
    nickname: string;
    userimg?: string;
}

export interface replyInfo extends token {
    rid?: number;
    member?: memberInfo;
    guestName?: string;
    guestPassword?: string;
    hide: boolean;
    aid?: number | string | string[];
    replyGroup?: number;
    replySort?: number;
    context: string;
    replyCreatedDate?: string;
    replyImg?: string;
}

export interface articleInfo extends token{
    aid?: number;
    menu: string;
    title: string;
    articleCreatedDate?: string;
    context: string;
    hashtag?: string[];
    hide: boolean;
    imgs?: string[];
    visitors?: number;
    start?: Date;
    end?: Date;
    github?:string
    published?:string
}

export type articleProps = {
    info: articleInfo;
};

export interface articleListAxios {
    articles: articleInfo[];
    total: number;
}
export interface replyListAxios {
    replies: replyInfo[];
    total: number;
}
export interface memberJoinAxios {
    email: string;
    password: string;
    nickname: string;
}

export interface memberAuthcodeAxios {
    email: string;
    authcode: string;
}

export interface memberLoginAxios {
    email: string;
    password: string;
}

export interface imgUploadAxios extends token{
    data : FormData
}


export interface listRequest {
    page: number;
    size: number;
    keyword?: string;
    menu?: "INTRO" | "FRONTEND" | "BACKEND" | "ETC" | "PORTFOLIO";
    aid?: number | string | string[];
    total?:number;
}
