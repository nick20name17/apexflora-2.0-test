import type { ShopProductsResponse } from '@/api/shop-products/shop-products.types'
import { ProductCard } from '@/components/product-card'
import { ProductPopup } from '@/components/product-popup'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { defaultLimit } from '@/constants/table'

interface ProductsListProps {
    shopProducts: ShopProductsResponse | undefined
    isLoading: boolean
}
export const ProductsList = ({ shopProducts, isLoading }: ProductsListProps) => {
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
                        <ProductPopup shopProduct={shopProduct}
                            key={shopProduct.id}
                        >
                            <ProductCard
                                className='w-full'
                                shopProduct={shopProduct}
                            />
                        </ProductPopup>
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
