import type { Stock } from '@/api/shop-products/shop-products.types'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'

export const PriceCell = ({ stocks }: { stocks: Stock[] }) => {
    const { currentStockPrice, priceWithDiscount } = useCatalogueOperations({
        stocks
    })
    return priceWithDiscount > 0 ? (
        <div className='flex flex-col'>
            <span className='text-muted line-through'>{currentStockPrice} грн</span>
            <span className='text-primary'>{priceWithDiscount} грн</span>
        </div>
    ) : (
        <span className='text-primary'>{currentStockPrice} грн</span>
    )
}
