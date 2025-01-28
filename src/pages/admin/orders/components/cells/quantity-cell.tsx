import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useProductStatus } from '../../context/product-status'

import type { OrderItem } from '@/api/order-items/order-items.types'
import type { Stock } from '@/api/stock/stock.types'
import { NumberStepper } from '@/components/ui/number-stepper'
import { routes } from '@/config/routes'
import { useAuth } from '@/hooks/use-auth'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'

export const QuantityCell = ({ stocks }: { stocks: Stock[] }) => {
    const navigate = useNavigate()
    const { isAuth } = useAuth()
    const form = useFormContext()

    const { productStatus } = useProductStatus()

    const { currentStock, priceWithDiscount } = useCatalogueOperations({
        stocks,
        initialCurrentStockId: productStatus
    })

    const isPreorder = currentStock?.status?.id === 3

    const redirectToLogin = () => {
        navigate(routes.signIn)
    }

    const handleValueChange = (value: number) => {
        if (!currentStock) return

        const currentOrderItems = (form.watch('order_items') as OrderItem[]) || []
        const existingItemIndex = currentOrderItems.findIndex(
            (item) => item?.id === currentStock?.id
        )

        if (value === 0) {
            const updatedOrderItems = currentOrderItems.filter(
                (item) => item?.id !== currentStock?.id
            )
            form.setValue('order_items', updatedOrderItems)
            return
        }

        if (existingItemIndex !== -1) {
            // Update existing item
            const updatedOrderItems = [...currentOrderItems]
            updatedOrderItems[existingItemIndex] = {
                ...updatedOrderItems[existingItemIndex],
                amount: value
            }
            form.setValue('order_items', updatedOrderItems)
        } else {
            form.setValue('order_items', [
                ...currentOrderItems,
                {
                    id: currentStock?.id,
                    amount: value,
                    price: currentStock?.retail_price,
                    discount: currentStock?.retail_price - priceWithDiscount
                }
            ])
        }
    }

    const value =
        (form.watch('order_items') as OrderItem[])?.find(
            (item) => item?.id === currentStock?.id
        )?.amount || 0

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
                onChange={isAuth ? handleValueChange : redirectToLogin}
                className='w-28 shrink-0'
                max={isPreorder ? 99_999 : currentStock?.quantity || 0}
                value={value}
                step={currentStock?.shop_product.packaging_of || 1}
            />
        </div>
    )
}
