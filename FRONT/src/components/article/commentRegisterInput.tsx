'use client'
import { saveComment } from '@/api/article/comment'
import useForm from '@/hooks/useForm'
import { CURRENT_DATE } from '@/lib/constant'
import { handleFileChange } from '@/lib/upload'
import { UploadCloudIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useRef, useState } from 'react'
import Flex from '../flex'
import LeftRightAnime from '../transition/leftright'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'
import { Comment } from './comment'

const CommentRegisterInput = ({ data, reloadComment }: { data?: Comment; reloadComment?: Function }) => {
    const [isOnUploading, setIsOnUploading] = useState(false)
    const { aid } = useParams()
    const { toast } = useToast()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { formData, onChangeFormData, setFormData } = useForm({
        nickname: '',
        password: '',
        context: '',
        img: '',
    })

    const formReset = () => {
        setFormData({
            nickname: '',
            password: '',
            context: '',
            img: '',
        })
    }

    const submitReply = async () => {
        console.log({ ...formData, aid: Number(aid), uppercid: data?.cid, insertdate: CURRENT_DATE })
        const reply = await saveComment({ ...formData, aid: Number(aid), uppercid: data?.cid, insertdate: CURRENT_DATE })
        if (reply) {
            formReset()
            reloadComment && reloadComment()
        }
    }

    const setFilename = (filename: string) => setFormData((prev) => ({ ...prev, img: filename }))

    return (
        <LeftRightAnime>
            <form>
                <Flex className='flex-1 p-0 gap-3 items-center'>
                    <Button
                        type='button'
                        variant={'outline'}
                        size={'icon'}
                        className='rounded-full p-2'
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {!formData.img ? (
                            <UploadCloudIcon className={isOnUploading ? 'animate-bounce' : ''} />
                        ) : (
                            <Avatar>
                                <AvatarImage src={`https://img.gumyo.net/${formData.img}`} alt='usericon_img' />
                                <AvatarFallback>
                                    <AvatarImage src={'/favicon.ico'} alt='usericon_fallback' />
                                </AvatarFallback>
                            </Avatar>
                        )}
                    </Button>
                    <Input
                        value={formData.nickname}
                        onChange={onChangeFormData}
                        name='nickname'
                        className='w-32 text-center'
                        placeholder='Nickname'
                    />
                    <Input
                        value={formData.password}
                        onChange={onChangeFormData}
                        name='password'
                        className='w-32 text-center'
                        placeholder='Password'
                        type='password'
                        autoComplete='off'
                        autoCorrect='off'
                        autoCapitalize='off'
                        spellCheck='false'
                    />
                    <Input value={formData.context} onChange={onChangeFormData} name='context' className='w-full' placeholder='Description' />
                    <Button variant={'outline'} onClick={submitReply}>
                        Submit
                    </Button>
                </Flex>
            </form>
            <input onChange={handleFileChange(toast, setFilename, setIsOnUploading)} ref={fileInputRef} type='file' style={{ display: 'none' }} />
        </LeftRightAnime>
    )
}

export default CommentRegisterInput
