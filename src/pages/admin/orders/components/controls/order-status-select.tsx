import { useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'sonner'

import { OrderStatusSelector } from './order-status-selector'
import { patchOrder } from '@/api/orders/orders'
import type { Order, OrderPayload, Statuses } from '@/api/orders/orders.types'
import { cn } from '@/lib/utils'
import { getStatusName } from '@/pages/profile/orders/components/order-card'

interface OrderStatusSelectProps {
    order: Order
    className?: string
}

export const OrderStatusSelect = ({ order, className }: OrderStatusSelectProps) => {
    const [status, setStatus] = useState<Statuses>(order.status)

    const patchOrderMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: Partial<OrderPayload> }) =>
            patchOrder(id, payload),
        onSuccess: (data) => {
            toast.success(
                `Статус замовлення #${order.id} успішно змінено на ${getStatusName(data.status).displayName}`
            )
        },
        onError: () => {
            toast.error('Щось пішло не так')
        }
    })

    const { className: statusClassName } = getStatusName(status)

    const onStatusChange = (status: string) => {
        setStatus(status as Statuses)
        patchOrderMutation.mutate({
            id: order.id,
            payload: { status: status as Statuses }
        })
    }

    return (
        <OrderStatusSelector
            onStatusChange={onStatusChange}
            status={status}
            className={cn(className, statusClassName)}
        />
    )
}
