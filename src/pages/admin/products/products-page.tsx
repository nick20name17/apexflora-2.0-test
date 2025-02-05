import { useQueryState } from 'nuqs'
import { useQuery } from 'react-query'

import DataPageLayout from '../components/data-page-layout'
import { DataTable } from '../components/table'

import { getShopProducts } from '@/api/shop-products/shop-products'
import type { ShopProductsResponse } from '@/api/shop-products/shop-products.types'
import { Skeleton } from '@/components/ui/skeleton'
import { defaultLimit } from '@/constants/table'
import { useMediaQuery } from '@/hooks/use-media-query'
import { TablePagination } from '@/pages/catalogue/components/product-table/table-pagination'
import { FiltersBar } from './components/filters/filters-bar'
import { MobileProductCard } from './components/mobile-product-card'
import { AddFileModal } from './components/modals/add-file'
import { AddShopProductModal } from './components/modals/modals'
import { columns } from './components/table/columns'

const ProductsPage = () => {
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
        defaultValue: '2'
    })
    const [categories] = useQueryState('categories')
    const [promo] = useQueryState('promo', {
        defaultValue: 'all'
    })
    const [hasCode1c] = useQueryState('has-code-1c', {
        defaultValue: 'all'
    })
    const [hasImage] = useQueryState('has-image', {
        defaultValue: 'all'
    })
    const [isVisible] = useQueryState('is-visible', {
        defaultValue: 'all'
    })

    const queryParams = {
        offset,
        limit,
        search: search,
        statuses: status,
        categories: categories,
        promotion: promo === 'all' ? null : promo === 'promo',
        has_code_1c: hasCode1c === 'all' ? null : hasCode1c === 'code',
        has_image: hasImage === 'all' ? null : hasImage === 'has-image',
        is_visible: isVisible === 'all' ? null : isVisible === 'visible'
    }

    const { data, isLoading } = useQuery({
        queryKey: [
            'shop-products',
            queryParams.offset,
            queryParams.limit,
            queryParams.search,
            queryParams.statuses,
            queryParams.categories,
            queryParams.promotion,
            queryParams.has_code_1c,
            queryParams.has_image,
            queryParams.is_visible
        ],
        queryFn: async () => {
            const res = await getShopProducts(queryParams)
            return res
        }
    })

    const isTablet = useMediaQuery('(max-width: 768px)')
    return (
        <>
            <DataPageLayout
                title='Товари'
                count={data?.count}
                isLoading={isLoading}
                filterComponent={<FiltersBar />}
                actionComponent={
                    <div className='flex items-center gap-2 max-md:[&>*]:flex-1'>
                        <AddFileModal />
                        <AddShopProductModal />
                    </div>
                }
            >
                {isTablet ? (
                    <MobileProductsList shopProducts={data} isLoading={isLoading} />
                ) : (
                    <DataTable
                        dataCount={data?.count}
                        columns={columns}
                        data={data?.results || []}
                        isLoading={isLoading}
                    />
                )}
            </DataPageLayout>
        </>
    )
}

export default ProductsPage


const MobileProductsList = ({ shopProducts, isLoading }: { shopProducts: ShopProductsResponse | undefined, isLoading: boolean }) => {

    return <>
        {
            isLoading ? <MobileProductsListSkeleton /> : <div className='space-y-4'>
                {shopProducts?.results?.map((shopProduct) => (
                    <MobileProductCard shopProduct={shopProduct} />
                ))}
            </div>
        }
        <TablePagination
            className='border-none pt-0'
            count={shopProducts?.count || 0}
            isLoading={isLoading}
        />
    </>

}

const MobileProductsListSkeleton = () => {
    return <div className='space-y-4'>
        {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} className='h-40 w-full rounded-sm' />
        ))}
    </div>

}