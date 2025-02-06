import { AdminProductPopup } from './admin-product-popup'
import type { ShopProductsResponse } from '@/api/shop-products/shop-products.types'
import { ProductCard } from '@/components/product-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { defaultLimit } from '@/constants/table'

interface ProductsListProps {
    shopProducts: ShopProductsResponse
    isLoading: boolean
}
export const AdminProductsList = ({ shopProducts, isLoading }: ProductsListProps) => {
    if (shopProducts?.count === 0) {
        return (
            <div className='my-10 pb-1 text-center text-lg text-muted'>
                Товарів не знайдено
            </div>
        )
    }

    return (
        <ScrollArea className='mt-3 pb-1'>
            {isLoading ? (
                <ProductListSkeleton />
            ) : (
                <div className='grid grid-cols-1 gap-2.5 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]'>
                    {shopProducts?.results?.map((shopProduct) => (
                        <AdminProductPopup shopProduct={shopProduct}>
                            <ProductCard
                                className='w-full'
                                key={shopProduct.id}
                                shopProduct={shopProduct}
                            />
                        </AdminProductPopup>
                    ))}
                </div>
            )}
        </ScrollArea>
    )
}

const ProductListSkeleton = () => {
    return (
        <div className='grid grid-cols-1 gap-2.5 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]'>
            {Array.from({ length: defaultLimit }).map((_, index) => (
                <Skeleton
                    key={index}
                    className='h-[270px] w-full flex-shrink-0 flex-grow-0 rounded-sm'
                />
            ))}
        </div>
    )
}
