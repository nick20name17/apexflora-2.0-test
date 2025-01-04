import { api } from '../api'

import type { ShopProductsQueryParams, ShopProductsResponse } from './shop-products.types'

export const getShopProducts = async (queryParams: Partial<ShopProductsQueryParams>) => {
    const res = await api.get<ShopProductsResponse>(`/shop-products/`, {
        params: queryParams
    })

    return res.data
}
