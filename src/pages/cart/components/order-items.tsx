import { Clock } from 'lucide-react'

import { CartTable } from './cart-table/cart-table'
import { columns } from './cart-table/columns'
import { OrderItemMobile } from './order-item-mobile'
import { DeliveryIcon, InStockIcon } from '@/components/icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCartOperations } from '@/hooks/use-cart-operations'
import { formatPrice } from '@/hooks/use-catalogue-operations'
import { useMediaQuery } from '@/hooks/use-media-query'

export const OrderItems = () => {
    const { totalDiscounts, statusTotalPrices, statusProducts } = useCartOperations()

    const isXl = useMediaQuery('(max-width: 1280px)')

    return (
        <ScrollArea className='h-full max-xl:flex-1 lg:max-h-[calc(100%-140px)] xl:pr-3'>
            <div className='h-full space-y-5'>
                {statusProducts.preOrder?.length ? (
                    <div className='rounded-lg py-3.5 xl:border'>
                        <div className='flex items-center justify-between gap-x-4 lg:px-5'>
                            <div className='flex items-center gap-x-2'>
                                <Clock className='size-6' />
                                <span className='text-sm'>Передзамовлення</span>
                            </div>

                            <div className='flex items-center gap-x-2'>
                                {totalDiscounts?.preOrder > 0 ? (
                                    <span className='text-sm text-foreground/80 line-through'>
                                        {formatPrice(statusTotalPrices.preOrder)} ₴
                                    </span>
                                ) : null}
                                <span>
                                    {formatPrice(
                                        statusTotalPrices.preOrder -
                                            totalDiscounts.preOrder
                                    )}{' '}
                                    ₴
                                </span>
                            </div>
                        </div>
                        {isXl ? (
                            <div className='mt-3 space-y-3'>
                                {statusProducts.preOrder.map((cart) => (
                                    <OrderItemMobile
                                        key={cart.id}
                                        cart={cart}
                                    />
                                ))}
                            </div>
                        ) : (
                            <CartTable
                                columns={columns}
                                data={statusProducts.preOrder}
                            />
                        )}
                    </div>
                ) : null}
                {statusProducts.available?.length ? (
                    <div className='rounded-lg py-3.5 xl:border'>
                        <div className='flex items-center justify-between gap-x-4 xl:px-5'>
                            <div className='flex items-center gap-x-2'>
                                <InStockIcon className='size-6' />
                                <span className='text-sm'>В наявності</span>
                            </div>

                            <div className='flex items-center gap-x-2'>
                                {totalDiscounts?.available > 0 ? (
                                    <span className='text-sm text-foreground/80 line-through'>
                                        {formatPrice(statusTotalPrices.available)} ₴
                                    </span>
                                ) : null}
                                <span>
                                    {formatPrice(
                                        statusTotalPrices.available -
                                            totalDiscounts.available
                                    )}{' '}
                                    ₴
                                </span>
                            </div>
                        </div>
                        {isXl ? (
                            <div className='mt-3 space-y-3'>
                                {statusProducts.available.map((cart) => (
                                    <OrderItemMobile
                                        key={cart.id}
                                        cart={cart}
                                    />
                                ))}
                            </div>
                        ) : (
                            <CartTable
                                columns={columns}
                                data={statusProducts.available}
                            />
                        )}
                    </div>
                ) : null}
                {statusProducts.delivery?.length ? (
                    <div className='rounded-lg py-3.5 xl:border'>
                        <div className='flex items-center justify-between gap-x-4 xl:px-5'>
                            <div className='flex items-center gap-x-2'>
                                <DeliveryIcon className='size-6' />
                                <span className='text-sm'>В дорозі</span>
                            </div>

                            <div className='flex items-center gap-x-2'>
                                {totalDiscounts?.delivery > 0 ? (
                                    <span className='text-sm text-foreground/80 line-through'>
                                        {formatPrice(statusTotalPrices.delivery)} ₴
                                    </span>
                                ) : null}
                                <span>
                                    {formatPrice(
                                        statusTotalPrices.delivery -
                                            totalDiscounts.delivery
                                    )}{' '}
                                    ₴
                                </span>
                            </div>
                        </div>
                        {isXl ? (
                            <div className='mt-3 space-y-3'>
                                {statusProducts.delivery.map((cart) => (
                                    <OrderItemMobile
                                        key={cart.id}
                                        cart={cart}
                                    />
                                ))}
                            </div>
                        ) : (
                            <CartTable
                                columns={columns}
                                data={statusProducts.delivery}
                            />
                        )}
                    </div>
                ) : null}
            </div>
        </ScrollArea>
    )
}
