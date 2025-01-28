import type { BaseQueryParams, Response } from '../api.types'
import type { ShopProduct } from '../shop-products/shop-products.types'
import type { StatusProduct } from '../status-products/status-products.types'
import type { Stock } from '../stock/stock.types'

// FIXME: Check Stock and StockProduct types
export interface OrderItem {
    id: number
    stock_product: Stock
    amount: number
    price: number
    creator: number
    discount: number
    percentage: number
    in_wish_list: boolean
}

export interface AdminOrderItem {
    id: number
    amount: number
}

export interface StockProduct {
    id: number
    shop_product: ShopProduct
    status: StatusProduct
    quantity: number
    retail_price: string
    stock_price: string
    promotion: boolean
}

export interface OrderItemsPayload {
    stock_product: number
    amount: number
    price: number
    creator: number
    discount?: number
    orders: number[]
}

export interface OrderItemsQueryParams extends BaseQueryParams {
    creator: string
    is_supplier: boolean
    created_at: string
    is_preorder: boolean
    stock_status: string
    is_visible: boolean
    search: string
    ordering: string
}

export type OrderItemsResponse = Response<OrderItem>
