import { api } from '../api'

import type {
    AdminOrderPayload,
    Order,
    OrderPayload,
    OrderQueryParams,
    OrdersResponse
} from './orders.types'

export const getOrders = async (params: Partial<OrderQueryParams>) => {
    const res = await api.get<OrdersResponse>('/orders/', {
        params
    })

    return res.data
}

export const addOrder = async (data: OrderPayload) => {
    const res = await api.post<Order>('/orders/', data)

    return res.data
}

export const AddAdminOrders = async (data: AdminOrderPayload) => {
    const res = await api.post<Order>('/orders/admin/', data)

    return res.data
}

export const patchOrder = async (id: number, data: Partial<OrderPayload>) => {
    const res = await api.patch<Order>(`/orders/${id}/`, data)

    return res.data
}

export const removeOrder = async (id: number) => {
    await api.delete(`/orders/${id}/`)
}

export const getPreordersCSV = async () => {
    const res = await api.get<string>('/stock/preorder-orders/download-csv/', {
        responseType: 'text'
    })

    return res.data
}

export const makeOrderVisible = async (payload: { order: number }) => {
    const res = await api.post<Order>('/orders/visible/', payload)

    return res.data
}
