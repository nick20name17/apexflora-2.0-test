import { useProductStatus } from '../../context/product-status'

import type { Stock } from '@/api/stock/stock.types'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'

export const PriceCell = ({ stocks }: { stocks: Stock[] }) => {
    const { productStatus } = useProductStatus()
    const { currentStockPrice, priceWithDiscount } = useCatalogueOperations({
        stocks,
        initialCurrentStockId: productStatus
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
