export interface statusType {
    Loading: boolean;
    Done: boolean;
    Error: unknown | null;
    setStatus: Function;
}

export interface article extends statusType {
    article: articleInfo[];
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
    member: memberInfo;
    replyGroup: number;
    replySort: number;
    replyContext: string;
    replyDate: string;
    replyImg: string;
}

export interface articleInfo {
    menu: string;
    title: string;
    date: string;
    context: string;
    tags?: string[];
    visitCount: number;
    replyCount: number;
}
