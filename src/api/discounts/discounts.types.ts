import type { BaseQueryParams, Response } from '../api.types'

export interface Discount {
    id: number
    name: string
    percentage: string
    start_date: string
    end_date: string
    shop: number
    stocks: number[]
}

export type DiscountPayload = Omit<Discount, 'id' | 'shop' | 'stocks'>

export type DiscountsResponse = Response<Discount>

export interface DiscountsQueryParams extends BaseQueryParams {
    name: string
    search: string
    ordering: string
    country: string
}
