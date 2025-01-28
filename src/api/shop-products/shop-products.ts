import { api } from '../api'

import type {
    ShopProduct,
    ShopProductsPayload,
    ShopProductsQueryParams,
    ShopProductsResponse,
    SupplierOrderPayload,
    SupplierOrderResponse
} from './shop-products.types'

export const getShopProducts = async (queryParams: Partial<ShopProductsQueryParams>) => {
    const res = await api.get<ShopProductsResponse>(`/shop-products/`, {
        params: queryParams
    })

    return res.data
}

export const addShopProduct = async (payload: Partial<ShopProductsPayload>) => {
    const res = await api.post<ShopProduct>('/shop-products/', payload)

    return res.data
}

export const addShopProductImage = async (
    id: number,
    payload: { payload: { image: FormData | null } }
) => {
    const res = await api.patch<ShopProduct>(`/shop-products/${id}/`, payload.payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return res.data
}

export const addSupplierOrder = async (payload: SupplierOrderPayload) => {
    const res = await api.post<SupplierOrderResponse>(
        '/shop_products/import-supplier-order/',
        payload
    )

    return res.data
}

export const patchShopProducts = async (
    id: number,
    payload: Partial<ShopProductsPayload>
) => {
    const res = await api.patch<ShopProduct>(`/shop-products/${id}/`, payload)
    return res.data
}

export const removeShopProduct = async (id: number) => {
    await api.delete(`/shop-products/${id}/`)
}
