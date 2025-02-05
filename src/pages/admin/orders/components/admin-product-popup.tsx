import { CheckCircle } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { type PropsWithChildren, useEffect, useState } from 'react'

import type { OrderItem } from '@/api/order-items/order-items.types'
import type { ShopProduct } from '@/api/shop-products/shop-products.types'
import { ShoppingCartIcon } from '@/components/icons'
import { DiscountLabel, PromoLabel } from '@/components/product-card'
import { HeightInfo, WeighDiameterInfo } from '@/components/product-info'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { NumberStepper } from '@/components/ui/number-stepper'
import { formatPrice, useCatalogueOperations } from '@/hooks/use-catalogue-operations'
import { cn } from '@/lib/utils'
import { useActiveStockId } from '@/pages/catalogue/store/active-stock'
import { useFormContext } from 'react-hook-form'
import { useProductStatus } from '../context/product-status'

interface ProductPopupProps extends PropsWithChildren {
    shopProduct: ShopProduct
}

export const AdminProductPopup = ({ shopProduct, children }: ProductPopupProps) => {
    const form = useFormContext()
    const { productStatus } = useProductStatus()


    const { currentStock } = useCatalogueOperations({
        initialCurrentStockId: productStatus,
        stocks: shopProduct.stocks,
        inWishList: shopProduct.in_wish_list
    })

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

    // Local state for quantity
    const [amount, setAmount] = useState(0)

    const isPromo = currentStock?.promotion
    const isPreorder = currentStock?.status?.id === 3

    // Local price calculations
    const basePrice = currentStock?.retail_price || 0
    const discountPercentage = currentStock?.visible_discount || 0
    const priceWithDiscount = discountPercentage > 0
        ? basePrice - (basePrice * (discountPercentage / 100))
        : basePrice

    const totalPrice = formatPrice(amount * basePrice)
    const totalPriceWithDiscount = formatPrice(amount * priceWithDiscount)

    const handleOpenChange = (newOpen: boolean) => {
        if (stock) {
            setStock(null)
        } else if (currentStock?.id) {
            setStock(currentStock.id)
        }
        setOpen(!newOpen)
    }



    const handleQuantityChange = (value: number) => {
        setAmount(value)
    }

    const handleAddToCart = () => {


        const currentOrderItems = (form.watch('order_items') as OrderItem[]) || []
        const existingItemIndex = currentOrderItems.findIndex(
            (item) => item?.id === currentStock?.id
        )

        if (amount === 0) {
            const updatedOrderItems = currentOrderItems.filter(
                (item) => item?.id !== currentStock?.id
            )
            form.setValue('order_items', updatedOrderItems)
            return
        }

        if (existingItemIndex !== -1) {
            const updatedOrderItems = [...currentOrderItems]
            updatedOrderItems[existingItemIndex] = {
                ...updatedOrderItems[existingItemIndex],
                amount: amount
            }
            form.setValue('order_items', updatedOrderItems)
        } else {
            form.setValue('order_items', [
                ...currentOrderItems,
                {
                    id: currentStock?.id,
                    amount: amount,
                    price: basePrice,
                    discount: basePrice - priceWithDiscount
                }
            ])
        }
    }

    const cartItem = (form.watch('order_items') as OrderItem[])?.find(
        (item) => item?.id === currentStock?.id
    )

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
                            {discountPercentage > 0 ? (
                                <DiscountLabel
                                    discount={discountPercentage}
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
                    </div>

                    <div className='grid grid-cols-3 border-t py-3 text-sm'>
                        <div className='flex flex-col gap-y-0.5'>
                            <h3 className='text-xs text-muted'>Артикул</h3>
                            <span>{shopProduct.origin_id}</span>
                        </div>
                        <div className='flex flex-col gap-y-0.5'>
                            <h3 className='text-xs text-muted'>Висота</h3>
                            <HeightInfo height={shopProduct?.height} />
                        </div>
                        <div className='flex flex-col gap-y-0.5'>
                            <h3 className='text-xs text-muted'>Ваг./діам.</h3>
                            <WeighDiameterInfo weight={shopProduct.weight_size} diameter={shopProduct.diameter} />
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
                        Доступно до замовлення: {isPreorder ? '∞' : currentStock?.quantity}
                    </div>
                    <div className='mb-3 flex flex-col gap-y-2'>
                        <div className='grid h-8 grid-cols-3 items-center bg-muted/10 px-2.5 text-xs'>
                            <span>Ціна</span>
                            <span className='text-center'>Кількість</span>
                            <span className='text-right'>Сума</span>
                        </div>
                        <div className='grid grid-cols-3 items-center px-2.5 text-xs leading-none'>
                            {discountPercentage > 0 ? (
                                <div className='flex flex-col'>
                                    <span className='text-muted line-through'>
                                        {basePrice}₴
                                    </span>
                                    <span className='text-base text-primary'>
                                        {priceWithDiscount}₴
                                    </span>
                                </div>
                            ) : (
                                <span className='text-base text-primary'>
                                    {basePrice}₴
                                </span>
                            )}
                            <NumberStepper
                                onChange={handleQuantityChange}
                                className='mx-auto w-24 shrink-0'
                                max={isPreorder ? 99_999 : currentStock?.quantity || 0}
                                value={amount}
                                step={currentStock?.shop_product.packaging_of || 1}
                            />
                            {discountPercentage > 0 && totalPriceWithDiscount > 0 ? (
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
                    <Button
                        onClick={handleAddToCart}
                        className={cn(
                            'w-full',
                            cartItem ? '' : 'bg-foreground text-background'
                        )}
                        variant={cartItem ? 'highlight' : 'default'}
                        size='lg'
                    >
                        {cartItem ? <CheckCircle /> : <ShoppingCartIcon />}
                        <span>{cartItem ? 'Видалити з кошику' : 'В кошик'}</span>
                    </Button>
                </article>
            </DialogContent>
        </Dialog>
    )
}
