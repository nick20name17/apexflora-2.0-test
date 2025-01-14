import { CartActionsCell } from './cart-table/cell/cart-action-cell'
import type { Cart } from '@/api/carts/carts.types'
import { DiametrIcon, WeightIcon } from '@/components/icons'
import ImageWithSkeleton from '@/components/ui/image-with-skeleton'
import { NumberStepper } from '@/components/ui/number-stepper'
import { useCartOperations } from '@/hooks/use-cart-operations'
import { formatPrice } from '@/hooks/use-catalogue-operations'

interface OrderItemMobileProps {
    cart: Cart
}

export const OrderItemMobile = ({ cart }: OrderItemMobileProps) => {
    const { handleCartOperation, calculateItemPrices } = useCartOperations()
    const isPreorder = cart.stock_product?.status?.id === 3

    const {} = useCartOperations()

    const { stockMaxDiscountPercentage, totalPriceWithDiscount, totalPrice } =
        calculateItemPrices(cart)

    const priceWithDiscount = stockMaxDiscountPercentage
        ? +formatPrice(
              cart?.stock_product?.retail_price! * (1 - stockMaxDiscountPercentage / 100)
          )
        : 0

    return (
        <div className='rounded-xs border'>
            <div className='flex items-center justify-between gap-x-3 px-2.5 py-4'>
                <div className='flex items-center gap-x-2.5'>
                    <ImageWithSkeleton
                        src={cart?.stock_product.shop_product.image}
                        alt={cart?.stock_product.shop_product.product.ukr_name}
                        className='h-[46px] w-14 rounded-[2px] object-cover md:w-[66px]'
                    />
                    <div className='flex max-w-36 flex-col md:max-w-52'>
                        <span className='truncate text-sm text-foreground'>
                            {cart?.stock_product.shop_product.product?.ukr_name}
                        </span>
                        <div className='flex items-center gap-x-1'>
                            <img
                                src={
                                    cart?.stock_product.shop_product.producer?.country
                                        ?.flag
                                }
                                alt={cart?.stock_product.shop_product.producer?.name}
                                className='size-4'
                            />
                            <span className='truncate text-xs'>
                                {cart?.stock_product.shop_product.producer?.name}
                            </span>
                        </div>
                    </div>
                </div>
                <CartActionsCell cart={cart} />
            </div>
            <div className='grid grid-cols-3 border-t px-2.5 py-3 text-sm'>
                <div className='flex flex-col gap-y-0.5'>
                    <h3 className='text-xs text-muted'>Артикул</h3>
                    <span>{cart?.stock_product?.shop_product.origin_id}</span>
                </div>
                <div className='flex flex-col gap-y-0.5 text-center'>
                    <h3 className='text-xs text-muted'>Висота</h3>
                    <span>{cart?.stock_product?.shop_product.height ?? '-'}</span>
                </div>
                <div className='flex flex-col items-end gap-y-0.5 text-right'>
                    <h3 className='text-xs text-muted'>Ваг./діам.</h3>
                    <div className='flex items-center gap-x-1'>
                        <div className='flex items-center gap-x-0.5'>
                            <WeightIcon className='size-5' />
                            {cart?.stock_product.shop_product.weight_size ?? '-'}
                        </div>
                        <div className='flex items-center gap-x-0.5'>
                            <DiametrIcon className='size-5' />
                            {cart?.stock_product.shop_product.diameter ?? '-'}
                        </div>
                    </div>
                </div>
            </div>
            <div className='mb-3 flex flex-col gap-y-2'>
                <div className='grid h-8 grid-cols-3 items-center bg-muted/10 px-2.5 text-xs'>
                    <span>Ціна</span>
                    <span className='text-center'>Кількість</span>
                    <span className='text-right'>Сума</span>
                </div>
                <div className='grid grid-cols-3 items-center px-2.5 text-xs leading-none'>
                    {stockMaxDiscountPercentage ? (
                        <div className='flex flex-col'>
                            <span className='text-muted line-through'>
                                {cart?.stock_product?.retail_price}₴
                            </span>
                            <span className='text-base text-primary'>
                                {priceWithDiscount}₴
                            </span>
                        </div>
                    ) : (
                        <span className='text-base text-primary'>
                            {cart?.stock_product?.retail_price}₴
                        </span>
                    )}
                    <NumberStepper
                        onChange={(amount) =>
                            handleCartOperation(cart?.stock_product?.id!, amount)
                        }
                        className='mx-auto w-24 shrink-0 md:w-28'
                        max={isPreorder ? 99_999 : cart?.stock_product?.quantity || 0}
                        value={cart?.amount}
                        step={cart?.stock_product?.shop_product.packaging_of || 1}
                    />
                    {stockMaxDiscountPercentage && +totalPriceWithDiscount! > 0 ? (
                        <div className='flex flex-col text-right'>
                            <span className='text-muted line-through'>{totalPrice}₴</span>
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
        </div>
    )
}
