import { MenuIcon } from 'lucide-react'
import Menu from '../menu/menu'
import Profile from '../profile/profile'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'

const CollapsibleSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className='md:hidden transition-all' variant={'ghost'} size={'icon'}>
                    <MenuIcon />
                </Button>
            </SheetTrigger>
            <SheetContent side={'left'} className='min-w-[280px] w-full p-0'>
                <SheetHeader>
                    <SheetTitle className='text-left p-2.5'>
                        <span className='text-xl font-bold whitespace-nowrap'>BLOGTITLE</span>
                    </SheetTitle>
                    <SheetDescription asChild>
                        <section>
                            <Profile />
                            <Menu />
                        </section>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default CollapsibleSidebar
