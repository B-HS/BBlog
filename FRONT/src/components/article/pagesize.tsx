import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const PageSize = ({ setCount, count }: { setCount: Function; count: number }) => {
    return (
        <Select onValueChange={(number) => setCount(() => Number(number))}>
            <SelectTrigger className='w-fit'>
                <SelectValue placeholder={`${count} per page`} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {[5, 10, 15, 20].map((cnt) => (
                        <SelectItem value={cnt.toString()} key={`cnt_${cnt}`}>
                            {cnt} per page
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default PageSize
