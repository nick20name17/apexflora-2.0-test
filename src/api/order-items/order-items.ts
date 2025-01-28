import { api } from '../api'

import type { OrderItemsPayload, OrderItemsResponse } from './order-items.types'

export const addOrderItem = async (data: OrderItemsPayload) => {
    const res = await api.post<OrderItemsResponse>('/order-items/', data)

    return res.data
}

export const patchOrderItem = async (id: number, data: Partial<OrderItemsPayload>) => {
    const res = await api.patch<OrderItemsResponse>(`/order-items/${id}/`, data)

    return res.data
}

export const removeOrderItem = async (id: number) => {
    await api.delete(`/order-items/${id}/`)
}
