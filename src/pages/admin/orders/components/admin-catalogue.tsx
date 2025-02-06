import { columns } from './columns'
import type { ShopProductsResponse } from '@/api/shop-products/shop-products.types'
import { useMediaQuery } from '@/hooks/use-media-query'
import { ProductTable } from '@/pages/catalogue/components/product-table/table'
import { ProductsList } from '@/pages/catalogue/components/products-list'

interface AdminCatagloueProps {
    shopProducts: ShopProductsResponse | undefined
    isLoading: boolean
}
export const AdminCatagloue = ({ shopProducts, isLoading }: AdminCatagloueProps) => {
    const isLg = useMediaQuery('(max-width: 1024px)')

    if (isLg) {
        return (
            <ProductsList
                shopProducts={shopProducts}
                isLoading={isLoading}
            />
        )
    }
    return (
        <ProductTable
            columns={columns}
            data={shopProducts?.results || []}
            isLoading={isLoading}
        />
    )
}
