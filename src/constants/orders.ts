import type { Statuses } from '@/api/orders/orders.types'

export const orderStatuses: Statuses[] = [
    'approval',
    'pending',
    'shipped',
    'delivered',
    'canceled'
]

export type OrderStatuses = (typeof orderStatuses)[number]
