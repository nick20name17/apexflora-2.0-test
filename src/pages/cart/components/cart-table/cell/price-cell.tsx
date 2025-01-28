import type { Stock } from '@/api/stock/stock.types'
import { formatPrice } from '@/hooks/use-catalogue-operations'

export const PriceCell = ({ stock }: { stock: Stock }) => {
    const currentStockMaxDiscountPercentage = stock?.discounts.reduce(
        (innerAcc, discount) => {
            const discountValue = parseFloat(discount.percentage) || 0
            return Math.max(innerAcc, discountValue)
        },
        0
    )

    const priceWithDiscount = currentStockMaxDiscountPercentage
        ? +formatPrice(
              stock?.retail_price! * (1 - currentStockMaxDiscountPercentage / 100)
          )
        : 0

    return priceWithDiscount > 0 ? (
        <div className='flex flex-col'>
            <span className='text-muted line-through'>
                {formatPrice(stock.retail_price)}₴
            </span>
            <span className='font-medium text-primary'>{priceWithDiscount}₴</span>
        </div>
    ) : (
        <span className='font-medium text-primary'>
            {formatPrice(stock.retail_price)}₴
        </span>
    )
}
