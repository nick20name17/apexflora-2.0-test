import { useEffect, useState } from 'react'

import type { ShopProduct } from '@/api/shop-products/shop-products.types'
import { HeartIcon } from '@/components/icons'
import { ProductPopup } from '@/components/product-popup'
import { Button } from '@/components/ui/button'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'

interface ProductsActionsCellProps {
    shopProduct: ShopProduct
}

export const ProductsActionsCell = ({ shopProduct }: ProductsActionsCellProps) => {
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
            <Button
                id='wish-list-button'
                onClick={handleAddToWishList}
                className='shrink-0 hover:bg-accent'
                size='icon'
                variant={inWishList ? 'accent' : 'ghost'}
            >
                <HeartIcon />
            </Button>
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
