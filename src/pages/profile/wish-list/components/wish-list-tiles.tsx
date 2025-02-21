import { WishListProductCardMobile } from './wish-list-card-mobile'
import type { ShopProductsResponse } from '@/api/shop-products/shop-products.types'
import { ProductCard } from '@/components/product-card'
import { ProductPopup } from '@/components/product-popup'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { defaultLimit } from '@/constants/table'
import { useMediaQuery } from '@/hooks/use-media-query'

interface WishListTilesProps {
    shopProducts: ShopProductsResponse | undefined
    isLoading: boolean
}
export const WishListTiles = ({ shopProducts, isLoading }: WishListTilesProps) => {
    if (shopProducts?.count === 0) {
        return (
            <div className='my-16 text-center text-lg text-muted'>
                Товарів не знайдено
            </div>
        )
    }

    const isSm = useMediaQuery('(max-width: 640px)')

    return (
        <ScrollArea className='mt-3 pb-1'>
            {isLoading ? (
                <ProductListSkeleton />
            ) : (
                <div className='grid grid-cols-1 gap-2.5 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]'>
                    {shopProducts?.results?.map((shopProduct) =>
                        isSm ? (
                            <ProductPopup
                                shopProduct={shopProduct}
                                key={shopProduct.id}
                            >
                                <WishListProductCardMobile shopProduct={shopProduct} />
                            </ProductPopup>
                        ) : (
                            <ProductPopup
                                shopProduct={shopProduct}
                                key={shopProduct.id}
                            >
                                <ProductCard shopProduct={shopProduct} />
                            </ProductPopup>
                        )
                    )}
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
