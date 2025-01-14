import type { Cart } from '@/api/carts/carts.types'
import { NumberStepper } from '@/components/ui/number-stepper'
import { useCartOperations } from '@/hooks/use-cart-operations'

export const QuantityCell = ({ cart }: { cart: Cart }) => {
    const { handleCartOperation } = useCartOperations()
    const isPreorder = cart.stock_product?.status?.id === 3

    return (
        <div
            className='flex w-full items-center justify-between gap-x-1.5'
            id='quantity-cell'
        >
            <span className='text-xs text-[#14B758]'>
                {isPreorder ? (
                    <span className='text-base'>∞</span>
                ) : (
                    <span> {cart.stock_product?.quantity || 0}шт.</span>
                )}
            </span>
            <NumberStepper
                onChange={(amount) =>
                    handleCartOperation(cart?.stock_product?.id!, amount)
                }
                className='w-28 shrink-0'
                max={isPreorder ? 99_999 : cart?.stock_product?.quantity || 0}
                value={cart?.amount}
                step={cart?.stock_product?.shop_product.packaging_of || 1}
            />
        </div>
    )
}
