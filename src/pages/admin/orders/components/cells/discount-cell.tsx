import { useProductStatus } from '../../context/product-status'

import type { Stock } from '@/api/stock/stock.types'
import { DiscountLabel } from '@/components/product-card'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'

export const DiscountCell = ({ stocks }: { stocks: Stock[] }) => {
    const { productStatus } = useProductStatus()
    const { currentStockMaxDiscountPercentage } = useCatalogueOperations({
        stocks,
        initialCurrentStockId: productStatus
    })

    return currentStockMaxDiscountPercentage ? (
        <DiscountLabel discount={currentStockMaxDiscountPercentage} />
    ) : null
}
