import type { Stock } from '@/api/shop-products/shop-products.types'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'

export const PriceCell = ({ stocks }: { stocks: Stock[] }) => {
    const { currentStockPrice, priceWithDiscount } = useCatalogueOperations({
        stocks
    })

    return priceWithDiscount > 0 ? (
        <div className='flex flex-col text-base'>
            <span className='text-sm text-muted line-through'>{currentStockPrice}₴</span>
            <span className='font-medium text-primary'>{priceWithDiscount}₴</span>
        </div>
    ) : (
        <span className='text-base font-medium text-primary'>{currentStockPrice}₴</span>
    )
}
