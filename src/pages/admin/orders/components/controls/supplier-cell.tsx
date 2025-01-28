import { useMutation, useQueryClient } from 'react-query'

import { makeOrderVisible } from '@/api/orders/orders'
import type { Order } from '@/api/orders/orders.types'
import { Switch } from '@/components/ui/switch'

interface PromoCellProps {
    order: Order
}
export const SupplierToggle = ({ order }: PromoCellProps) => {
    const queryClient = useQueryClient()

    const patchStockMutation = useMutation({
        mutationFn: ({ payload }: { payload: { order: number } }) => {
            return makeOrderVisible(payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries('orders')
            queryClient.invalidateQueries('shop-products')
        }
    })

    return (
        <Switch
            disabled={order?.is_visible}
            onCheckedChange={() => {
                patchStockMutation.mutate({
                    payload: {
                        order: order.id
                    }
                })
            }}
            checked={order?.is_visible}
        />
    )
}
