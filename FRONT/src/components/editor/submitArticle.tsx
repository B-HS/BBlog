'use client'

import { loadMenu } from '@/api/menu/menu'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { CURRENT_DATE } from '@/lib/constant'
import { handleFileChange } from '@/lib/upload'
import { UploadCloudIcon } from 'lucide-react'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import Flex from '../flex'
import { MenuItem } from '../menu/menu'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Switch } from '../ui/switch'
import { useToast } from '../ui/use-toast'

const SubmitArticle = ({ children, saveArticle, ctxImageList }: { children: React.ReactNode; saveArticle: Function; ctxImageList: string[] }) => {
    const [open, setOpen] = useState(false)
    const [thumbnail, setThumbnail] = useState('')
    const [mekey, setMekey] = useState(0)
    const [imageList, setImageList] = useState<string[]>([])
    const [isOnUploading, setIsOnUploading] = useState(false)
    const [hide, setHide] = useState(false)
    const [menulist, setMenulist] = useState<MenuItem[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const submit = (e: MouseEvent) => {
        e.preventDefault()

        if (!mekey) {
            toast({
                title: 'Error',
                description: 'Please select a menu',
                variant: 'destructive',
            })
            return
        }

        saveArticle({
            thumbnail: thumbnail || 'favicon.ico',
            mekey,
            hide,
            insertdate: CURRENT_DATE,
            href: menulist.find((ele) => ele.mekey === mekey)?.mename.toLowerCase() || '',
        })
        setOpen(false)
    }
    const { toast } = useToast()

    const setFilename = (filename: string) => {
        setImageList(() => [...ctxImageList, filename])
        setThumbnail(filename)
    }

    useEffect(() => {
        const loadMenuList = async () => setMenulist(await loadMenu())
        loadMenuList()
    }, [])

    useEffect(() => {
        ctxImageList && setImageList((ele) => Array.from(new Set([...ele, ...ctxImageList])))
    }, [ctxImageList])

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent side={'bottom'}>
                <Flex className='flex-col gap-3 p-0'>
                    <SheetHeader>
                        <SheetTitle>Submit Article</SheetTitle>
                        <SheetDescription>Submit your article, set thumbnail, and more</SheetDescription>
                    </SheetHeader>
                    <Flex className='flex-0 p-0'>
                        <Flex className='flex-1 border items-center'>
                            {thumbnail ? (
                                <Avatar className='w-36 h-36 bg-white rounded' onClick={() => fileInputRef.current?.click()}>
                                    <AvatarImage src={`https://img.gumyo.net/${thumbnail}`} alt='usericon_img' />
                                </Avatar>
                            ) : (
                                <Flex
                                    className='w-36 h-36 rounded justify-center items-center border cursor-pointer'
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <UploadCloudIcon className={isOnUploading ? 'animate-bounce' : ''} />
                                </Flex>
                            )}
                            <Flex className='flex-col p-0 justify-start flex-1'>
                                <Flex className='items-baseline gap-3'>
                                    <Label className='w-1/12 text-right'>Menu</Label>
                                    <Select onValueChange={(mekey) => setMekey(Number(mekey))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Menu' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {menulist.map((menu, idx) => (
                                                <SelectItem key={idx} value={menu.mekey.toString()}>
                                                    {menu.mename}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Flex>
                                <Flex className='items-baseline gap-3'>
                                    <Label className='w-1/12 text-right'>Image</Label>
                                    <Select onValueChange={(img) => setThumbnail(img)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={thumbnail || 'Thumbnail'} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {imageList.map((img, idx) => (
                                                <SelectItem key={idx} value={img}>
                                                    {img}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                    <SheetFooter>
                        <Flex className='gap-2 justify-start items-center'>
                            <Label htmlFor='hide'>Article visibility</Label>
                            <Switch id='hide' checked={hide} onCheckedChange={setHide} aria-readonly />
                        </Flex>
                        <SheetClose asChild>
                            <Button type='button' onClick={submit}>
                                Submit
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </Flex>
            </SheetContent>
            <input onChange={handleFileChange(toast, setFilename, setIsOnUploading)} ref={fileInputRef} type='file' style={{ display: 'none' }} />
        </Sheet>
    )
}

export default SubmitArticle
