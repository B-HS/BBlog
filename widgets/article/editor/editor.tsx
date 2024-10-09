'use client'

import { EditDescription, EditImageManager, EditTags, EditTitle } from '@features/article/edit'
import { useState } from 'react'

const imageObjDefaultValue = {
    src: '',
    alt: '',
    width: '',
    height: '',
    imgInput: '',
}

export const Editor = ({ text }: { text?: string }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState(text || '')
    const [tags, setTags] = useState<string[]>([])
    const [imageObj, setImageObj] = useState<Record<string, string | number>>(imageObjDefaultValue)

    return (
        <section className='flex flex-col gap-5 p-2'>
            <EditTitle title={title} setTitle={setTitle} />
            <EditDescription description={description} setDescription={setDescription} setImageObj={setImageObj} />
            <EditImageManager imageObj={imageObj} setImageObj={setImageObj} />
            <EditTags setTags={setTags} tags={tags} />
        </section>
    )
}