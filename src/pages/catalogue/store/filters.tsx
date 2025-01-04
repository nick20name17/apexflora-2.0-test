import { create } from 'zustand'

import type { ShopProductsQueryParams } from '@/api/shop-products/shop-products.types'

interface FiltersState {
    filters: Partial<ShopProductsQueryParams>
    setFilters: (filters: Partial<ShopProductsQueryParams>) => void
}

export const useFilters = create<FiltersState>((set) => ({
    filters: {},
    setFilters: (filters: FiltersState['filters']) => {
        set({ filters })
    }
}))
