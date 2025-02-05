import type { BaseQueryParams, Response } from '../api.types'
import type { Discount } from '../discounts/discounts.types'
import type { ShopProduct } from '../shop-products/shop-products.types'
import type { StatusProduct } from '../status-products/status-products.types'

export interface Cart {
    id: number
    stock_product: StockProduct
    amount: number
    created_at: string
    creator: string
    discount: number
    visible_discount: number
    in_wish_list: boolean
}

export interface StockProduct {
    id: number
    shop_product: ShopProduct
    status: StatusProduct
    quantity: number
    retail_price: string
    stock_price: string
    promotion: boolean
    discounts: Discount[]
  }

export interface CartAddPayload {
    stock_product: number
    amount: number
    creator: number
}

export interface CartsQueryParams extends BaseQueryParams {
    name: string
    status: string
    amount: string
    search: string
    ordering: string
}

export type CartsResponse = Response<Cart>
