import type { BaseQueryParams, Response } from '../api.types'
import type { Discount } from '../discounts/discounts.types'
import type { ShopProduct } from '../shop-products/shop-products.types'
import type { StatusProduct } from '../status-products/status-products.types'

export interface Stock {
    id: number
    shop_product: ShopProduct
    status: StatusProduct
    quantity: number
    retail_price: number
    stock_price: number
    promotion: boolean
    is_visible: boolean
    visible_discount: number
    in_basket: number | null
    discounts: Discount[]
}

export interface PreorderStock {
    id: number
    price: number
    amount: number
    shop_product: ShopProduct
}

export interface StocksFullData {
    id: number
    shop_product: number
    status: number
    quantity: number
    quantity_sold: number
    retail_price: string
    stock_price: string
    promotion: boolean
    creator: number
    is_visible: boolean
    discounts: number[]
}

export interface StocksPayload {
    shop_product: number
    status: StatusProduct
    quantity: number
    quantity_sold: number
    retail_price: number
    stock_price: number
    promotion: boolean
    creator: number
    is_visible: boolean
    discounts: number[]
}

export type StocksResponse = Response<Stock>
export type PreorderStocksResponse = Response<PreorderStock>

export interface StocksQueryParams extends BaseQueryParams {
    name: string
    storage: string
    status: string
    quantity: string
    quantity_sold: string
    retail_price: string
    stock_price: string
    promotion: string
    categories: string
    search: string
    ordering: string
    is_preorder: boolean
}
