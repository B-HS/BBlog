import dynamic from 'next/dynamic'
import Github from '../icons/github'
import LoginButton from '../login-button'
import Menu from '../icons/menu'
import { getFileInfo } from '@/lib/files'
import { FrontmatterProps } from '../mdx/custom-mdx'
const ThemeChanger = dynamic(() => import('../theme-changer'), { ssr: false })

const Navigation = ({ list }: { list?: Partial<FrontmatterProps>[] }) => {
    return (
        <nav className='flex items-center'>
            <ThemeChanger />
            <Github />
            <LoginButton />
            <Menu articleInfo={list} />
        </nav>
    )
}

export default Navigation
