import type { BaseQueryParams, Response } from '../api.types'
import type { Category } from '../categories/categories.types'

export interface Product {
    id: number
    name: string
    ukr_name: string
    description: string
    category: Category
}

export interface ProductPayload extends Omit<Product, 'id' | 'category'> {
    category: number
}

export type ProductResponse = Response<Product>

export interface ProductQueryParams extends BaseQueryParams {
    search: string
    ordering: string
}
