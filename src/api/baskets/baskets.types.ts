import type { BaseQueryParams, PatchData, Response } from '../api.types'
import type { Stock } from '../shop-products/shop-products.types'

export interface Cart {
    id: number
    stock_product: Stock
    amount: number
    created_at: string
    creator: string
    discount: number
    visible_discount: string
}

export interface CartAddPayload {
    stock_product: number
    amount: number
    creator: number
}

export type CartPatchData = PatchData<CartAddPayload>

export interface CartsQueryParams extends BaseQueryParams {
    name: string
    status: string
    amount: string
    search: string
    ordering: string
}

export type CartsResponse = Response<Cart>
