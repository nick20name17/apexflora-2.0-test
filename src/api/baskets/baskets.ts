import { api } from '../api'

import type {
    Cart,
    CartAddPayload,
    CartsQueryParams,
    CartsResponse
} from './baskets.types'

export const getCarts = async (queryParams: Partial<CartsQueryParams>) => {
    const res = await api.get<CartsResponse>(`/baskets/`, {
        params: queryParams
    })

    return res.data
}

export const addToCart = async (payload: CartAddPayload) => {
    const res = await api.post<Cart>(`/baskets/`, payload)

    return res.data
}

export const updateCart = async (stockId: number, payload: CartAddPayload) => {
    const res = await api.patch<Cart>(`/baskets/stocks/${stockId}/`, payload)

    return res.data
}

export const removeFromCart = async (stockId: number) => {
    const res = await api.delete<Cart>(`/baskets/stocks/${stockId}/`)

    return res.data
}
