import { visit } from 'unist-util-visit'

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

export const remarkVideos = () => {
    let videoIndex = 0 // Initialize an index for generating keys

    const visitor = (node: any) => {
        if (videoFormats.some((format) => node.url.includes(format))) {
            node.type = 'mdxJsxFlowElement'
            node.name = 'video'
            node.attributes = [
                { type: 'mdxJsxAttribute', name: 'src', value: node.url },
                { type: 'mdxJsxAttribute', name: 'alt', value: node.alt || '' },
                { type: 'mdxJsxAttribute', name: 'controls', value: true },
                { type: 'mdxJsxAttribute', name: 'key', value: `video-${videoIndex++}` }, // Set a unique key attribute
            ]
            node.children = []
        }
    }

    const transform = (tree: any) => {
        visit(tree, 'image', visitor)

        visit(tree, 'paragraph', (node, index, parent) => {
            // Replace paragraph with video if it contains a single video element
            if (node.children.length === 1 && node.children[0].type === 'mdxJsxFlowElement' && node.children[0].name === 'video') {
                if (parent.children && index !== undefined) {
                    parent.children[index] = node.children[0]
                }
            }
            // Process multiple videos within the same paragraph
            else {
                const videoElements = node.children.filter((child: any) => child.type === 'mdxJsxFlowElement' && child.name === 'video')

                if (videoElements.length > 0) {
                    // Replace paragraph content with separate video elements
                    const newChildren = node.children.flatMap((child: any) =>
                        child.type === 'mdxJsxFlowElement' && child.name === 'video'
                            ? [child, { type: 'text', value: '\n' }] // Adding a line break between videos
                            : child,
                    )

                    parent.children.splice(index, 1, ...newChildren)
                }
            }
        })
    }

    return transform
}
