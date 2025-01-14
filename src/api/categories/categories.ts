import { api } from '../api'

import type {
    CategoriesQueryParams,
    CategoriesResponse,
    Category
} from './categories.types'

export const getAllCategories = async (queryParams: Partial<CategoriesQueryParams>) => {
    const res = await api.get<Category[]>(`/categories/all/`, {
        params: queryParams
    })

    return res.data
}

export const getCategories = async (queryParams: Partial<CategoriesQueryParams>) => {
    const res = await api.get<CategoriesResponse>('/categories/', {
        params: queryParams
    })

    return res.data
}
