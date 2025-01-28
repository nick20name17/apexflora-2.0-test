import type { Stock } from '@/api/stock/stock.types'
import { DiscountLabel } from '@/components/product-card'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'

export const DiscountCell = ({ stocks }: { stocks: Stock[] }) => {
    const { currentStockMaxDiscountPercentage } = useCatalogueOperations({
        stocks
    })

    return currentStockMaxDiscountPercentage ? (
        <DiscountLabel discount={currentStockMaxDiscountPercentage} />
    ) : null
}
