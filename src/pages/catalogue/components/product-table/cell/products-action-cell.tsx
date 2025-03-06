import { Heart } from 'iconsax-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { ShopProduct } from '@/api/shop-products/shop-products.types'
import { ProductPopup } from '@/components/product-popup'
import { Button } from '@/components/ui/button'
import { routes } from '@/config/routes'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'
import { cn } from '@/lib/utils'
import { useAuth } from '@/providers/auth-provider'

interface ProductsActionsCellProps {
    shopProduct: ShopProduct
}

export const ProductsActionsCell = ({ shopProduct }: ProductsActionsCellProps) => {
    const { isAuth } = useAuth()
    const navigate = useNavigate()

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
                onClick={(e) => {
                    e.stopPropagation()
                    if (isAuth) {
                        handleAddToWishList()
                    } else {
                        navigate(routes.signIn)
                    }
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
