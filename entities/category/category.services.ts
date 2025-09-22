import { QUERY_KEY } from '@/shared/utils/query-key'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { unstable_cache } from 'next/cache'
import { notion } from '../common/notion.client'
import { CATEGORY_DATA_SOURCE_ID } from './category.constant'
import { CategoriesListResponse, Category, GetCategoriesRequest } from './category.types'

interface NotionCategoryProperties {
    ID?: {
        unique_id?: {
            number?: number
        }
    }
    Name?: {
        title?: Array<{ plain_text?: string }>
    }
    ARTICLE?: {
        relation?: Array<{ id: string }>
    }
    isHide?: {
        number?: number
    }
}

const mapNotionPageToCategory = (page: PageObjectResponse) => {
    const properties = page.properties as NotionCategoryProperties

    const category: Category = {
        id: page.id,
        categoryId: properties.ID?.unique_id?.number || 0,
        name: properties.Name?.title?.[0]?.plain_text || '',
        articleCount: properties.ARTICLE?.relation?.length || 0,
        createdAt: new Date(page.created_time),
        isHide: properties.isHide?.number === 1,
    }

    return category
}

const getCategoriesInternal = async (params: GetCategoriesRequest = {}): Promise<CategoriesListResponse> => {
    const { isHide = false } = params

    const notionClient = notion()

    const queryParams = {
        data_source_id: CATEGORY_DATA_SOURCE_ID!,
        page_size: 100,
        filter: {
            property: 'isHide',
            number: {
                equals: isHide ? 1 : 0,
            },
        },
        sorts: [
            {
                property: 'ID',
                direction: 'ascending' as const,
            },
        ],
    }

    const res = await notionClient.dataSources.query(queryParams as Parameters<typeof notionClient.dataSources.query>[0])

    const pageResults = res.results.filter((item): item is PageObjectResponse => 'properties' in item && item.object === 'page')

    const categories: Category[] = pageResults.map(mapNotionPageToCategory)

    const response: CategoriesListResponse = {
        results: categories,
        total: categories.length,
    }

    return response
}

export const getCategories = async (params?: GetCategoriesRequest) => {
    const cached = unstable_cache(async () => getCategoriesInternal(params), QUERY_KEY.CATEGORY.LIST(params), {
        tags: QUERY_KEY.CATEGORY.LIST(params),
        revalidate: 3600,
    })
    return cached()
}

export const getCategoryById = async (categoryId: string) => {
    const notionClient = notion()

    const page = (await notionClient.pages.retrieve({
        page_id: categoryId,
    })) as PageObjectResponse

    if (!page || page.object !== 'page') {
        throw new Error('Category not found')
    }

    return mapNotionPageToCategory(page)
}
