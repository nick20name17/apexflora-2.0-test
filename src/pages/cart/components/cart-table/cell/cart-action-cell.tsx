import { Heart } from 'iconsax-react'
import { Trash } from 'lucide-react'

import type { Cart } from '@/api/carts/carts.types'
import { Button } from '@/components/ui/button'
import { useCartOperations } from '@/hooks/use-cart-operations'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'
import { cn } from '@/lib/utils'

interface CartActionsCellProps {
    cart: Cart
}

export const CartActionsCell = ({ cart }: CartActionsCellProps) => {
    const { removeFromCartMutation } = useCartOperations()

    const { handleAddToWishList } = useCatalogueOperations({
        // @ts-ignore
        initialCurrentStock: cart.stock_product,
        inWishList: cart.in_wish_list
    })

    return (
        <div className='flex items-center justify-end gap-x-2'>
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
                        cart.in_wish_list
                            ? 'fill-accent text-accent hover:text-primary'
                            : ''
                    )}
                />
            </Button>
            <Button
                onClick={() => removeFromCartMutation.mutate(cart.stock_product.id)}
                className='shrink-0 hover:bg-destructive hover:text-destructive-foreground'
                size='icon'
                variant='ghost'
            >
                <Trash />
            </Button>
        </div>
    )
}
