import { useFormContext } from 'react-hook-form'

import { useProductStatus } from '../../context/product-status'

import type { OrderItemsPayload } from '@/api/order-items/order-items.types'
import type { Stock } from '@/api/stock/stock.types'
import { formatPrice, useCatalogueOperations } from '@/hooks/use-catalogue-operations'

export const OrderCell = ({ stocks }: { stocks: Stock[] }) => {
    const { productStatus } = useProductStatus()

    const { currentStock } = useCatalogueOperations({
        stocks,
        initialCurrentStockId: productStatus
    })

    const form = useFormContext()

    const orderItems = form.watch('order_items') as OrderItemsPayload[]

    const currentOrderItem = orderItems?.find(
        // @ts-ignore
        (orderItem) => orderItem.id === currentStock?.id
    )

    // const { totalPrice, totalPriceWithDiscount, currentStockMaxDiscountPercentage } =
    //     useCatalogueOperations({
    //         stocks,
    //         initialCurrentStockId: productStatus
    //     })

    const totalPrice = formatPrice(currentOrderItem?.price! * currentOrderItem?.amount!)

    const totalPriceWithDiscount = totalPrice - currentOrderItem?.discount!

    if (!totalPrice) return null

    return currentOrderItem?.discount && +totalPriceWithDiscount > 0 ? (
        <div className='flex flex-col'>
            <span className='text-muted line-through'>{totalPrice}₴</span>
            <span className='text-primary'>{totalPriceWithDiscount}₴</span>
        </div>
    ) : (
        <span className='text-primary'>{totalPrice}₴</span>
    )
}
