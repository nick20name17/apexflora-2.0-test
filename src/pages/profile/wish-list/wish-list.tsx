import { Loader2 } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useQuery } from 'react-query'

import { OrderingFilter } from '../../../components/ordering-filter'

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
import { defaultComboboxLimit } from '@/constants/table'
import { ProductTable } from '@/pages/catalogue/components/product-table/table'
import { TablePagination } from '@/pages/catalogue/components/product-table/table-pagination'

const inWishList = true

const WishListPage = () => {
    const { data: shopProducts, isLoading } = useQuery({
        queryKey: ['shopProducts'],
        queryFn: () =>
            getShopProducts({
                in_wish_list: inWishList,
                limit: defaultComboboxLimit
            })
    })

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
            <TablePagination
                count={shopProducts?.count || 0}
                isLoading={isLoading}
            />
        </section>
    )
}

export default WishListPage
