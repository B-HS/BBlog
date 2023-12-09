import axios from 'axios'

export const getCommentByAid = async (aid: string | number, isServerside?: boolean) => {
    return [
        {
            aid: 2,
            cid: 1,
            img: 'https://picsum.photos/200/300',
            commentorder: 1,
            nickname: 'guest1',
            context: 'comment 1',
            uppercid: 0,
            insertdate: '20231201000000',
        },
        {
            aid: 2,
            cid: 2,
            nickname: 'guest2',
            commentorder: 1,
            img: 'https://picsum.photos/200/300',
            context: 'comment 1 - reply',
            uppercid: 1,
            insertdate: '20231201000000',
        },
        {
            aid: 2,
            cid: 3,
            nickname: 'admin',
            commentorder: 2,
            img: 'https://picsum.photos/200/300',
            context: 'comment2',
            uppercid: 1,
            insertdate: '20231201000000',
        },
        {
            aid: 2,
            cid: 4,
            nickname: 'guest3',
            commentorder: 2,
            img: 'https://picsum.photos/200/300',
            context: 'comment2',
            uppercid: 0,
            insertdate: '20231201000000',
        },
        {
            aid: 2,
            cid: 5,
            nickname: 'guest4',
            commentorder: 3,
            img: 'https://picsum.photos/200/300',
            context: 'comment3',
            uppercid: 0,
            insertdate: '20231201000000',
        },
        {
            aid: 2,
            cid: 6,
            nickname: 'guest5',
            commentorder: 3,
            img: 'https://picsum.photos/200/300',
            context: 'comment1 - reply2',
            uppercid: 1,
            insertdate: '20231201000000',
        },
        {
            aid: 2,
            cid: 7,
            nickname: 'guest6',
            commentorder: 0,
            img: 'https://picsum.photos/200/300',
            context: 'comment2 - reply3',
            uppercid: 4,
            insertdate: '20231201000000',
        },
    ]
    // 임시 코멘트
    try {
        if (isServerside) axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACK
        const { data } = await axios.get('/comment/' + aid)
        return data
    } catch (error) {
        return error
    }
}
