import { getPost } from '@entities/post'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import { CSSProperties } from 'react'

const GRID_ROWS = 13
const GRID_COLS = 25
const GRID_CELL_WIDTH = 1200 / GRID_COLS
const GRID_CELL_HEIGHT = 630 / GRID_ROWS

const generateGridOpacity = (rows: number, cols: number) => {
    return Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: cols }, (_, colIndex) => {
            const baseOpacity = (rowIndex + colIndex) * 0.015
            return Math.min(baseOpacity + rowIndex * 0.02, 0.6)
        }),
    )
}

const GRID_OPACITY = generateGridOpacity(GRID_ROWS, GRID_COLS)

const baseTextStyle: CSSProperties = {
    fontFamily: 'sans-serif',
    color: '#ffffff',
    letterSpacing: '1.5px',
}

const badgeStyle: CSSProperties = {
    ...baseTextStyle,
    padding: '12px 32px',
    fontSize: '42px',
    border: '2px solid rgba(255, 255, 255, 0.35)',
    background: 'rgba(255, 255, 255, 0.15)',
}

export const GET = async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const [post] = await getPost(id)

    if (!post) notFound()

    const title = post.title
    const category = post.categoryName
    const tag = post.tags[0]?.tag

    return new ImageResponse(
        (
            <div
                style={{
                    width: 1200,
                    height: 630,
                    position: 'relative',
                    background: '#0a0a0a',
                    display: 'flex',
                }}>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    {GRID_OPACITY.map((row, rowIndex) => (
                        <div key={rowIndex} style={{ display: 'flex', height: `${GRID_CELL_HEIGHT}px` }}>
                            {row.map((opacity, colIndex) => (
                                <div key={colIndex} style={{ width: `${GRID_CELL_WIDTH}px`, background: `rgba(255, 255, 255, ${opacity})` }} />
                            ))}
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '60px 80px',
                        position: 'relative',
                    }}>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <span style={badgeStyle}>{category}</span>
                        <span style={badgeStyle}>{tag}</span>
                    </div>

                    <div
                        style={{
                            ...baseTextStyle,
                            fontSize: 80,
                            fontWeight: 900,
                            lineHeight: 1.05,
                            maxWidth: '95%',
                            textTransform: 'uppercase',
                            letterSpacing: '-2px',
                            textWrap: 'balance',
                        }}>
                        {title}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16 }}>
                        <img src={`${process.env.SITE_URL}/favicon.ico`} alt='favicon' width={60} style={{ filter: 'invert(1)' }} />
                        <div style={{ width: 4, height: 32, background: '#ffffff' }} />
                        <div style={{ ...baseTextStyle, fontSize: 42, transform: 'translateY(-2px)' }}>HYUNSEOK</div>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    )
}
