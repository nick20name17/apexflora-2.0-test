import { useQueryState } from 'nuqs'
import { useQuery } from 'react-query'

import DataPageLayout from '../components/data-page-layout'
import { DataTable } from '../components/table'

import { FiltersBar } from './components/filters/filters-bar'
import { AddFileModal } from './components/modals/add-file'
import { AddShopProductModal } from './components/modals/modals'
import { columns } from './components/table/columns'
import { getShopProducts } from '@/api/shop-products/shop-products'
import { defaultLimit } from '@/constants/table'

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
    return (
        <>
            <DataPageLayout
                title='Товари'
                count={data?.count}
                isLoading={isLoading}
                filterComponent={<FiltersBar />}
                actionComponent={
                    <div className='flex items-center gap-x-2'>
                        <AddFileModal />
                        <AddShopProductModal />
                    </div>
                }
            >
                <DataTable
                    columns={columns}
                    data={data?.results || []}
                    isLoading={isLoading}
                />
            </DataPageLayout>
        </>
    )
}

export default ProductsPage
