import { EditQuantity } from '../modals/edit-quantity'

import type { Stock } from '@/api/stock/stock.types'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'

interface QuantityCellProps {
    stocks: Stock[]
}
export const QuantityCell = ({ stocks }: QuantityCellProps) => {
    const { currentStock } = useCatalogueOperations({
        stocks
    })

    const isPreorder = currentStock?.status?.id === 3

    return (
        <div className='flex items-center gap-x-1'>
            {isPreorder ? null : <EditQuantity stock={currentStock!} />}
            <span className='text-xs text-[#14B758]'>
                {isPreorder ? (
                    <span className='text-base'>∞</span>
                ) : (
                    <span> {currentStock?.quantity || 0}шт.</span>
                )}
            </span>
        </div>
    )
}
