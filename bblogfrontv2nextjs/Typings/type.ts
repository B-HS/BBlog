export interface statusType {
    Loading: boolean;
    Done: boolean;
    Error: unknown | null;
}

export interface article extends statusType {
    articleDetail: articleInfo|null
    article: articleInfo[];
    tabIndex?: number;
    page?:number;
    size?:number;
}

export interface reply extends statusType {
    reply: replyInfo[];
}

export interface member extends statusType {
    member: memberInfo[];
}

export interface memberInfo {
    mid: number;
    nickname: string;
    userimg: string;
}

export interface replyInfo {
    rid?:number;
    member?: memberInfo;
    guestName?:string;
    guestPassword?:string;
    hide:boolean,
    aid?:number|string|string[];
    replyGroup?: number;
    replySort?: number;
    context: string;
    replyCreatedDate?: string;
    replyImg?: string;
}

export interface articleInfo {
    aid?: number;
    menu: string;
    title: string;
    articleCreatedDate?: string;
    context: string;
    hashtag?: string[];
    hide: boolean;
    imgs?: string[];
    visitors?: number;
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

export interface listRequest {
    page: number;
    size: number;
    menu?: "INTRO" | "FRONTEND" | "BACKEND" | "ETC" | "PORTFOLIO";
    aid?:number|string|string[];
}