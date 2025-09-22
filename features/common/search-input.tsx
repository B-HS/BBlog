'use client'

import { Input } from '@/shared/ui'
import { Search } from 'lucide-react'
import { FC, useState } from 'react'

interface SearchInputProps {
    onSearch: (keywords: string) => void
}

export const SearchInput: FC<SearchInputProps> = ({ onSearch }) => {
    const [keywords, setKeywords] = useState('')
    return (
        <section className='relative flex items-center'>
            <Search className='size-3.5 absolute top-1/2 left-2.5 -translate-y-1/2' />
            <Input
                placeholder='Enter keywords to search'
                className='h-8 pl-7'
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch(keywords)}
            />
        </section>
    )
}
