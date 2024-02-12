import dynamic from 'next/dynamic'
import Github from '../icons/github'
import LoginButton from '../login-button'
const ThemeChanger = dynamic(() => import('../theme-changer'), { ssr: false })

const Navigation = () => {
    return (
        <nav className='flex items-center'>
            <ThemeChanger />
            <Github />
            <LoginButton />
        </nav>
    )
}

export default Navigation
