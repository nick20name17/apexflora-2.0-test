import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { getCarts } from '@/api/baskets/baskets'
import { ShoppingCartIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { routes } from '@/config/routes'

const getProductLabel = (count: number) => {
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
    const { data: cart } = useQuery({
        queryKey: ['cart'],
        queryFn: () =>
            getCarts({
                limit: 200
            })
    })

    const count = cart?.count || 0
    const isVisible = count > 0

    const totalPrice = cart?.results?.reduce((acc, cartItem) => {
        const price = cartItem.amount * cartItem.stock_product.retail_price
        return acc + price
    }, 0)

    const productLabel = getProductLabel(count)

    return (
        <div
            className={`fixed bottom-6 left-0 right-0 z-20 mx-auto flex h-14 w-[calc(100%-2rem)] max-w-md items-center justify-between gap-x-4 rounded-md bg-background/70 px-5 py-3 text-sm shadow-md backdrop-blur-lg transition-all duration-300 ease-in-out md:max-w-2xl xl:absolute xl:-bottom-6 ${
                isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-full opacity-0'
            }`}
        >
            <div className='flex items-center gap-x-5'>
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
            <div className='flex items-center gap-x-5'>
                <span className='text-muted'>
                    {count} {productLabel}
                </span>
                <span className='font-medium text-primary'>{totalPrice} грн</span>
            </div>
        </div>
    )
}
