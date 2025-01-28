import { api } from '../api'

import type {
    CategoriesQueryParams,
    CategoriesResponse,
    Category,
    CategoryPayload
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

export const addCategory = async (payload: CategoryPayload) => {
    const res = await api.post<Category>('/categories/', payload)

    return res.data
}

export const patchCategory = async (id: number, payload: CategoryPayload) => {
    const res = await api.patch<Category>(`/categories/${id}/`, payload)

    return res.data
}

export const deleteCategory = async (id: number) => {
    await api.delete(`/categories/${id}/`)
}
