import type { BaseQueryParams, Response } from '../api.types'

export type StatusProductName = 'delivering' | 'available' | 'pre_order'

export interface StatusProduct {
    id: number
    name: StatusProductName
}

export type StatusProductResponse = Response<StatusProduct>

export interface StatusProductQueryParams extends BaseQueryParams {
    search: string
    ordering: string
    limit: number
    offset: number
    name: StatusProductName
}
