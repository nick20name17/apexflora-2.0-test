import { api } from '../api'

import type { OrderPayload, OrderQueryParams, OrdersResponse } from './orders.types'

export const getOrders = async (params: Partial<OrderQueryParams>) => {
    const res = await api.get<OrdersResponse>('/orders/', {
        params
    })

    return res.data
}

export const addOrder = async (data: OrderPayload) => {
    const res = await api.post<OrdersResponse>('/orders/', data)

    return res.data
}
