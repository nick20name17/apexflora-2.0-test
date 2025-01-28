import { columns } from './columns'
import type { ShopProduct } from '@/api/shop-products/shop-products.types'
import { ProductTable } from '@/pages/catalogue/components/product-table/table'

interface AdminCatagloueProps {
    shopProducts: ShopProduct[]
    isLoading: boolean
}
export const AdminCatagloue = ({ shopProducts, isLoading }: AdminCatagloueProps) => {
    return (
        <ProductTable
            columns={columns}
            data={shopProducts}
            isLoading={isLoading}
        />
    )
}
