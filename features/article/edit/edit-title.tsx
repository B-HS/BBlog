import { Input } from '@shared/ui/input'
import { Label } from '@shared/ui/label'
import { Dispatch, FC, SetStateAction } from 'react'

type EditTitleProps = { title: string; setTitle: Dispatch<SetStateAction<string>> }

export const EditTitle: FC<EditTitleProps> = ({ title, setTitle }) => {
    return (
        <section>
            <Label className='text-lg'>Title</Label>
            <Input className='rounded-sm' onChange={(evt) => setTitle(evt.target.value)} value={title} />
        </section>
    )
}
