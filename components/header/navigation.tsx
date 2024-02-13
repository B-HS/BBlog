import dynamic from 'next/dynamic'
import Github from '../icons/github'
import Menu from '../icons/menu'
import LoginButton from '../login-button'
import { FrontmatterProps } from '../mdx/custom-mdx'
const ThemeChanger = dynamic(() => import('../theme-changer'), { ssr: false })

const Navigation = ({ list }: { list?: Partial<FrontmatterProps>[] }) => {
    return (
        <nav className='flex items-center'>
            <ThemeChanger />
            <Github noTooltip />
            <LoginButton />
            <Menu articleInfo={list} />
        </nav>
    )
}

export default Navigation
