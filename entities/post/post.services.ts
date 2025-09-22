import { QUERY_KEY } from '@/shared/utils/query-key'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { unstable_cache } from 'next/cache'
import { notion } from '../common/notion.client'
import { POST_DATA_SOURCE_ID } from './post.constant'
import { GetPostsRequest, PaginatedPostListResponse, Post } from './post.types'

interface NotionProperties {
    ID?: {
        unique_id?: {
            number?: number
        }
    }
    CATEGORY?: {
        relation?: Array<{ id: string }>
    }
    TAG?: {
        relation?: Array<{ id: string }>
    }
    Name?: {
        title?: Array<{ plain_text?: string }>
    }
    description?: {
        rich_text?: Array<{ plain_text?: string }>
    }
    created_at?: {
        date?: {
            start?: string
        }
    }
    updated_at?: {
        date?: {
            start?: string
        }
    }
    isHide?: {
        number?: number
    }
    isNotice?: {
        number?: number
    }
    isComment?: {
        number?: number
    }
}

const mapNotionPageToPost = async (page: PageObjectResponse) => {
    const properties = page.properties as NotionProperties
    const notionClient = notion()

    const tags = await Promise.all(
        (properties.TAG?.relation || []).map(async (tag) => {
            try {
                const tagPage = (await notionClient.pages.retrieve({ page_id: tag.id })) as PageObjectResponse
                const tagProperties = tagPage.properties as Record<string, any>
                const tagName =
                    tagProperties.Name?.title?.[0]?.plain_text ||
                    tagProperties.name?.title?.[0]?.plain_text ||
                    tagProperties.title?.title?.[0]?.plain_text ||
                    'Unknown'
                return {
                    id: tag.id,
                    name: tagName,
                }
            } catch {
                return {
                    id: tag.id,
                    name: 'Unknown',
                }
            }
        }),
    )

    const categories = await Promise.all(
        (properties.CATEGORY?.relation || []).map(async (category) => {
            try {
                const categoryPage = (await notionClient.pages.retrieve({ page_id: category.id })) as PageObjectResponse
                const categoryProperties = categoryPage.properties as Record<string, any>
                const categoryName =
                    categoryProperties.Name?.title?.[0]?.plain_text ||
                    categoryProperties.name?.title?.[0]?.plain_text ||
                    categoryProperties.title?.title?.[0]?.plain_text ||
                    'Unknown'
                return {
                    id: category.id,
                    name: categoryName,
                }
            } catch {
                return {
                    id: category.id,
                    name: 'Unknown',
                }
            }
        }),
    )

    const post: Post = {
        postId: properties.ID?.unique_id?.number || 0,
        categoryId: properties.CATEGORY?.relation?.[0]?.id || '',
        title: properties.Name?.title?.[0]?.plain_text || '',
        description: properties.description?.rich_text?.[0]?.plain_text || '',
        updatedAt: new Date(properties.updated_at?.date?.start || new Date()),
        createdAt: new Date(properties.created_at?.date?.start || new Date()),
        views: 0,
        isHide: properties.isHide?.number === 1,
        isNotice: properties.isNotice?.number === 1,
        isComment: properties.isComment?.number === 1,
        tags,
        categories,
    }

    return post
}

interface PropertyFilter {
    property: string
    rich_text?: {
        contains: string
    }
    relation?: {
        contains: string
    }
    number?: {
        equals: number
    }
}

interface CompoundFilter {
    and?: Array<PropertyFilter | CompoundFilter>
    or?: Array<PropertyFilter | CompoundFilter>
}

type Filter = PropertyFilter | CompoundFilter

interface Sort {
    property: string
    direction: 'ascending' | 'descending'
}

interface QueryParams {
    data_source_id: string
    page_size: number
    filter?: Filter
    sorts?: Sort[]
    start_cursor?: string
}

const getPostsInternal = async (params: GetPostsRequest): Promise<PaginatedPostListResponse> => {
    const { tagId, categoryId, page = 1, limit = 9, perPage = 9, sort = 'created_at', order = 'desc', search, isHide, isNotice, isComment } = params

    const filters: Filter[] = []

    if (search) {
        filters.push({
            or: [
                {
                    property: 'Name',
                    rich_text: {
                        contains: search,
                    },
                },
                {
                    property: 'description',
                    rich_text: {
                        contains: search,
                    },
                },
            ],
        })
    }

    if (categoryId && categoryId !== '') {
        filters.push({
            property: 'CATEGORY',
            relation: {
                contains: categoryId,
            },
        })
    }

    if (tagId && tagId !== '') {
        filters.push({
            property: 'TAG',
            relation: {
                contains: tagId,
            },
        })
    }

    if (isNotice !== undefined) {
        filters.push({
            property: 'isNotice',
            number: {
                equals: isNotice ? 1 : 0,
            },
        })
    }

    if (isComment !== undefined) {
        filters.push({
            property: 'isComment',
            number: {
                equals: isComment ? 1 : 0,
            },
        })
    }

    filters.push({
        property: 'isHide',
        number: {
            equals: (isHide ? 1 : 0) || 0,
        },
    })

    const filter = filters.length > 0 ? (filters.length === 1 ? filters[0] : { and: filters }) : undefined

    const sorts: Sort[] = []

    const sortPropertyMap: Record<string, string> = {
        created_at: 'created_at',
        updated_at: 'updated_at',
        title: 'Name',
        id: 'ID',
    }

    const sortProperty = sortPropertyMap[sort] || 'created_at'
    sorts.push({
        property: sortProperty,
        direction: order === 'asc' ? 'ascending' : 'descending',
    })

    const pageSize = perPage || limit || 9

    const targetOffset = (page - 1) * pageSize
    let allResults: PageObjectResponse[] = []
    let hasMore = true
    let nextCursor: string | undefined = undefined

    const queryParams: QueryParams = {
        data_source_id: POST_DATA_SOURCE_ID!,
        page_size: 100,
    }

    if (filter) {
        queryParams.filter = filter
    }

    if (sorts.length > 0) {
        queryParams.sorts = sorts
    }

    const notionClient = notion()

    let totalCount = 0
    let countCursor: string | undefined = undefined
    let countHasMore = true

    while (countHasMore) {
        const countQuery: QueryParams = {
            data_source_id: POST_DATA_SOURCE_ID!,
            page_size: 100,
            ...(filter && { filter }),
            ...(countCursor && { start_cursor: countCursor }),
        }

        const countRes = await notionClient.dataSources.query(countQuery as Parameters<typeof notionClient.dataSources.query>[0])
        totalCount += countRes.results.filter((item): item is PageObjectResponse => 'properties' in item && item.object === 'page').length

        countHasMore = countRes.has_more
        countCursor = countRes.next_cursor || undefined
    }

    while (hasMore && allResults.length < targetOffset + pageSize) {
        const currentQuery = { ...queryParams }
        if (nextCursor) {
            currentQuery.start_cursor = nextCursor
        }

        const res = await notionClient.dataSources.query(currentQuery as Parameters<typeof notionClient.dataSources.query>[0])

        const pageResults = res.results.filter((item): item is PageObjectResponse => 'properties' in item && item.object === 'page')

        allResults = [...allResults, ...pageResults]

        hasMore = res.has_more
        nextCursor = res.next_cursor || undefined
    }

    const paginatedResults = allResults.slice(targetOffset, targetOffset + pageSize)

    const posts: Post[] = await Promise.all(paginatedResults.map(mapNotionPageToPost))

    const response: PaginatedPostListResponse = {
        results: posts,
        page,
        limit: pageSize,
        perPage: pageSize,
        sort,
        order,
        hasMore: allResults.length > targetOffset + pageSize || hasMore,
        total: totalCount,
    }

    return response
}

export const getPosts = async (params: GetPostsRequest) => {
    const cached = unstable_cache(async () => getPostsInternal(params), QUERY_KEY.POST.LIST(params), {
        tags: QUERY_KEY.POST.LIST(params),
        revalidate: 3600,
    })
    return cached()
}

export const getPostById = async (postId: string) => {
    const notionClient = notion()

    // First, find the page with the matching postId
    const queryParams = {
        data_source_id: POST_DATA_SOURCE_ID!,
        page_size: 1,
        filter: {
            property: 'ID',
            number: {
                equals: parseInt(postId, 10)
            }
        }
    }

    const res = await notionClient.dataSources.query(queryParams as Parameters<typeof notionClient.dataSources.query>[0])

    const pages = res.results.filter((item): item is PageObjectResponse =>
        'properties' in item && item.object === 'page'
    )

    if (pages.length === 0) {
        throw new Error('Post not found')
    }

    return await mapNotionPageToPost(pages[0])
}

export const getPostContent = async (postId: string) => {
    const notionClient = notion()

    // First, find the page with the matching postId
    const queryParams = {
        data_source_id: POST_DATA_SOURCE_ID!,
        page_size: 1,
        filter: {
            property: 'ID',
            number: {
                equals: parseInt(postId, 10)
            }
        }
    }

    const res = await notionClient.dataSources.query(queryParams as Parameters<typeof notionClient.dataSources.query>[0])

    const pages = res.results.filter((item): item is PageObjectResponse =>
        'properties' in item && item.object === 'page'
    )

    if (pages.length === 0) {
        throw new Error('Post not found')
    }

    const blocks = await notionClient.blocks.children.list({
        block_id: pages[0].id,
        page_size: 100,
    })

    return {
        postId,
        blocks: blocks.results,
    }
}
