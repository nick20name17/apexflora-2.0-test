import type { BaseQueryParams, PatchData, Response } from '@/api/api.types'

export interface Category {
    id: number
    name: string
    parent: number
    children: Category[]
}

export interface CategoriesQueryParams extends BaseQueryParams {
    name: string
    ordering: string
    only_parent: boolean
    ids: string
    level: number
    search: string
}

export type CategoryAddPayload = Omit<Category, 'id' | 'children'>

export type CategoryPatchData = PatchData<CategoryAddPayload>

export type CategoriesResponse = Response<Category>
