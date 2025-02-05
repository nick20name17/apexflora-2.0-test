import type { PreorderStock } from '@/api/stock/stock.types'
import { Skeleton } from '@/components/ui/skeleton'

export const AllPreordersCard = ({ preorderStock }: { preorderStock: PreorderStock }) => {
    const totalPrice = preorderStock.amount * preorderStock.price

    return (
        <div className='flex items-center justify-between gap-x-4 rounded-md border-2 border-secondary p-1'>
            <div className='flex items-center gap-x-2'>
                <div className='h-16 w-20'>
                    {preorderStock.shop_product.image ? (
                        <img
                            className='h-full w-full rounded-sm object-cover'
                            src={preorderStock.shop_product.image}
                            alt={preorderStock.shop_product.product.name}
                        />
                    ) : (
                        <Skeleton className='h-full w-full rounded-sm object-cover' />
                    )}
                </div>
                <div className='flex flex-col gap-y-0.5 text-sm max-w-48 truncate'>
                    <h1 className='font-bold text-primary truncate'>
                        {preorderStock.shop_product.product.ukr_name}
                    </h1>
                    <span className='text-foreground/60 truncate'>
                        Артикул: {preorderStock.shop_product.origin_id}
                    </span>
                </div>
            </div>
            <div className='grid h-full w-3/4 grid-cols-9 items-center gap-x-4 pr-4'>
                <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <span className='text-xs'>Колір</span>
                    <span>
                        {preorderStock.shop_product.colors
                            .map((color) => color.name)
                            .join(', ')}
                    </span>
                </div>
                <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <span className='text-xs'>Висота</span>
                    <span>{preorderStock.shop_product.height} см</span>
                </div>
                <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <span className='text-xs'>Висота</span>
                    <span>{preorderStock.shop_product.height} см</span>
                </div>
                <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <span className='text-xs'>Виробник</span>
                    <span className='flex items-center gap-x-2 text-sm'>
                        <img
                            className='size-3.5'
                            src={preorderStock.shop_product.producer?.country?.flag}
                            alt={preorderStock.shop_product.producer?.country?.name}
                        />
                        {preorderStock.shop_product?.producer?.name || '-'}
                    </span>
                </div>

                <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <span className='text-xs'>Вагa/d&nbsp;⌀</span>
                    <span>{preorderStock.shop_product.weight_size || '-'}</span>
                </div>
                <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <span className='text-xs'>Якість</span>
                    <span>{preorderStock.shop_product.quality} </span>
                </div>
                <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <span className='text-xs'>Ціна</span>
                    <span>{preorderStock.price} ₴</span>
                </div>
                <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <span className='text-xs'>Всього</span>
                    <span>{preorderStock.amount}</span>
                </div>
                {/* <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <span className='text-xs'>Знижка</span>
                    <span className='text-primary'>{orderItem.discount}</span>
                </div> */}
                <div className='flex w-fit flex-col items-start gap-y-0.5 justify-self-end'>
                    <span className='text-xs'>Сума</span>
                    <span>{totalPrice} ₴</span>
                </div>
            </div>
        </div>
    )
}
