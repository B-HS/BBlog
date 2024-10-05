export interface CommentProps {
    id: number
    upper_id: number
    context: string
    user_id: string
    username: string
    avatar: string
    post: string
    created_at: Date
    updated_at: Date
    deleted: boolean
    children?: CommentProps[]
    depth?: number
}
