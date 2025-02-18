import type { Stock } from '@/api/stock/stock.types'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'

export const OrderCell = ({ stocks }: { stocks: Stock[] }) => {
    const { totalPrice, totalPriceWithDiscount, currentStockMaxDiscountPercentage } =
        useCatalogueOperations({
            stocks
        })

    if (!totalPrice) return null

    return currentStockMaxDiscountPercentage && +totalPriceWithDiscount > 0 ? (
        <div className='flex flex-col'>
            {/* <span className='text-muted line-through'>{totalPrice}₴</span> */}
            <span className='text-primary'>{totalPriceWithDiscount}₴</span>
        </div>
    ) : (
        <span className='text-primary'>{totalPrice}₴</span>
    )
}
