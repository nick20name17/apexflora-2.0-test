import { Check, X } from 'lucide-react'
import { useState } from 'react'

import type { Cart } from '@/api/carts/carts.types'
import { Button } from '@/components/ui/button'
import { NumberStepper } from '@/components/ui/number-stepper'
import { useCartOperations } from '@/hooks/use-cart-operations'

export const QuantityCell = ({ cart }: { cart: Cart }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const { handleCartOperation } = useCartOperations()
    const isPreorder = cart.stock_product?.status?.id === 3

    const handleChange = (amount: number) => {
        if (amount === 0) {
            setShowDeleteConfirm(true)
            return
        }
        handleCartOperation(cart?.stock_product?.id!, amount)
    }

    const handleDelete = () => {
        handleCartOperation(cart?.stock_product?.id!, 0)
        setShowDeleteConfirm(false)
    }

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
            {showDeleteConfirm ? (
                <div className='flex w-28 flex-col items-center gap-x-2'>
                    <span className='text-xs'>Видалити?</span>
                    <div className='flex items-center gap-x-2'>
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => setShowDeleteConfirm(false)}
                            className='!size-5'
                        >
                            <X className='!size-3' />
                        </Button>
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={handleDelete}
                            className='!size-5 hover:bg-destructive hover:text-destructive-foreground'
                        >
                            <Check className='!size-3' />
                        </Button>
                    </div>
                </div>
            ) : (
                <NumberStepper
                    onChange={handleChange}
                    className='w-28 shrink-0'
                    max={isPreorder ? 99_999 : cart?.stock_product?.quantity || 0}
                    value={cart?.amount}
                    step={cart?.stock_product?.shop_product.packaging_of || 1}
                />
            )}
        </div>
    )
}
