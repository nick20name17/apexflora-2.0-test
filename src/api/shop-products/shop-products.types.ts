import type { BaseQueryParams, PatchData, Response } from '../api.types'
import type { Discount } from '../discounts/discounts.types'
import type { StatusProduct } from '../status-products/status-products.types'

export interface ShopProduct {
    id: number
    origin_id: string
    height: number
    weight_size: number
    diameter: number
    stage: number
    packaging_of: number
    quality: string
    image: string
    in_wish_list: boolean
    width: number
    length: number
    code_1c: string
    main_property: string
    producer: Producer
    product: {
        id: number
        name: string
        ukr_name: string
        description: string
        category: Category
    }
    colors: Color[]
    stocks: Stock[]
}

export interface Producer {
    id: number
    name: string
    country: Country
}

export interface Country {
    code: string
    name: string
    flag: string
}

export interface Product {
    id: number
    name: string
    ukr_name: string
    description: string
    category: Category
}

export interface Category {
    id: number
    name: string
    origin_id: string
    parent: number
}

export interface Color {
    id: number
    name: string
    hex: string
}
export interface Stock {
    id: number
    shop_product: ShopProduct
    status: StatusProduct
    quantity: number
    retail_price: number
    stock_price: number
    visible_discount: number
    promotion: boolean
    is_visible: boolean
    discounts: Discount[]
    in_basket: number | null
}

export interface InnerShopProduct {
    id: number
    product: number
    colors: number[]
    origin_id: string
    producer: number
    height: number
    weight_size: number
    stage: number
    packaging_of: number
    quality: string
    image: string
    code_1c: string
    width: number
    length: number
    main_property: string
}

export interface ShopProductsAddPayload {
    product: number
    colors: number[]
    origin_id: string
    producer: number
    height: number
    weight_size: number
    stage: number
    packaging_of: number
    quality: string
    code_1c: string
    width: number
    length: number
    main_property: string
    image: FormData
}

export type ShopProductsPatchData = PatchData<ShopProductsAddPayload>

export interface ShopProductsQueryParams extends BaseQueryParams {
    weight_size: string
    stage: string
    packaging_of: string
    quality: string
    code_1c: string
    origin_id: string
    name: string
    category: string
    country: string
    producer: string | null
    quantity: string
    price: string | null
    height: string
    startswith: string
    categories: string
    statuses: number
    countries: string
    in_wish_list: boolean
    colors: string
    multicolor: string
    has_discounts: boolean
    promotion: boolean | null
    has_code_1c: boolean | null
    has_image: boolean | null
    is_visible: boolean | null
    search: string
    ordering: string
}

export interface SupplierOrderData {
    product_status: number
    file: FormData
    category: string
}

export interface SupplierOrderResponse {
    amount_total: number
    count_updated: number
    not_updated: number
    order_id: number
}

export interface MinMaxValues {
    max_height: number
    max_width: number
    max_length: number
    max_weight_size: number
    min_height: number
    min_width: number
    min_length: number
    min_weight_size: number
    max_retail_price: number
    min_retail_price: number
}

export type ShopProductsResponse = Response<ShopProduct> & {
    possible_letters: string[]
    min_max_values: MinMaxValues
}
