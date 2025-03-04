import { visit } from 'unist-util-visit'

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'tiff', 'ico', 'webp', 'heic', 'heif', 'avif']

const videoFormats = [
    '.mp4',
    '.webm',
    '.ogg',
    '.mov',
    '.avi',
    '.wmv',
    '.flv',
    '.mkv',
    '.3gp',
    '.m4v',
    '.mpg',
    '.mpeg',
    '.rm',
    '.rmvb',
    '.vob',
    '.asf',
    '.ts',
    '.divx',
    '.xvid',
    '.m2ts',
    '.swf',
    '.f4v',
    '.m2v',
    '.3g2',
    '.3gp2',
    '.3gpp',
    '.amv',
    '.bik',
    '.csf',
    '.drc',
    '.dsm',
    '.dsv',
    '.dv',
    '.fli',
    '.flc',
    '.flic',
    '.gxf',
    '.h264',
    '.m1v',
    '.m2p',
    '.m2t',
    '.m3u8',
]

export const remarkContent = () => {
    let index = 0

    const visitor = (node: any) => {
        const isVideo = videoFormats.some((format) => node.url.includes(format))
        const isImage = imageExtensions.some((format) => node.url.includes(format))

        if (isVideo) {
            node.type = 'mdxJsxFlowElement'
            node.name = 'video'
            node.attributes = [
                { type: 'mdxJsxAttribute', name: 'src', value: node.url },
                { type: 'mdxJsxAttribute', name: 'alt', value: node.alt || '' },
                { type: 'mdxJsxAttribute', name: 'controls', value: true },
                { type: 'mdxJsxAttribute', name: 'key', value: `video-${index++}` },
            ]
        }

        if (isImage) {
            node.type = 'image'
            node.alt = node.alt || ''
        }

        node.children = []
    }

    const transform = (tree: any) => {
        visit(tree, 'image', visitor)
        visit(tree, 'paragraph', (node, index, parent) => {
            if (node.children.length === 1 && node.children[0].type === 'mdxJsxFlowElement' && node.children[0].name === 'video') {
                if (parent.children && index !== undefined) {
                    parent.children[index] = node.children[0]
                }
            } else {
                const videoElements = node.children.filter((child: any) => child.type === 'mdxJsxFlowElement' && child.name === 'video')

                if (videoElements.length > 0) {
                    const newChildren = node.children.flatMap((child: any) =>
                        child.type === 'mdxJsxFlowElement' && child.name === 'video' ? [child, { type: 'text', value: '\n' }] : child,
                    )

                    parent.children.splice(index, 1, ...newChildren)
                }
            }
        })

        visit(tree, 'heading', (node, index, parent) => {
            if (node.children.length === 1 && node.children[0].type === 'image') {
                if (parent.children && index !== undefined) {
                    parent.children[index] = node.children[0]
                }
            }
        })
    }

    return transform
}
