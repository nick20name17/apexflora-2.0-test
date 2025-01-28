import { Loader2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'sonner'

import { removeOrderItem } from '@/api/order-items/order-items'
import type { OrderItem } from '@/api/order-items/order-items.types'
import type { Order } from '@/api/orders/orders.types'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'

interface RemoveOrderItemsModalProps {
    orderItem: OrderItem
    order: Order
}

export const RemoveOrderItemModal = ({
    orderItem,
    order
}: RemoveOrderItemsModalProps) => {
    const queryClient = useQueryClient()
    const removeOrderItemMutation = useMutation({
        mutationFn: () => removeOrderItem(orderItem.id),
        onSuccess: () => {
            setOpen(false)
            toast.success(
                `${orderItem.stock_product.shop_product.product.name} видалено із  замовлення #${order.id}`
            )
            queryClient.invalidateQueries({
                queryKey: ['orders']
            })
        },
        onError: () => {
            toast.error(
                `Помилка під час видалення товару ${orderItem.stock_product.shop_product.product.name} із  замовлення #${order.id}`
            )
        }
    })

    const [open, setOpen] = useState(false)

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    className='hover:bg-destructive hover:text-destructive-foreground'
                    onClick={(e) => e.stopPropagation()}
                    variant='ghost'
                    size='icon'
                >
                    <Trash2 className='size-4' />
                </Button>
            </DialogTrigger>
            <DialogContent className='mx-2 rounded-md'>
                <DialogHeader className='text-left'>
                    <DialogTitle>
                        Видалити{' '}
                        <span className='text-destructive'>
                            {orderItem.stock_product.shop_product.product.name}
                        </span>{' '}
                        із замовлення #{order.id}?
                    </DialogTitle>
                </DialogHeader>

                <div className='flex items-center justify-end gap-x-4'>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                            setOpen(false)
                        }}
                        size='sm'
                        variant='secondary'
                    >
                        Відмінити
                    </Button>
                    <Button
                        disabled={removeOrderItemMutation.isLoading}
                        onClick={(e) => {
                            e.stopPropagation()
                            removeOrderItemMutation.mutate()
                        }}
                        size='sm'
                        variant='destructive'
                        className='flex w-24 items-center gap-x-1.5'
                    >
                        {removeOrderItemMutation.isLoading ? (
                            <Loader2 className='animate-spin' />
                        ) : (
                            'Видалити'
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
