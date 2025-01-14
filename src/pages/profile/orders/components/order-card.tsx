import { format } from 'date-fns'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { DownloadOrdersPdfBtn } from './download-orders-pdf-btn'
import type { Order, OrderItem, Statuses } from '@/api/orders/orders.types'
import { DiametrIcon, HeartIcon, HeightIcon, WeightIcon } from '@/components/icons'
import { DiscountLabel } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible'
import ImageWithSkeleton from '@/components/ui/image-with-skeleton'
import { formatPrice, useCatalogueOperations } from '@/hooks/use-catalogue-operations'
import { cn } from '@/lib/utils'

export const getStatusName = (statusName: Statuses) => {
    const statuses = {
        pending: {
            displayName: 'Очікує підтвердження',
            className: 'bg-highlight text-primary'
        },
        approval: {
            displayName: 'Підтверджено',
            className: 'bg-primary text-background'
        },
        shipped: {
            displayName: 'Відправлено',
            className: 'bg-[#56CCF2]'
        },
        delivered: {
            displayName: 'Виконано',
            className: 'bg-accent text-primary'
        },
        canceled: {
            displayName: 'Скасовано',
            className: 'bg-destructive text-background'
        }
    }

    return statuses[statusName]
}

interface OrderCardProps {
    order: Order
}

export const OrderCard = ({ order }: OrderCardProps) => {
    const [open, setOpen] = useState(false)

    const totalPrice = order.order_items.reduce((acc, item) => {
        return acc + item.amount * item.stock_product.retail_price
    }, 0)

    const totalPriceWithDiscount = totalPrice - +order.discount

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className='rounded-xs border-2 border-secondary p-3 transition-colors data-[state=open]:border-primary lg:p-4'
        >
            <CollapsibleTrigger className='flex w-full items-center justify-between gap-x-4 text-sm lg:gap-x-8'>
                <div className='grid flex-1 grid-cols-[0.5fr,repeat(3,1fr),1.2fr] items-center gap-x-4 text-left lg:grid-cols-[repeat(3,1fr),1.2fr,1fr] lg:gap-x-6'>
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'>
                            № <span className='max-lg:hidden'>Замовлення</span>
                        </span>
                        <span>{order.id}</span>
                    </div>
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'>Дата оформлення</span>
                        <span>{format(order.created_at, 'dd.MM.yyyy')}</span>
                    </div>
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'>Спосіб доставки</span>
                        <span>Самовивіз</span>
                    </div>
                    <OrderCardStatus statusName={order.status as Statuses} />
                    <div className='flex flex-col items-start gap-y-0.5'>
                        <span className='text-xs'>Сума</span>
                        <span
                            className={cn(
                                +order.discount > 0 ? 'flex items-center gap-x-1' : ''
                            )}
                        >
                            {+order.discount > 0 ? (
                                <span className='whitespace-nowrap text-foreground/80 line-through'>
                                    {formatPrice(totalPrice)}₴
                                </span>
                            ) : null}
                            <span className='whitespace-nowrap text-primary'>
                                {formatPrice(totalPriceWithDiscount)}₴
                            </span>
                        </span>
                    </div>
                </div>
                <div className='flex items-center gap-x-2'>
                    <DownloadOrdersPdfBtn order={order} />
                    <Button
                        className='text-muted-foreground'
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
                    {order.order_items.map((orderItem) => (
                        <OrderItemCard
                            key={orderItem.id}
                            orderItem={orderItem}
                        />
                    ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}

interface OrderItemCardProps {
    orderItem: OrderItem
}

const OrderItemCard = ({ orderItem }: OrderItemCardProps) => {
    const totalPrice = orderItem.amount * orderItem.price
    const totalPriceWithDiscount = totalPrice - orderItem.discount

    const { handleAddToWishList } = useCatalogueOperations({
        initialCurrentStock: orderItem.stock_product,
        inWishList: orderItem.in_wish_list
    })

    return (
        <div className='grid grid-cols-[1.5fr,1fr,0.7fr,1.3fr,0.4fr,0.2fr,1fr,0.15fr] items-center gap-x-2 rounded-xs border-2 border-secondary p-1 text-sm lg:grid-cols-[2fr,1fr,0.7fr,1.3fr,0.4fr,0.5fr,0.8fr,0.15fr] lg:gap-x-4'>
            <div className='flex items-center gap-x-2'>
                <div className='h-16 w-16 lg:w-24'>
                    <ImageWithSkeleton
                        className='h-full w-full rounded-sm object-cover'
                        src={orderItem.stock_product.shop_product.image}
                        alt={orderItem.stock_product.shop_product.product.name}
                    />
                </div>
                <div className='flex w-36 flex-col lg:w-44'>
                    <span className='truncate text-foreground'>
                        {orderItem.stock_product.shop_product.product?.ukr_name}
                    </span>
                    <div className='flex items-center gap-x-1'>
                        <img
                            src={
                                orderItem.stock_product.shop_product.producer?.country
                                    ?.flag
                            }
                            alt={orderItem.stock_product.shop_product.producer?.name}
                            className='size-4'
                        />
                        <span className='truncate text-xs'>
                            {orderItem.stock_product.shop_product.producer?.name}
                        </span>
                    </div>
                </div>
            </div>
            <div>{orderItem.stock_product.shop_product?.origin_id}</div>

            <div className='flex items-center gap-x-0.5'>
                <HeightIcon className='size-5' />
                {orderItem.stock_product.shop_product?.height ??
                    '-'} см.
            </div>

            <div className='flex items-center gap-x-1'>
                <div className='flex items-center gap-x-0.5'>
                    <WeightIcon className='size-5' />
                    {orderItem?.stock_product.shop_product.weight_size ?? '-'}
                </div>
                <div className='flex items-center gap-x-0.5'>
                    <DiametrIcon className='size-5' />
                    {orderItem?.stock_product.shop_product.diameter ?? '-'}
                </div>
            </div>

            <div className='flex items-center gap-x-1'>
                {orderItem?.stock_product?.promotion ? (
                    <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M10.9648 4.00336C11.1203 3.98718 11.1925 4.02957 11.3171 4.12825C11.3416 4.14746 11.3416 4.14746 11.3665 4.16706C11.4152 4.20562 11.4633 4.24485 11.5113 4.28438C11.5364 4.3049 11.5615 4.32543 11.5874 4.34658C11.7827 4.51174 11.9641 4.69338 12.1441 4.87764C12.1779 4.91181 12.1779 4.91181 12.2124 4.94668C12.5168 5.26418 12.7633 5.64 12.9782 6.03295C12.9882 6.05116 12.9981 6.06938 13.0084 6.08814C13.6534 7.28668 13.6705 8.59868 13.4282 9.92217C13.3574 10.3327 13.3329 10.7425 13.536 11.1123C13.7279 11.4144 13.9694 11.6692 14.3033 11.7635C14.692 11.8316 15.0376 11.7725 15.3618 11.5207C15.5985 11.3094 15.7611 11.0446 15.8257 10.7166C15.8295 10.6652 15.8321 10.6137 15.8338 10.5621C15.8348 10.533 15.8359 10.504 15.837 10.4741C15.8391 10.4129 15.8411 10.3518 15.8431 10.2906C15.8442 10.2617 15.8452 10.2328 15.8464 10.203C15.8472 10.1765 15.8481 10.15 15.849 10.1227C15.8544 10.0609 15.8544 10.0609 15.8832 10.0297C15.9619 10.0153 15.9619 10.0153 16.0558 10.0297C16.1165 10.0958 16.1594 10.1524 16.2068 10.2287C16.2203 10.2498 16.2339 10.2709 16.2478 10.2926C17.1231 11.6826 17.5192 13.5041 17.2507 15.1695C17.0692 16.2134 16.6467 17.1934 15.9983 17.9919C15.9738 18.0223 15.9493 18.0526 15.9241 18.0839C15.0513 19.1505 13.8304 19.8486 12.518 19.9903C12.4385 19.9952 12.3592 19.9968 12.2797 19.9977C12.2575 19.9981 12.2354 19.9984 12.2126 19.9987C11.7195 20.0041 11.2443 19.9989 10.7635 19.8654C10.7267 19.8554 10.7267 19.8554 10.6893 19.8451C9.34549 19.4665 8.15998 18.5447 7.44464 17.245C7.37827 17.121 7.31549 16.9951 7.25443 16.8679C7.24535 16.849 7.23627 16.8301 7.22691 16.8107C6.55781 15.3975 6.51776 13.6752 6.9508 12.1745C7.27775 11.1008 7.84919 10.1763 8.54998 9.34702C8.60038 9.28728 8.64933 9.22659 8.69795 9.16516C8.81358 9.021 8.93443 8.88217 9.05477 8.74267C9.21335 8.55883 9.37033 8.37352 9.52667 8.18744C9.54844 8.16196 9.5702 8.13648 9.59262 8.11023C10.3666 7.19564 11.0054 6.11124 10.9985 4.82922C10.9902 4.6479 10.9723 4.46744 10.954 4.28701C10.9513 4.25938 10.9486 4.23174 10.9458 4.20327C10.9433 4.17831 10.9407 4.15335 10.9381 4.12764C10.936 4.0658 10.936 4.0658 10.9648 4.00336ZM11.1891 11.9501C11.1578 11.9853 11.1578 11.9853 11.1259 12.0211C11.1026 12.0468 11.0793 12.0726 11.0554 12.0991C11.0194 12.1403 11.0194 12.1403 10.9828 12.1822C10.959 12.2086 10.9353 12.2349 10.9109 12.2621C9.99616 13.2842 9.33302 14.4486 9.34393 15.9126C9.36055 16.601 9.58943 17.2591 10.0156 17.7734C10.0341 17.7958 10.0341 17.7958 10.053 17.8186C10.5116 18.3654 11.1366 18.7147 11.8225 18.7533C12.5785 18.7773 13.2399 18.5448 13.7998 17.9729C13.8229 17.9483 13.846 17.9236 13.8698 17.8983C13.8938 17.873 13.9178 17.8477 13.9425 17.8217C14.4249 17.2826 14.6625 16.5426 14.6566 15.7978C14.6478 15.4704 14.6166 15.0523 14.4451 14.7758C14.395 14.7383 14.395 14.7383 14.33 14.7446C14.2681 14.7851 14.2143 14.8257 14.1575 14.8734C13.7364 15.2062 13.2876 15.2881 12.7768 15.213C12.3315 15.1132 11.9741 14.8652 11.7216 14.4558C11.3989 13.8732 11.3833 13.28 11.3908 12.6194C11.3913 12.5526 11.3917 12.4858 11.392 12.419C11.393 12.2575 11.3944 12.0959 11.3962 11.9344C11.3053 11.9017 11.2703 11.8899 11.1891 11.9501Z'
                            fill='#FD7301'
                        />
                    </svg>
                ) : null}
                {orderItem?.percentage > 0 ? (
                    <DiscountLabel discount={orderItem?.percentage} />
                ) : null}
            </div>

            <div>{orderItem.amount}шт.</div>

            <div
                className={cn(
                    'flex w-full gap-1 leading-none',
                    +orderItem.discount && 'flex-col items-start'
                )}
            >
                {orderItem.discount ? (
                    <span className='whitespace-nowrap text-foreground/80 line-through'>
                        {formatPrice(totalPrice)} ₴
                    </span>
                ) : null}
                <span className='whitespace-nowrap text-primary'>
                    {formatPrice(totalPriceWithDiscount)} ₴
                </span>
            </div>

            <Button
                onClick={handleAddToWishList}
                className='shrink-0 hover:bg-accent'
                size='icon'
                variant={orderItem.in_wish_list ? 'accent' : 'ghost'}
            >
                <HeartIcon />
            </Button>
        </div>
    )
}

export const OrderCardStatus = ({ statusName }: { statusName: Statuses }) => {
    const status = getStatusName(statusName)

    return (
        <div
            className={cn(
                'inline-flex h-7 min-w-20 max-w-fit items-center justify-center truncate whitespace-nowrap rounded-xs px-2 text-xs',
                status.className
            )}
        >
            <span className='truncate'>{status.displayName}</span>
        </div>
    )
}
