import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useQuery } from 'react-query'

import { MobileOrderCard } from './components/mobile-order-card'
import { OrderCard } from './components/order-card'
import { OrdersPagination } from './components/orders-pagination'
import { OrdersStatus } from './components/orders-status'
import { getOrders } from '@/api/orders/orders'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import { routes } from '@/config/routes'
import { defaultLimit } from '@/constants/table'
import { useMediaQuery } from '@/hooks/use-media-query'

const OrdersPage = () => {
    const [status, setStatus] = useState<'orders' | 'pre-orders'>('orders')

    const [limit, setLimit] = useState(defaultLimit)
    const [offset, setOffset] = useState(0)

    const { data: orders, isLoading } = useQuery({
        queryKey: ['orders', status, limit, offset],
        queryFn: async () => {
            const res = await getOrders({
                limit,
                offset,
                is_preorder: status === 'pre-orders'
            })
            return res
        }
    })

    const isTablet = useMediaQuery('(max-width: 768px)')

    return (
        <section className='relative size-full overflow-hidden rounded-xl border bg-background p-3 xl:p-6'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={routes.home}>Головна</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Мої замовлення</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='mt-4 flex h-full items-center gap-x-2'>
                <h1 className='text-2xl'>Мої замовлення</h1>
                <div className='flex items-center gap-x-1 text-sm leading-none text-muted-foreground'>
                    {isLoading ? (
                        <Loader2 className='size-3 animate-spin' />
                    ) : (
                        orders?.count
                    )}
                </div>
            </div>

            <OrdersStatus
                onStatusChange={setStatus}
                status={status}
                setOffset={setOffset}
            />

            <div className='mt-5 space-y-2.5 pb-2.5'>
                {isLoading ? (
                    <OrdersSkeleton />
                ) : (
                    orders?.results.map((order) =>
                        isTablet ? (
                            <MobileOrderCard
                                key={order.id}
                                order={order}
                            />
                        ) : (
                            <OrderCard
                                key={order.id}
                                order={order}
                            />
                        )
                    )
                )}
            </div>

            <OrdersPagination
                limit={limit}
                setLimit={setLimit}
                offset={offset}
                setOffset={setOffset}
                count={orders?.count || 0}
                isLoading={isLoading}
            />

            {/* <TablePagination
                count={shopProducts?.count || 0}
                isLoading={isLoading}
            /> */}
        </section>
    )
}

const OrdersSkeleton = () => {
    return Array.from({ length: defaultLimit }).map((_, index) => {
        return (
            <Skeleton
                key={index}
                className='h-[145px] w-full md:h-20'
            />
        )
    })
}

export default OrdersPage
