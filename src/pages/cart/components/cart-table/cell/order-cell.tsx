import type { Cart } from '@/api/carts/carts.types'
import { useCartOperations } from '@/hooks/use-cart-operations'

export const OrderCell = ({ cart }: { cart: Cart }) => {
    const { calculateItemPrices } = useCartOperations()

    const {
        stockMaxDiscountPercentage,
        totalPrice: currentStockTotalPrice,
        totalPriceWithDiscount: currentStockTotalPriceWithDiscount
    } = calculateItemPrices(cart)

    if (!currentStockTotalPrice) return null

    return stockMaxDiscountPercentage && +currentStockTotalPriceWithDiscount! > 0 ? (
        <div className='flex flex-col'>
            {/* <span className='text-muted line-through'>{currentStockTotalPrice}₴</span> */}
            <span className='text-primary'>{currentStockTotalPriceWithDiscount}₴</span>
        </div>
    ) : (
        <span className='text-primary'>{currentStockTotalPrice}₴</span>
    )
}
