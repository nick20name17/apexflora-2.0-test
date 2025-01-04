import type { Stock } from '@/api/shop-products/shop-products.types'
import { NumberStepper } from '@/components/ui/number-stepper'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'

export const QuantityCell = ({ stocks }: { stocks: Stock[] }) => {
    const { amount, currentStock, handleValueChange } = useCatalogueOperations({
        stocks
    })

    const isPreorder = currentStock?.status?.id === 3

    return (
        <div
            className='flex w-full items-center justify-between gap-x-1.5'
            id='quantity-cell'
        >
            <span className='text-xs text-[#14B758]'>
                {isPreorder ? (
                    <span className='text-base'>∞</span>
                ) : (
                    <span> {currentStock?.quantity || 0}шт.</span>
                )}
            </span>
            <NumberStepper
                onChange={handleValueChange}
                className='w-28 shrink-0'
                max={isPreorder ? 99_999 : currentStock?.quantity || 0}
                initialValue={amount}
                step={currentStock?.shop_product.packaging_of || 1}
            />
        </div>
    )
}
