import { useNavigate } from 'react-router-dom'

import type { Stock } from '@/api/stock/stock.types'
import { NumberStepper } from '@/components/ui/number-stepper'
import { routes } from '@/config/routes'
import { useAuth } from '@/hooks/use-auth'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'

export const QuantityCell = ({ stocks }: { stocks: Stock[] }) => {
    const navigate = useNavigate()
    const { isAuth } = useAuth()

    const { amount, currentStock, handleValueChange } = useCatalogueOperations({
        stocks
    })

    const isPreorder = currentStock?.status?.id === 3

    const redirectToLogin = () => {
        navigate(routes.signIn)
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
                    <span> {currentStock?.quantity || 0}шт.</span>
                )}
            </span>
            <NumberStepper
                onChange={isAuth ? handleValueChange : redirectToLogin}
                className='w-28 shrink-0'
                max={isPreorder ? 99_999 : currentStock?.quantity || 0}
                value={amount}
                step={currentStock?.shop_product.packaging_of || 1}
            />
        </div>
    )
}
