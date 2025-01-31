import type { Cart } from '@/api/carts/carts.types'
import { formatPrice } from '@/hooks/use-catalogue-operations'

export const PriceCell = ({ cart }: { cart: Cart }) => {
    const priceWithDiscount = cart?.visible_discount
        ? +formatPrice(
              +cart?.stock_product?.retail_price! * (1 - cart?.visible_discount / 100)
          )
        : 0

    return priceWithDiscount > 0 ? (
        <div className='flex flex-col'>
            <span className='text-muted line-through'>
                {formatPrice(+cart?.stock_product?.retail_price)}₴
            </span>
            <span className='font-medium text-primary'>{priceWithDiscount}₴</span>
        </div>
    ) : (
        <span className='font-medium text-primary'>
            {formatPrice(+cart?.stock_product?.retail_price)}₴
        </span>
    )
}
