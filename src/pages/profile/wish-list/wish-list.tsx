import { Loader2 } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { OrderingFilter } from '../../../components/ordering-filter'
import { OrdersPagination } from '../orders/components/orders-pagination'

import { wishListColumns } from './components/wish-list-columns'
import { WishListTiles } from './components/wish-list-tiles'
import { getShopProducts } from '@/api/shop-products/shop-products'
import { SearchBar } from '@/components/search-bar'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { ViewFilter } from '@/components/view-filter'
import { routes } from '@/config/routes'
import { defaultLimit } from '@/constants/table'
import { ProductTable } from '@/pages/catalogue/components/product-table/table'
import { useFilters } from '@/pages/catalogue/store/filters'

const WishListPage = () => {
    const [search] = useQueryState('search', {
        defaultValue: ''
    })

    const [limit, setLimit] = useState(defaultLimit)

    const [offset, setOffset] = useState(0)

    const [ordering] = useQueryState('ordering', {
        defaultValue: 'name'
    })

    const { setFilters } = useFilters()

    const queryParams = useMemo(() => {
        return {
            in_wish_list: true,
            limit,
            search,
            offset,
            ordering
        }
    }, [limit, search, offset, ordering])

    const { data: shopProducts, isLoading } = useQuery({
        queryKey: [
            'shopProducts',
            queryParams.limit,
            queryParams.offset,
            queryParams.ordering,
            queryParams.search,
            queryParams.in_wish_list
        ],
        queryFn: () => getShopProducts(queryParams),
        refetchOnWindowFocus: true
    })

    useEffect(() => {
        setFilters(queryParams)
    }, [queryParams])

    const [view] = useQueryState('view', {
        defaultValue: 'lines'
    })

    return (
        <section className='relative size-full overflow-hidden rounded-xl border bg-background p-3 xl:p-6'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={routes.home}>Головна</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Збережені</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='mt-4 flex flex-col items-start gap-4 xl:flex-row xl:items-center xl:justify-between'>
                <div className='flex items-center justify-between gap-x-2 max-xl:w-full xl:justify-start'>
                    <div className='flex h-full items-center gap-x-2'>
                        <h1 className='text-2xl'>Збережені</h1>
                        <div className='flex items-center gap-x-1 text-sm leading-none text-muted-foreground'>
                            {isLoading ? (
                                <Loader2 className='size-3 animate-spin' />
                            ) : (
                                shopProducts?.count
                            )}
                            <span>товари</span>
                        </div>
                    </div>
                </div>
                <div className='flex w-full items-center justify-end gap-3'>
                    <SearchBar className='h-12 flex-1 shrink-0' />
                    <OrderingFilter className='shrink-0 max-xl:flex-1' />
                    <ViewFilter className='hidden xl:block' />
                </div>
            </div>
            {/* <StatusTabs className='mt-4 flex-1 max-sm:w-full max-sm:px-0' /> */}

            {view === 'tiles' ? (
                <WishListTiles
                    shopProducts={shopProducts}
                    isLoading={isLoading}
                />
            ) : (
                <ProductTable
                    columns={wishListColumns}
                    data={shopProducts?.results || []}
                    isLoading={isLoading}
                />
            )}
            <OrdersPagination
                offset={offset}
                limit={limit}
                setLimit={setLimit}
                setOffset={setOffset}
                count={shopProducts?.count || 0}
                isLoading={isLoading}
            />
        </section>
    )
}

export default WishListPage
