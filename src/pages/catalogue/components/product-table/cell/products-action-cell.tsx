import { Heart } from 'iconsax-react'
import { useEffect, useState } from 'react'

import type { ShopProduct } from '@/api/shop-products/shop-products.types'
import { ProductPopup } from '@/components/product-popup'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'
import { cn } from '@/lib/utils'

interface ProductsActionsCellProps {
    shopProduct: ShopProduct
}

export const ProductsActionsCell = ({ shopProduct }: ProductsActionsCellProps) => {
    const { isAuth } = useAuth()

    const [inWishList, setInWishList] = useState(shopProduct.in_wish_list)

    const { handleAddToWishList } = useCatalogueOperations({
        stocks: shopProduct.stocks,
        inWishList: shopProduct.in_wish_list
    })

    useEffect(() => {
        setInWishList(shopProduct.in_wish_list)
    }, [shopProduct.in_wish_list])

    return (
        <div className='flex items-center justify-end gap-x-2'>
            {isAuth ? (
                <Button
                    onClick={(e) => {
                        e.stopPropagation()
                        handleAddToWishList()
                    }}
                    className='group size-fit rounded-full bg-transparent p-1 hover:bg-transparent'
                    size='icon'
                >
                    <Heart
                        className={cn(
                            '!size-5 text-muted-foreground group-hover:fill-accent group-hover:text-accent',
                            inWishList ? 'fill-accent text-accent hover:text-primary' : ''
                        )}
                    />
                </Button>
            ) : null}
            <ProductPopup shopProduct={shopProduct}>
                <Button
                    className='h-10 w-24 shrink-0 text-xs'
                    size='sm'
                    variant='outline'
                    id='details-button'
                >
                    Детальніше
                </Button>
            </ProductPopup>
        </div>
    )
}
