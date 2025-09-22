import { FC } from 'react'
import { useActiveHeading, type TocItem } from './use-active-heading'

type TOCProps = {
    toc: TocItem[]
    offset?: number
    className?: string
}

export const TOC: FC<TOCProps> = ({ toc, offset = 120, className }) => {
    const { activeId, lockTo } = useActiveHeading(toc, { offset, unlockOnUserScroll: true })

    const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        const el = document.getElementById(id)
        if (!el) return
        lockTo(id)
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.history.replaceState(null, '', `#${id}`)
    }

    return (
        <nav className={className ?? 'sticky top-14 max-h-[80vh] overflow-auto pr-2'}>
            <ul className='space-y-1'>
                {toc.map((item) => {
                    const isActive = item.id === activeId
                    return (
                        <li key={item.id} style={{ marginLeft: (item.depth - 1) * 12 }}>
                            <a
                                href={`#${item.id}`}
                                onClick={(e) => onClick(e, item.id)}
                                className={[
                                    'block truncate text-sm',
                                    isActive ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground',
                                ].join(' ')}
                                aria-current={isActive ? 'true' : undefined}>
                                {item.text}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
