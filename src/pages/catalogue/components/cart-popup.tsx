import { Link } from 'react-router-dom'

import { ShoppingCartIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { routes } from '@/config/routes'
import { useCartOperations } from '@/hooks/use-cart-operations'

export const getProductLabel = (count: number) => {
    const lastDigit = count % 10
    const lastTwoDigits = count % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return 'товарів'
    }
    if (lastDigit === 1) {
        return 'товар'
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
        return 'товари'
    }
    return 'товарів'
}

export const CartPopup = () => {
    const { cartCount, totalPrice, totalDiscount } = useCartOperations()

    const productLabel = getProductLabel(cartCount)

    return (
        <div
            className={`fixed bottom-4 left-0 right-0 z-20 mx-auto flex h-14 w-[calc(100%-2rem)] max-w-md items-center justify-between gap-x-4 rounded-md bg-background/70 px-5 py-3 text-sm leading-tight shadow-md backdrop-blur-lg transition-all duration-300 ease-in-out md:max-w-2xl xl:left-48 ${
                cartCount > 0
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-full opacity-0'
            }`}
        >
            <div className='flex items-center gap-x-3 md:gap-x-5'>
                <div className='flex items-center gap-x-1.5'>
                    <ShoppingCartIcon className='size-4' />{' '}
                    <span className='max-md:hidden'>Кошик</span>
                </div>
                <Link to={routes.cart}>
                    <Button size='sm'>
                        Оформити <span className='max-md:hidden'>замовлення</span>
                    </Button>
                </Link>
            </div>
            <div className='flex items-center gap-x-3 md:gap-x-5'>
                <span className='text-muted'>
                    {cartCount} {productLabel}
                </span>
                {totalDiscount === 0 ? (
                    <span className='text-primary'>
                        <span className='font-medium text-primary'>{totalPrice}₴</span>
                    </span>
                ) : (
                    <div className='flex flex-col whitespace-nowrap'>
                        <span className='text-xs text-muted-foreground line-through'>
                            {totalPrice}₴
                        </span>
                        <span className='text-sm text-primary md:text-base'>
                            <span>{totalPrice - totalDiscount}</span>₴
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
