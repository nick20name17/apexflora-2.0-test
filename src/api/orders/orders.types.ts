import type { BaseQueryParams, Response } from '../api.types'
import type { AdminOrderItem, OrderItem } from '../order-items/order-items.types'
import type { ServiceManager } from '../users/users.types'

export type Statuses =
    | 'pending'
    | 'approval'
    | 'shipped'
    | 'delivered'
    | ('canceled' & (string & {}))

export interface Order {
    id: number
    order_items: OrderItem[]
    status: Statuses
    created_at: string
    recipient: Recipient
    creator: OrdersCreator
    comments: Comment[]
    discount: number
    address: Address
    is_visible: boolean
    is_supplier: boolean
}

export interface OrdersCreator {
    id: number
    email: string
    first_name: string
    last_name: string
    phone_number: string
    company: string
    position: string
    role: string
    city: string
    service_manager: ServiceManager
    code_1c: string
    bonus_program: number
    last_login: string
}

interface Recipient {
    id: number
    creator: number
    first_name: string
    last_name: string
    phone_number: string
    email: string
}

export interface Comment {
    id: number
    order: number
    text: string
    creator: string
}

export interface Address {
    id: number
    creator: number
    street: string
    city: string
    title: string
    description: string
}

export interface OrderPayload {
    status: Statuses
    recipient: number
    creator: number
    is_supplier?: boolean
    discount?: number
    address: number | null
}

export interface AdminOrderPayload {
    is_supplier: boolean
    order_items: AdminOrderItem[]
    creator: number
    address: number | null
    status: string
    discount: number
}

export interface OrderQueryParams extends BaseQueryParams {
    creator: string
    is_supplier: boolean
    created_at: string
    is_preorder: boolean
    stock_status: string
    is_visible: boolean
    search: string
    ordering: string
}

export type OrdersResponse = Response<Order>
