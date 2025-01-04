import type { Stock } from '@/api/shop-products/shop-products.types'
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
