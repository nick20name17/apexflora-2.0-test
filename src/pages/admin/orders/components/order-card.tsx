import { format } from 'date-fns'
import { Check, ChevronDown, Info, Loader2 } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toast } from 'sonner'

import { OrderStatusSelect } from './controls/order-status-select'
import { SupplierToggle } from './controls/supplier-cell'
import { EditOrderModal, RemoveOrderModal } from './modals/modals'
import { RemoveOrderItemModal } from './modals/remove-order-item'
import { UserInfo } from './user-info'
import { patchOrderItem } from '@/api/order-items/order-items'
import type { OrderItem, OrderItemsPayload } from '@/api/order-items/order-items.types'
import type { Order } from '@/api/orders/orders.types'
import { getStatusProductsDisplay } from '@/components/status-tabs'
import { Button } from '@/components/ui/button'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import ImageWithSkeleton from '@/components/ui/image-with-skeleton'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { DownloadOrdersPdfBtn } from '@/pages/profile/orders/components/download-orders-pdf-btn'

interface OrderCardProps {
    order: Order
}

export const AdminOrderCard = ({ order }: OrderCardProps) => {
    const [open, setOpen] = useState(false)

    const totalPrice = order.order_items.reduce((acc, item) => {
        return acc + item.amount * item.price
    }, 0)

    const totalPriceWithDiscount = totalPrice - order.discount

    const [status] = useQueryState('status', {
        defaultValue: 'orders'
    })

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className='rounded-md border-2 border-secondary p-4 transition-colors data-[state=open]:border-primary'
        >
            <CollapsibleTrigger className='flex w-full items-center justify-between gap-x-8'>
                <div
                    className={cn(
                        'grid flex-1 grid-cols-[1fr,2fr,1fr,1.2fr,1fr,2fr] gap-x-4',
                        status === 'supplier'
                            ? 'grid-cols-[1fr,2fr,1fr,1.2fr,1fr,2.5fr]'
                            : 'grid-cols-[1fr,2fr,1fr,1.2fr,1fr,2fr]'
                    )}
                >
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'># Замовлення</span>
                        <span className='text-primary'>{order.id}</span>
                    </div>
                    <UserInfo order={order} />
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'>Дата оформлення</span>
                        <span className='text-primary'>
                            {format(order.created_at, 'dd.MM.yyyy')}
                        </span>
                    </div>
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'>Спосіб оплати</span>
                        <span className='text-primary'>Самовивіз</span>
                    </div>
                    <div className='flex flex-col items-start gap-y-0.5 truncate'>
                        <span className='text-xs'>Статус</span>
                        <OrderStatusSelect
                            className='h-7 p-2'
                            order={order}
                        />
                    </div>
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'>Сума</span>
                        <span
                            className={cn(
                                order.discount > 0 ? 'flex items-center gap-x-1' : ''
                            )}
                        >
                            {order.discount > 0 ? (
                                <span className='text-sm text-foreground/80 line-through'>
                                    {totalPrice} ₴
                                </span>
                            ) : null}
                            <span className='text-primary'>
                                {totalPriceWithDiscount} ₴
                            </span>
                        </span>
                    </div>
                </div>

                <div className='space-x-2'>
                    {status === 'supplier' ? (
                        <Tooltip delayDuration={300}>
                            <TooltipTrigger>
                                <SupplierToggle order={order} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Зробити доступним для продажу</p>
                            </TooltipContent>
                        </Tooltip>
                    ) : null}

                    <RemoveOrderModal order={order} />
                    <EditOrderModal order={order} />
                    <DownloadOrdersPdfBtn order={order} />
                    <Button
                        size='icon'
                        variant='outline'
                    >
                        <ChevronDown
                            className={cn(
                                'size-4 transition-transform',
                                open ? 'rotate-180' : ''
                            )}
                        />
                    </Button>
                </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
                <div className='mt-4 flex flex-col gap-y-2'>
                    {order.order_items.length ? (
                        order.order_items.map((orderItem) => (
                            <AdminOrderItemCard
                                key={orderItem.id}
                                orderItem={orderItem}
                                order={order}
                            />
                        ))
                    ) : (
                        <div className='text-primary'>Немає товарів для замовлення</div>
                    )}
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}

const PriceInput = ({ orderItem }: { orderItem: OrderItem }) => {
    const form = useForm({
        defaultValues: {
            price: orderItem.price
        }
    })

    const currentPrice = form.watch('price')

    const [isFocused, setIsFocused] = useState(false)

    const patchOrderItemMutation = useMutation({
        mutationFn: ({
            id,
            payload
        }: {
            id: number
            payload: Partial<OrderItemsPayload>
        }) => patchOrderItem(id, payload),
        onSuccess: () => {
            toast.success(
                `Ціну товару ${orderItem.stock_product.shop_product.product.name} успішно змінено на ${currentPrice} ₴`
            )
            setIsFocused(false)
        }
    })

    const onSubmit = (data: { price: number }) => {
        patchOrderItemMutation.mutate({
            id: orderItem.id,
            payload: {
                price: data.price
            }
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='relative w-full'
            >
                <FormField
                    disabled={patchOrderItemMutation.isLoading}
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='relative overflow-hidden'>
                                    <span className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50'>
                                        ₴
                                    </span>
                                    <Input
                                        {...field}
                                        className='peer h-7 p-1 pl-6 text-sm focus-visible:ring-0 focus-visible:ring-offset-0'
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        placeholder='0.00'
                                        type='number'
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    onFocus={() => setIsFocused(true)}
                    type='submit'
                    size='icon'
                    className={cn(
                        'absolute right-1 top-1/2 size-5 shrink-0 -translate-y-1/2 rounded-full transition-all',
                        isFocused
                            ? 'translate-x-0 opacity-100'
                            : 'translate-x-full opacity-0'
                    )}
                    disabled={
                        !currentPrice?.toString().trim() ||
                        patchOrderItemMutation.isLoading
                    }
                >
                    {patchOrderItemMutation.isLoading ? (
                        <Loader2 className='!size-3 animate-spin' />
                    ) : (
                        <Check className='!size-3' />
                    )}
                </Button>
            </form>
        </Form>
    )
}

const AmountInput = ({ orderItem }: { orderItem: OrderItem }) => {
    const form = useForm({
        defaultValues: {
            amount: orderItem.amount
        }
    })

    const currentAmount = form.watch('amount')

    const [isFocused, setIsFocused] = useState(false)

    const patchOrderItemMutation = useMutation({
        mutationFn: ({
            id,
            payload
        }: {
            id: number
            payload: Partial<OrderItemsPayload>
        }) => patchOrderItem(id, payload),
        onSuccess: () => {
            toast.success(
                `Кількість товару ${orderItem.stock_product.shop_product.product.name} успішно змінено на ${currentAmount}`
            )
            setIsFocused(false)
        }
    })

    const onSubmit = (data: { amount: number }) => {
        patchOrderItemMutation.mutate({
            id: orderItem.id,
            payload: {
                amount: data.amount
            }
        })
    }

    const roundToPackaging = (value: number) => {
        const packaging = orderItem?.stock_product?.shop_product?.packaging_of || 1
        return Math.round(value / packaging) * packaging
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='relative w-full'
            >
                <FormField
                    disabled={patchOrderItemMutation.isLoading}
                    control={form.control}
                    name='amount'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='overflow-hidden'>
                                    <Input
                                        {...field}
                                        className='h-7 p-1 text-sm focus-visible:ring-0 focus-visible:ring-offset-0'
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={(e) => {
                                            const roundedValue = roundToPackaging(
                                                Number(e.target.value)
                                            )
                                            form.setValue('amount', roundedValue)
                                            setIsFocused(false)
                                        }}
                                        placeholder='4'
                                        type='number'
                                        step={
                                            orderItem?.stock_product?.shop_product
                                                ?.packaging_of || 1
                                        }
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    onFocus={() => setIsFocused(true)}
                    type='submit'
                    size='icon'
                    className={cn(
                        'absolute right-1 top-1/2 size-5 shrink-0 -translate-y-1/2 rounded-full transition-all',
                        isFocused
                            ? 'translate-x-0 opacity-100'
                            : 'translate-x-full opacity-0'
                    )}
                    disabled={
                        !currentAmount?.toString().trim() ||
                        patchOrderItemMutation.isLoading
                    }
                >
                    {patchOrderItemMutation.isLoading ? (
                        <Loader2 className='!size-3 animate-spin' />
                    ) : (
                        <Check className='!size-3' />
                    )}
                </Button>
            </form>
        </Form>
    )
}

interface OrderItemCardProps {
    orderItem: OrderItem
    order: Order
}

const AdminOrderItemCard = ({ orderItem, order }: OrderItemCardProps) => {
    const totalPrice = orderItem.amount * orderItem.price
    const totalPriceWithDiscount = totalPrice - orderItem.discount

    return (
        <div className='flex items-center justify-between gap-x-4 rounded-md border-2 border-secondary p-1'>
            <div className='flex w-64 items-center gap-x-2 truncate'>
                <div className='h-16 w-24 shrink-0'>
                    {orderItem.stock_product.shop_product.image ? (
                        <ImageWithSkeleton
                            className='h-full w-full rounded-sm object-cover'
                            src={orderItem.stock_product.shop_product.image}
                            alt={orderItem.stock_product.shop_product.product.ukr_name}
                        />
                    ) : (
                        <Skeleton className='h-full w-full rounded-sm object-cover' />
                    )}
                </div>
                <div className='flex flex-col gap-y-0.5 truncate text-sm'>
                    <h1 className='truncate font-bold text-primary'>
                        {orderItem.stock_product.shop_product.product.ukr_name}
                    </h1>
                    <span className='text-foreground/60'>
                        Артикул: {orderItem.stock_product.shop_product.origin_id}
                    </span>
                </div>
            </div>
            <div className='grid h-full flex-1 grid-cols-[0.3fr,130px,130px,0.5fr,1fr] items-center gap-x-4 pr-4'>
                <div className='flex flex-col items-start gap-y-0.5'>
                    <span className='text-xs'>Статус</span>
                    <span className='flex items-center gap-1 text-sm text-primary [&_svg]:size-4 [&_svg]:shrink-0'>
                        {getStatusProductsDisplay(orderItem.stock_product.status.id).icon}
                        {getStatusProductsDisplay(orderItem.stock_product.status.id).name}
                    </span>
                </div>
                <div className='flex flex-col items-start gap-y-0.5'>
                    <span className='text-xs'>Ціна</span>
                    <PriceInput orderItem={orderItem} />
                </div>
                <div className='flex flex-col items-start gap-y-0.5'>
                    <Tooltip delayDuration={500}>
                        <TooltipTrigger className='flex items-center gap-x-1 text-xs'>
                            <Info className='size-3' /> Кількість{' '}
                            {orderItem.stock_product.quantity} /{' '}
                            {orderItem.stock_product.shop_product.packaging_of}
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Доступна кількість / Пакування</p>
                        </TooltipContent>
                    </Tooltip>
                    <AmountInput orderItem={orderItem} />
                </div>
                <div className='flex flex-col items-start gap-y-0.5'>
                    <span className='text-xs'>Сума</span>
                    <span
                        className={cn(
                            orderItem.discount > 0 ? 'flex items-center gap-x-1' : ''
                        )}
                    >
                        {orderItem.discount > 0 ? (
                            <span className='text-sm text-foreground/80 line-through'>
                                {totalPrice} ₴
                            </span>
                        ) : null}
                        <span className='text-primary'>{totalPriceWithDiscount} ₴</span>
                    </span>
                </div>
                <div className='flex justify-end'>
                    <RemoveOrderItemModal
                        order={order}
                        orderItem={orderItem}
                    />
                </div>
            </div>
        </div>
    )
}
