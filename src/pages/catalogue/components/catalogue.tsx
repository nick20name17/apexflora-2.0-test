import { Loader2 } from 'lucide-react'
import { useQueryState } from 'nuqs'

import { OrderingFilter } from '../../../components/ordering-filter'
import { CartPopup } from '../popup/cart-popup.tsx'
import { FiltersPopup } from '../popup/filters-popup'

import { ActiveFilters } from './active-filters'
import { MobileFiltersSidebar } from './filters-sidebar'
import { PromoFilter } from './filters/promo-filters'
import { columns } from './product-table/columns'
import { ProductTable } from './product-table/table'
import { TablePagination } from './product-table/table-pagination'
import { ProductsList } from './products-list'
import type {
    MinMaxValues,
    ShopProductsResponse
} from '@/api/shop-products/shop-products.types'
import { SearchBar } from '@/components/search-bar'
import { StatusTabs } from '@/components/status-tabs'
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

interface CatalogueProps {
    shopProducts: ShopProductsResponse
    isLoading: boolean
    minMaxValues: MinMaxValues
    scrollPosition: number
}

export const Catalogue = ({
    shopProducts,
    isLoading,
    minMaxValues,
    scrollPosition
}: CatalogueProps) => {
    const [view] = useQueryState('view', {
        defaultValue: 'lines'
    })

    return (
        <section className='relative mb-4 mt-4 size-full rounded-xl border bg-background p-6 max-xl:px-4'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={routes.home}>Головна</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Каталог</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='mt-4 flex flex-col items-start gap-4 xl:flex-row xl:items-center xl:justify-between'>
                <div className='flex items-center justify-between gap-x-2 max-xl:w-full xl:justify-start'>
                    <div className='flex items-center gap-x-2'>
                        <h1 className='text-2xl xl:text-4xl'>Квіти</h1>
                        <div className='flex items-center gap-x-1 text-sm leading-none text-muted-foreground'>
                            {isLoading ? (
                                <Loader2 className='size-3 animate-spin' />
                            ) : (
                                shopProducts?.count
                            )}
                            <span>товари</span>
                        </div>
                    </div>
                    <PromoFilter
                        className='xl:hidden'
                        disabled={shopProducts?.min_max_values?.count_promotion === 0}
                    />
                </div>
                <div className='flex flex-col-reverse items-center justify-end gap-3 max-xl:w-full md:flex-row'>
                    <SearchBar className='h-12 w-full xl:w-96' />
                    <div className='flex items-center gap-3 max-xl:w-full'>
                        <MobileFiltersSidebar
                            className='flex flex-1 xl:hidden'
                            minMaxValues={shopProducts?.min_max_values!}
                        />
                        <OrderingFilter className='shrink-0 max-xl:flex-1' />
                    </div>
                    <ViewFilter className='hidden xl:block' />
                </div>
            </div>
            <ActiveFilters className='max-xl:hidden' />
            <div className='mt-4 flex items-center justify-between gap-x-4 border-b'>
                <StatusTabs className='flex-1 max-sm:w-full max-sm:px-0' />
                <PromoFilter
                    className='hidden xl:flex'
                    disabled={shopProducts?.min_max_values?.count_promotion === 0}
                />
            </div>

            {view === 'tiles' ? (
                <ProductsList
                    shopProducts={shopProducts}
                    isLoading={isLoading}
                />
            ) : (
                <ProductTable
                    isLoading={isLoading}
                    columns={columns}
                    data={shopProducts?.results || []}
                />
            )}
            <TablePagination
                className='pb-0'
                count={shopProducts?.count || 0}
                isLoading={isLoading}
            />
            <CartPopup />
            <FiltersPopup
                minMaxValues={minMaxValues}
                scrollPosition={scrollPosition}
            />
        </section>
    )
}
