import { useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { Catalogue } from './components/catalogue'
import { FiltersSidebar } from './components/filters-sidebar'
import { OrderSuccess } from './components/order-success'
import { useCatalogueOnboarding } from './hooks/use-onboarding'
import { useProductFilters } from './hooks/use-product-filters'
import { FirstDiscountPopup } from './popup/first-discount-popup'
import { getShopProducts } from '@/api/shop-products/shop-products'
import '@/assets/styles/driver-js.css'
import { MetaHead } from '@/components/meta-head'
import { ScrollArea } from '@/components/ui/scroll-area'

import 'driver.js/dist/driver.css'

export const CataloguePage = () => {
    const filters = useProductFilters()

    const [scrollPosition, setScrollPosition] = useState(0)

    const { data: shopProducts, isLoading } = useQuery({
        queryKey: ['shopProducts', filters],
        queryFn: () => getShopProducts(filters),
        staleTime: 300 * 1000,
        refetchInterval: 60 * 1000,
        keepPreviousData: true
    })

    const firstStockId = useMemo(() => {
        return shopProducts?.results[0]?.stocks?.find(
            (stock) => stock.status.id === +filters.statuses
        )?.id
    }, [shopProducts?.results, filters.statuses])

    useCatalogueOnboarding(firstStockId)

    const handleScroll = useCallback(
        (event: any) => {
            const target = event.target as HTMLDivElement

            if (scrollPosition >= 180) setScrollPosition(target.scrollTop)
        },
        [setScrollPosition]
    )

    return (
        <>
            <MetaHead title='Каталог' />
            <div className='flex h-[calc(100vh-70px)] items-start gap-x-4'>
                <FiltersSidebar
                    className='hidden xl:block'
                    minMaxValues={shopProducts?.min_max_values!}
                />
                <ScrollArea
                    id='catalogue'
                    onScrollCapture={handleScroll}
                    className='mr-4 h-full flex-1 max-xl:ml-4 max-lg:mx-0'
                >
                    <Catalogue
                        scrollPosition={scrollPosition}
                        shopProducts={shopProducts!}
                        isLoading={isLoading}
                        minMaxValues={shopProducts?.min_max_values!}
                    />
                </ScrollArea>
            </div>
            <OrderSuccess />
            <FirstDiscountPopup />
        </>
    )
}
