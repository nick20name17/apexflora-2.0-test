import { Heart } from 'iconsax-react'
import { CheckCircle } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { type PropsWithChildren, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { HeightIcon, ShoppingCartIcon } from './icons'
import { DiscountLabel, PromoLabel } from './product-card'
import { WeighDiameterInfo } from './product-info'
import { Button } from './ui/button'
import { NumberStepper } from './ui/number-stepper'
import type { ShopProduct } from '@/api/shop-products/shop-products.types'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { routes } from '@/config/routes'
import { useAuth } from '@/hooks/use-auth'
import { formatPrice, useCatalogueOperations } from '@/hooks/use-catalogue-operations'
import { cn } from '@/lib/utils'
import { useActiveStockId } from '@/pages/catalogue/store/active-stock'

interface ProductPopupProps extends PropsWithChildren {
    shopProduct: ShopProduct
    initialCurrentStockId?: string
}

export const ProductPopup = ({
    shopProduct,
    children,
    initialCurrentStockId
}: ProductPopupProps) => {
    const {
        currentStock,
        inCart,
        handleValueChange,
        amount: initialAmount,
        currentStockMaxDiscountPercentage,
        currentStockPrice,
        priceWithDiscount,
        handleAddToWishList
    } = useCatalogueOperations({
        stocks: shopProduct?.stocks,
        inWishList: shopProduct?.in_wish_list,
        initialCurrentStockId
    })

    const { isAuth } = useAuth()

    const { activeStockId } = useActiveStockId()

    const [stock, setStock] = useQueryState('stock', {
        parse: Number
    })

    const [open, setOpen] = useState(
        stock === currentStock?.id || activeStockId === currentStock?.id
    )

    useEffect(() => {
        setOpen(activeStockId === currentStock?.id || stock === currentStock?.id)
    }, [activeStockId, currentStock?.id, stock])

    const [amount, setAmount] = useState(initialAmount)

    useEffect(() => {
        setAmount(initialAmount)
    }, [initialAmount])

    const [inWishList, setInWishList] = useState(shopProduct.in_wish_list)

    useEffect(() => {
        setInWishList(shopProduct.in_wish_list)
    }, [shopProduct.in_wish_list])

    const isPromo = currentStock?.promotion
    const isPreorder = currentStock?.status?.id === 3

    const totalPrice = formatPrice(amount * currentStockPrice)
    const totalPriceWithDiscount = formatPrice(amount * priceWithDiscount)

    const handleOpenChange = (newOpen: boolean) => {
        if (stock) {
            setStock(null)
        } else if (currentStock?.id) {
            setStock(currentStock.id)
        }

        setOpen(!newOpen)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={handleOpenChange}
        >
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent
                closeButtonClassName='bg-[#2F2F2F] hover:bg-foreground text-background size-11 flex items-center justify-center rounded-full -right-2 -top-2 z-40'
                className='w-80 p-0 md:w-96'
                id='product-popup'
            >
                <DialogHeader className='sr-only'>
                    <DialogTitle>{shopProduct.product.ukr_name}</DialogTitle>
                </DialogHeader>
                <article className='w-full p-4'>
                    <div className='relative h-60 max-w-full overflow-hidden rounded-xs bg-muted'>
                        <div className='absolute inset-x-0 top-0 z-10 h-24 max-w-full bg-gradient-to-b from-black/20 to-transparent'></div>
                        <img
                            className='size-full max-h-full max-w-full object-cover'
                            src={shopProduct.image}
                            alt={shopProduct.product.ukr_name}
                        />
                        <div className='absolute bottom-2 left-2 flex items-center gap-x-1'>
                            {isPromo ? <PromoLabel /> : null}
                            {currentStockMaxDiscountPercentage ? (
                                <DiscountLabel
                                    discount={currentStockMaxDiscountPercentage}
                                />
                            ) : null}
                        </div>
                    </div>
                    <div className='flex items-center justify-between py-3'>
                        <div className='flex max-w-60 flex-col truncate md:max-w-72'>
                            <h1 className='truncate text-lg'>
                                {shopProduct.product?.ukr_name}
                            </h1>
                            <div className='flex items-center gap-x-1'>
                                <img
                                    src={shopProduct.producer?.country?.flag}
                                    alt={shopProduct.producer?.name}
                                    className='size-4'
                                />
                                <span className='truncate text-sm text-muted'>
                                    {shopProduct.producer?.name}
                                </span>
                            </div>
                        </div>
                        {isAuth ? (
                            <Button
                                variant={inWishList ? 'accent' : 'ghost'}
                                onClick={handleAddToWishList}
                                size='icon'
                            >
                                <Heart
                                    className={cn(
                                        '!size-5 text-muted',
                                        inWishList ? 'text-primary' : ''
                                    )}
                                />
                            </Button>
                        ) : null}
                    </div>

                    <div className='grid grid-cols-3 border-t py-3 text-sm'>
                        <div className='flex flex-col gap-y-0.5'>
                            <h3 className='text-xs text-muted'>Артикул</h3>
                            <span>{shopProduct.origin_id}</span>
                        </div>
                        <div className='flex flex-col gap-y-0.5'>
                            <h3 className='text-xs text-muted'>Висота</h3>
                            <div className='flex items-center gap-x-1'>
                                <HeightIcon className='size-4 text-muted' />
                                <span>{shopProduct.height}см</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-0.5'>
                            <h3 className='text-xs text-muted'>Ваг./діам.</h3>
                            <WeighDiameterInfo
                                weight={shopProduct.weight_size}
                                diameter={shopProduct.diameter}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 border-t py-3 text-sm'>
                        <div className='flex flex-col gap-y-0.5'>
                            <h3 className='text-xs text-muted'>Колір</h3>
                            <span>
                                {shopProduct.colors.map((color) => color.name).join(', ')}
                            </span>
                        </div>
                        <div className='flex flex-col gap-y-0.5'>
                            <h3 className='text-xs text-muted'>Якість</h3>
                            <span>{shopProduct.quality ?? '-'}</span>
                        </div>
                        <div className='flex flex-col gap-y-0.5'>
                            <h3 className='text-xs text-muted'>Зрілість</h3>
                            <span>{shopProduct.stage ?? '-'}</span>
                        </div>
                    </div>
                    <div className='flex h-6 items-center justify-center bg-accent text-xs text-muted'>
                        Доступно до замовлення:{' '}
                        {isPreorder ? '∞' : currentStock?.quantity}
                    </div>
                    <div className='mb-3 flex flex-col gap-y-2'>
                        <div className='grid h-8 grid-cols-3 items-center bg-muted/10 px-2.5 text-xs'>
                            <span>Ціна</span>
                            <span className='text-center'>Кількість</span>
                            <span className='text-right'>Сума</span>
                        </div>
                        <div className='grid grid-cols-3 items-center px-2.5 text-xs leading-none'>
                            {currentStockMaxDiscountPercentage ? (
                                <div className='flex flex-col'>
                                    <span className='text-muted line-through'>
                                        {currentStockPrice}₴
                                    </span>
                                    <span className='text-base text-primary'>
                                        {priceWithDiscount}₴
                                    </span>
                                </div>
                            ) : (
                                <span className='text-base text-primary'>
                                    {currentStockPrice}₴
                                </span>
                            )}
                            <NumberStepper
                                onChange={inCart ? handleValueChange : setAmount}
                                className='mx-auto w-24 shrink-0'
                                max={isPreorder ? 99_999 : currentStock?.quantity || 0}
                                value={amount}
                                step={currentStock?.shop_product.packaging_of || 1}
                            />
                            {currentStockMaxDiscountPercentage &&
                            totalPriceWithDiscount > 0 ? (
                                <div className='flex flex-col text-right'>
                                    <span className='text-muted line-through'>
                                        {totalPrice}₴
                                    </span>
                                    <span className='text-base text-primary'>
                                        {totalPriceWithDiscount}₴
                                    </span>
                                </div>
                            ) : (
                                <span className='text-right text-base text-primary'>
                                    {totalPrice}₴
                                </span>
                            )}
                        </div>
                    </div>
                    {isAuth ? (
                        <Button
                            disabled={amount === 0}
                            onClick={() => handleValueChange(inCart ? 0 : amount)}
                            className={cn(
                                'w-full',
                                inCart ? '' : 'bg-foreground text-background'
                            )}
                            variant={inCart ? 'highlight' : 'default'}
                            size='lg'
                        >
                            {inCart ? <CheckCircle /> : <ShoppingCartIcon />}
                            <span>{inCart ? 'Видалити з кошику' : 'В кошик'}</span>
                        </Button>
                    ) : (
                        <Link to={routes.signIn}>
                            <Button
                                className='w-full bg-foreground text-background'
                                size='lg'
                            >
                                <ShoppingCartIcon />
                                <span>В кошик</span>
                            </Button>
                        </Link>
                    )}
                </article>
            </DialogContent>
        </Dialog>
    )
}
