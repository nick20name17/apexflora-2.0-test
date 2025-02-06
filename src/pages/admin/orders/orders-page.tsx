import { useQueryState } from 'nuqs'
import { useQuery } from 'react-query'

import DataPageLayout from '../components/data-page-layout'

import { getOrders } from '@/api/orders/orders'
import { getPreorderStocks } from '@/api/stock/stock'
import { ScrollArea } from '@/components/ui/scroll-area'
import { defaultLimit } from '@/constants/table'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'
import { TablePagination } from '@/pages/catalogue/components/product-table/table-pagination'
import { AllPreordersCard } from './components/all-preoder-card'
import { FiltersBar } from './components/controls/filters-bar'
import { DownloadCSVBtn } from './components/dowload-csv-btn'
import { MobileAdminOrderCard } from './components/mobile-order-card'
import { AddOrderModal } from './components/modals/modals'
import { AdminOrderCard } from './components/order-card'
import { OrderCardSkeleton } from './components/order-skeleton'

const AdminOrdersContent = () => {
    const [limit] = useQueryState('limit', {
        parse: Number,
        defaultValue: defaultLimit
    })

    const [offset] = useQueryState('offset', {
        parse: Number,
        defaultValue: 0
    })

    const [search] = useQueryState('search', {
        defaultValue: ''
    })

    const [status] = useQueryState('status', {
        defaultValue: 'orders'
    })

    const [allPreorders] = useQueryState('all-preorders', {
        parse: Boolean,
        defaultValue: false
    })

    const queryParams = {
        offset,
        limit,
        search: search
    }

    const ordersQuery = useQuery({
        queryKey: [
            'orders',
            queryParams.offset,
            queryParams.limit,
            queryParams.search,
            status
        ],
        queryFn: async () => {
            const res = await getOrders({
                ...queryParams,
                is_preorder: status === 'pre-orders',
                is_supplier: status === 'supplier'
            })
            return res
        }
    })

    const preOrdersQuery = useQuery({
        queryKey: [
            'pre-orders',
            queryParams.offset,
            queryParams.limit,
            queryParams.search,
            status
        ],
        queryFn: async () => {
            const res = await getPreorderStocks(queryParams)
            return res
        },
        enabled: allPreorders
    })

    const itemsCount = allPreorders
        ? preOrdersQuery?.data?.count || 0
        : ordersQuery?.data?.count || 0

    const isPaginationLoading = ordersQuery?.isLoading || preOrdersQuery?.isLoading

    const isLg = useMediaQuery('(max-width: 1024px)')

    return (
        <>
            <DataPageLayout
                title='Замовлення'
                count={ordersQuery.data?.count}
                isLoading={ordersQuery.isLoading}
                filterComponent={<FiltersBar />}
                actionComponent={
                    <div className='flex md:items-center gap-2 max-md:[&>*]:w-full max-md:flex-col'>
                        <DownloadCSVBtn />
                        <AddOrderModal />
                    </div>
                }
            >
                <ScrollArea
                    className={cn(
                        '[&>*>div]:space-y-4',
                        status === 'pre-orders'
                            ? 'h-[calc(100vh-280px)]'
                            : 'h-[calc(100vh-260px)]'
                    )}
                    id='scroll-area'
                >
                    {ordersQuery?.isLoading ? (
                        <OrderCardSkeleton />
                    ) : allPreorders && preOrdersQuery.data?.count ? (
                        preOrdersQuery.data?.results?.map((preorderStock) => (
                            <AllPreordersCard
                                preorderStock={preorderStock}
                                key={preorderStock.id}
                            />
                        ))
                    ) : ordersQuery?.data?.count ? (
                        ordersQuery?.data?.results?.map((order) => (
                            isLg ? <MobileAdminOrderCard order={order} key={order.id} /> : <AdminOrderCard
                                order={order}
                                key={order.id}
                            />
                        ))
                    ) : (
                        !ordersQuery?.isFetching &&
                        !preOrdersQuery?.isLoading && (
                            <div className='flex h-20 items-center justify-center rounded-md border-2 border-secondary p-2 text-center text-2xl text-primary'>
                                Нічого не знайдено
                            </div>
                        )
                    )}
                </ScrollArea>
            </DataPageLayout>
            <TablePagination
                count={itemsCount}
                isLoading={isPaginationLoading}
                className='border-none pb-0'
            />
        </>
    )
}

const AdminOrdersPage = () => {
    return (
        <AdminOrdersContent />
    )
}

export default AdminOrdersPage
