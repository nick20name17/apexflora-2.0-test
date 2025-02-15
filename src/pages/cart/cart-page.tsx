import { Link } from 'react-router-dom'

import { BonusProgramInfo } from './components/bonus-program-info'
import { CartForm } from './components/cart-form'
import { OrderItems } from './components/order-items'
import { MetaHead } from '@/components/meta-head'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { routes } from '@/config/routes'
import { useCartOperations } from '@/hooks/use-cart-operations'
import { formatPrice } from '@/hooks/use-catalogue-operations'
import { cn } from '@/lib/utils'

const CartPage = () => {
    const { isCartEmpty, totalPrice, totalDiscount, isLoading } = useCartOperations()

    return (
        <>
            <MetaHead title='Кошик' />
            <section
                className={cn(
                    'mt-5 overflow-hidden rounded-xl border bg-background px-3 py-6 lg:mx-4 lg:px-5',
                    isCartEmpty ? '' : 'lg:h-full lg:max-h-[calc(100vh-100px)]'
                )}
            >
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={routes.home}>Головна</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Кошик</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                {isCartEmpty ? (
                    <div className='flex flex-col items-start gap-4'>
                        <h1 className='mt-3 text-2xl'>Кошик пустий</h1>

                        <Link to={routes.catalogue}>
                            <Button size='sm'>Продовжити покупки</Button>
                        </Link>
                    </div>
                ) : (
                    <div className='flex justify-between gap-4 max-lg:flex-col lg:items-end'>
                        <h1 className='mt-3 text-2xl'>Оформлення замовлення</h1>
                        <BonusProgramInfo totalPrice={totalPrice} />
                    </div>
                )}

                {isLoading ? (
                    <CartSkeleton />
                ) : isCartEmpty ? null : (
                    <div className='mt-4 flex h-full items-start justify-between gap-5 max-lg:flex-col'>
                        <CartForm />
                        <div className='h-full w-full'>
                            <OrderItems />
                            <div className='ml-auto mt-5 flex w-max items-center gap-1 leading-none'>
                                <span> Всього: </span>
                                {totalDiscount === 0 ? (
                                    <span className='text-primary'>
                                        <span className='text-2xl'>
                                            {' '}
                                            {formatPrice(totalPrice)}
                                        </span>{' '}
                                        ₴
                                    </span>
                                ) : (
                                    <span className='flex items-center gap-x-2'>
                                        <span className='text-lg text-muted line-through'>
                                            {formatPrice(totalPrice)}₴
                                        </span>
                                        <span className='text-primary'>
                                            <span className='text-2xl'>
                                                {formatPrice(totalPrice - totalDiscount)}
                                            </span>{' '}
                                            ₴
                                        </span>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}

const CartSkeleton = () => {
    return (
        <div className='mt-6 flex h-full items-start justify-between gap-5 max-lg:flex-col'>
            <Skeleton className='h-80 max-h-[calc(100%-90px)] w-full min-w-[280px] max-w-96 rounded-lg max-lg:max-w-full lg:h-full' />
            <div className='h-full max-h-[calc(100%-145px)] flex-1 max-lg:w-full'>
                <div className='size-full space-y-5'>
                    <Skeleton className='h-56 w-full rounded-lg' />
                    <Skeleton className='h-56 w-full rounded-lg' />
                </div>
                <Skeleton className='ml-auto mt-5 h-10 w-60 rounded-sm' />
            </div>
        </div>
    )
}

export default CartPage
