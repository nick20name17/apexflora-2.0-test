import type { UseFormReturn } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { z } from 'zod'

import { AddressSelect } from '../controls/address-select'
import { OrderStatusSelector } from '../controls/order-status-selector'
import { ProductsCatalogue } from '../products-catalogue'

import {
    addOrderItem,
    patchOrderItem,
    removeOrderItem
} from '@/api/order-items/order-items'
import type { OrderItemsPayload } from '@/api/order-items/order-items.types'
import { AddAdminOrders, patchOrder, removeOrder } from '@/api/orders/orders'
import type { AdminOrderPayload, Order } from '@/api/orders/orders.types'
import { Checkbox } from '@/components/ui/checkbox'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'
import { CreateModal, DeleteModal, EditModal } from '@/pages/admin/components/base-modal'
import { AddAddressModal } from './add-address'

const orderSchema = z.object({
    // recipient: z.string().min(1, 'Це поле обовязкове'),
    address: z.string().min(1, 'Це поле обовязкове'),
    order_items: z
        .array(
            z.object({
                id: z.number().min(1, 'Це поле обовязкове'),
                amount: z.number().min(1, 'Це поле обовязкове'),
                price: z.number().min(1, 'Це поле обовязкове')
            })
        )
        .min(1, 'Необхідно додати хоча б один товар'),
    discount: z.coerce.number().min(0, 'Це поле обовязкове'),
    status: z
        .enum(['pending', 'approval', 'shipped', 'delivered', 'canceled'])
        .default('pending'),
    is_supplier: z.boolean().default(false)
})

const orderFormFields = (
    form: UseFormReturn<z.infer<typeof orderSchema>>,
    order?: Order
) => (
    <>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4'>
            {/* <FormField
                control={form.control}
                name='recipient'
                render={({ field }) => (
                    <FormItem className='w-full max-w-full'>
                        <FormLabel>Отримувач</FormLabel>
                        <div className='flex items-center gap-x-2'>
                            <FormControl>
                                <RecepientSelect
                                    recepient={field.value}
                                    setRecepient={field.onChange}
                                />
                            </FormControl>
                            <AddUserModal size='icon' />
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            /> */}

            <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Статус</FormLabel>
                        <FormControl>
                            <OrderStatusSelector
                                className='h-10 !border !border-border'
                                status={field.value}
                                onStatusChange={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                    <FormItem className='min-w-40 flex-1'>
                        <FormLabel>Адреса доставки</FormLabel>

                        <div className='flex items-center gap-x-2'>
                            <FormControl>
                                <AddressSelect
                                    cityName={order?.address?.city ?? ''}
                                    address={field.value}
                                    setAddress={field.onChange}
                                />
                            </FormControl>
                            <AddAddressModal size='icon' />
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 items-end gap-2 md:gap-4'>
            <FormField
                control={form.control}
                name='order_items'
                render={() => (
                    <FormItem className='min-w-40 flex-1'>
                        <FormLabel>Каталог продуктів</FormLabel>

                        <div className='flex items-center gap-x-2'>
                            <FormControl>
                                <ProductsCatalogue />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='discount'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Знижка</FormLabel>

                        <FormControl>
                            <Input
                                {...field}
                                type='number'
                                inputMode='numeric'
                                placeholder='30'
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
        </div>

        <FormField
            control={form.control}
            name='is_supplier'
            render={({ field }) => (
                <FormItem className='flex h-10 sm:w-[calc(50%-8px)] flex-row items-start space-x-3 space-y-0 rounded-md border p-2'>
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <FormLabel>Замовлення на надходження</FormLabel>
                </FormItem>
            )}
        />

    </>
)

export const AddOrderModal = ({ size = 'sm' }: { size?: 'sm' | 'icon' }) => {
    const { currentUser } = useAuth()
    return (
        <CreateModal
            title='Замовлення'
            defaultValues={{
                // recipient: '',
                address: '',
                discount: 0,
                order_items: [],
                status: 'pending',
                is_supplier: false
            }}
            schema={orderSchema}
            mutation={(data) => {
                const payload: AdminOrderPayload = {
                    ...data,
                    creator: currentUser?.id!,
                    discount: data.discount,
                    is_supplier: data.is_supplier,
                    address: data.address === 'self-pick' ? null : +data.address
                }
                return AddAdminOrders(payload)
            }}
            queryKey={['orders', 'pre-orders', 'shop-products', 'delivery-address']}
            renderFields={orderFormFields}
            size={size}
        />
    )
}

export const EditOrderModal = ({ order }: { order: Order }) => {
    const { currentUser } = useAuth()

    const queryClient = useQueryClient()

    const addOrderItemMutation = useMutation({
        mutationFn: async (orderItem: OrderItemsPayload) => {
            const res = await addOrderItem(orderItem)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['orders']
            })
        }
    })

    const patchOrderItemMutation = useMutation({
        mutationFn: async ({
            id,
            payload
        }: {
            id: number
            payload: Partial<OrderItemsPayload>
        }) => {
            const res = await patchOrderItem(id, payload)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['orders']
            })
        }
    })

    const removeOrderItemMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await removeOrderItem(id)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['orders']
            })
        }
    })

    return (
        <EditModal
            title='Замовлення'
            transformDefaultValues={() => {
                return {
                    address: order.address?.id
                        ? order.address?.id?.toString()
                        : 'self-pick',
                    recipient: order.recipient?.id?.toString(),
                    status: order.status,
                    is_supplier: order.is_supplier,
                    discount: order.discount,
                    order_items: order.order_items.map((orderItem) => ({
                        id: orderItem.stock_product.id,
                        amount: orderItem?.amount,
                        price: orderItem?.price,
                        discount: orderItem?.discount ?? 0
                    }))
                }
            }}
            schema={orderSchema}
            mutation={(_, data) => {
                const payload = {
                    ...data,
                    creator: currentUser?.id!,
                    discount: data.discount,
                    is_supplier: data.is_supplier,
                    address: data.address === 'self-pick' ? null : +data.address
                }

                const toDelete = order.order_items.filter(
                    (orderItem) =>
                        !data.order_items.some(
                            (existingItem) =>
                                existingItem.id === orderItem.stock_product?.id
                        )
                )

                const toUpdate = data.order_items.filter((existingItem) =>
                    order.order_items.some(
                        (orderItem) =>
                            orderItem.stock_product?.id === existingItem.id &&
                            (orderItem.amount !== existingItem.amount ||
                                orderItem.price !== existingItem.price)
                    )
                )

                const toAdd = data.order_items.filter(
                    (existingItem) =>
                        !order.order_items.some(
                            (orderItem) => orderItem.stock_product?.id === existingItem.id
                        )
                )

                // Add new items
                toAdd.forEach((item) => {
                    addOrderItemMutation.mutate({
                        amount: item.amount,
                        price: item.price,
                        stock_product: item.id,
                        creator: currentUser?.id!,
                        orders: [order.id]
                    })
                })

                toUpdate.forEach((item) => {
                    const orderItem = order.order_items.find(
                        (orderItem) => orderItem.stock_product?.id === item.id
                    )

                    if (orderItem) {
                        patchOrderItemMutation.mutate({
                            id: orderItem.id,
                            payload: {
                                amount: item.amount,
                                price: item.price
                            }
                        })
                    }
                })

                toDelete.forEach((item) => {
                    removeOrderItemMutation.mutate(item.id)
                })

                // Patch the order with updated payload
                return patchOrder(order.id, payload)
            }}
            data={order}
            queryKey={['orders', 'pre-orders']}
            renderFields={(form) => orderFormFields(form, order)}
        />
    )
}

export const RemoveOrderModal = ({ order }: { order: Order }) => (
    <DeleteModal
        title='Замовлення'
        data={order}
        mutation={removeOrder}
        queryKey={['orders', 'pre-orders']}
    />
)
