import type { Cart } from '@/api/carts/carts.types'
import { DiscountLabel } from '@/components/product-card'
import { useCartOperations } from '@/hooks/use-cart-operations'

export const DiscountCell = ({ cart }: { cart: Cart }) => {
    const { calculateItemPrices } = useCartOperations()

    const { stockMaxDiscountPercentage } = calculateItemPrices(cart)

    return stockMaxDiscountPercentage > 0 ? (
        <DiscountLabel discount={stockMaxDiscountPercentage} />
    ) : null
}
