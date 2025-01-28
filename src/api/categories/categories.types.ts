import type { BaseQueryParams, Response } from '@/api/api.types'

export interface Category {
    id: number
    name: string
    parent: string | null
    children: Category[]
}

export type CategoryPayload = Omit<Category, 'id' | 'children'>

export interface CategoriesQueryParams extends BaseQueryParams {
    name: string
    ordering: string
    only_parent: boolean
    ids: string
    level: number
    search: string
}

export type CategoryAddPayload = Omit<Category, 'id' | 'children'>

export type CategoriesResponse = Response<Category>
