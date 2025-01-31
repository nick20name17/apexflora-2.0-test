import { Heart } from 'iconsax-react'

import type { ShopProduct } from '@/api/shop-products/shop-products.types'
import { useAuth } from '@/hooks/use-auth'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'
import { cn } from '@/lib/utils'
import { DiametrIcon, HeightIcon, WeightIcon } from './icons'
import { Button } from './ui/button'

interface ProductCardProps {
    shopProduct: ShopProduct
    className?: string
}

export const getProductLabel = (count: number) => {
    const lastDigit = count % 10
    const lastTwoDigits = count % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return 'штук'
    }
    if (lastDigit === 1) {
        return 'штука'
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
        return 'штуки'
    }
    return 'штук'
}

export const ProductCard = ({ shopProduct, className }: ProductCardProps) => {
    const {
        handleAddToWishList,
        currentStock,
        currentStockPrice,
        priceWithDiscount,
        currentStockMaxDiscountPercentage
    } = useCatalogueOperations({
        stocks: shopProduct.stocks,
        inWishList: shopProduct.in_wish_list
    })

    const isPromo = currentStock?.promotion

    const { isAuth } = useAuth()

    return (
        <article
            className={cn(
                'h-32 overflow-hidden rounded-sm border bg-background max-sm:flex sm:h-[272px] shadow-sm',
                className
            )}
        >
            <div className='relative h-full w-28 shrink-0 rounded-t-sm bg-muted sm:h-[150px] sm:w-full'>
                <div className='absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/20 to-transparent'></div>
                {isAuth ? (
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleAddToWishList()
                        }}
                        className='group absolute left-1 top-1 z-20 size-fit rounded-full bg-transparent p-1 hover:bg-transparent'
                        size='icon'
                    >
                        <Heart
                            className={cn(
                                '!size-5 text-card group-hover:fill-accent group-hover:text-accent',
                                shopProduct.in_wish_list
                                    ? 'fill-accent text-accent hover:text-primary'
                                    : ''
                            )}
                        />
                    </Button>
                ) : null}
                <img
                    className='size-full object-cover'
                    src={shopProduct.image}
                    alt={shopProduct.product.ukr_name}
                />
                <div className='absolute bottom-1 left-1 flex items-center gap-x-1'>
                    {isPromo ? <PromoLabel /> : null}
                    {currentStockMaxDiscountPercentage ? (
                        <DiscountLabel discount={currentStockMaxDiscountPercentage} />
                    ) : null}
                </div>

            </div>
            <div className='flex flex-col max-sm:w-full justify-between'>
                <div className='h-6 truncate bg-[#F9F9F9] text-muted-foreground px-1.5 flex items-center justify-center text-xs max-sm:hidden'>
                    Доступно:{'  '}
                    {currentStock?.quantity} {getProductLabel(currentStock?.quantity ?? 0)}
                </div>
                <div className='flex flex-1 items-start justify-between gap-1 border-b border-b-secondary p-1.5 md:p-2 leading-none max-sm:w-full'>
                    <div className='flex h-full sm:max-w-30 min-[480px]:max-w-52 max-[480px]:max-w-36 flex-col gap-1 items-start '>
                        <h1 className='truncate text-sm max-w-full'>
                            {shopProduct?.product?.ukr_name}
                        </h1>
                        <div className='flex items-center gap-x-1'>
                            <img
                                className='shrink-0'
                                src={shopProduct?.producer?.country?.flag}
                                alt={shopProduct?.producer?.name}
                            />

                            <span className='truncate text-[11px] text-muted max-w-full'>
                                {shopProduct?.producer?.name}
                            </span>
                        </div>
                    </div>
                    {currentStockMaxDiscountPercentage ? (
                        <div className='flex h-full flex-col items-end gap-y-1'>
                            <span className='text-xs text-muted line-through'>
                                {currentStockPrice}₴
                            </span>
                            <span className='font-medium text-primary'>
                                {priceWithDiscount}₴
                            </span>
                        </div>
                    ) : (
                        <span className='font-medium text-primary'>
                            {currentStockPrice}₴
                        </span>
                    )}
                </div>
                <div className='flex flex-1 items-center justify-between p-1.5 md:p-2 leading-none max-sm:w-full'>
                    <div className='flex flex-col gap-y-0.5'>
                        <h2 className='text-xs text-muted'>Висота</h2>
                        <div className='flex items-center gap-x-0.5'>
                            <HeightIcon className='size-4 text-muted' />
                            <span className='text-sm'>{shopProduct.height}см</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-0.5'>
                        <h2 className='text-xs text-muted'>Ваг./діам.</h2>
                        <div className='flex items-center gap-x-1'>
                            <div className='flex items-center gap-x-0.5'>
                                <WeightIcon className='size-4 text-muted' />
                                <span className='text-sm'>
                                    {shopProduct.weight_size ?? '-'}
                                </span>
                            </div>
                            <div className='flex items-center gap-x-0.5'>
                                <DiametrIcon className='size-4 text-muted' />
                                <span className='text-sm'>
                                    {shopProduct.diameter ?? '-'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-6 truncate bg-[#F9F9F9] text-muted-foreground px-1.5 md:px-2 flex items-center justify-center text-xs sm:hidden'>
                    Доступно:{'  '}
                    {currentStock?.quantity} {getProductLabel(currentStock?.quantity ?? 0)}
                </div>
            </div>
        </article>
    )
}

export const PromoLabel = () => {
    return (
        <div className='flex size-[26px] items-center justify-center rounded-xs bg-highlight'>
            <svg
                className='size-5'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M8.22336 3.00252C8.33998 2.99039 8.3941 3.02218 8.48761 3.09619C8.50594 3.1106 8.50594 3.1106 8.52464 3.12529C8.56113 3.15422 8.59723 3.18364 8.63322 3.21328C8.65205 3.22868 8.67088 3.24407 8.69027 3.25994C8.83681 3.3838 8.9728 3.52004 9.10781 3.65823C9.13317 3.68386 9.13317 3.68386 9.15904 3.71001C9.38736 3.94813 9.5722 4.23 9.73339 4.52471C9.74087 4.53837 9.74835 4.55203 9.75605 4.56611C10.2398 5.46501 10.2526 6.44901 10.0709 7.44163C10.0178 7.74952 9.99946 8.05687 10.1518 8.33422C10.2957 8.56078 10.4768 8.75191 10.7272 8.82263C11.0187 8.87368 11.2779 8.82937 11.5211 8.64049C11.6986 8.48205 11.8206 8.28344 11.869 8.03747C11.8719 7.9989 11.8738 7.96024 11.8751 7.92157C11.8759 7.89979 11.8767 7.87801 11.8775 7.85557C11.8791 7.80971 11.8806 7.76384 11.8821 7.71798C11.8829 7.69629 11.8837 7.6746 11.8845 7.65226C11.8852 7.63237 11.8858 7.61249 11.8865 7.592C11.8906 7.54568 11.8906 7.54568 11.9122 7.52227C11.9711 7.51147 11.9711 7.51147 12.0416 7.52227C12.0872 7.57187 12.1193 7.61433 12.1548 7.67156C12.165 7.68736 12.1752 7.70316 12.1856 7.71945C12.8421 8.76196 13.1392 10.128 12.9378 11.3771C12.8016 12.16 12.4848 12.895 11.9984 13.494C11.9801 13.5167 11.9617 13.5395 11.9428 13.5629C11.2882 14.3629 10.3725 14.8864 9.38824 14.9927C9.32866 14.9964 9.26918 14.9976 9.20952 14.9983C9.1929 14.9985 9.17629 14.9988 9.15918 14.999C8.78941 15.0031 8.43295 14.9992 8.07235 14.8991C8.04481 14.8915 8.04481 14.8915 8.01672 14.8839C7.00887 14.5999 6.11974 13.9085 5.58324 12.9337C5.53346 12.8407 5.48637 12.7463 5.44058 12.6509C5.43377 12.6367 5.42696 12.6226 5.41994 12.608C4.91811 11.5481 4.88808 10.2564 5.21285 9.1309C5.45807 8.32564 5.88665 7.63225 6.41224 7.01026C6.45004 6.96546 6.48675 6.91994 6.52322 6.87387C6.60994 6.76575 6.70058 6.66163 6.79083 6.557C6.90976 6.41912 7.02751 6.28014 7.14476 6.14058C7.16108 6.12147 7.17741 6.10236 7.19422 6.08267C7.77471 5.39673 8.25381 4.58343 8.24864 3.62191C8.2424 3.48593 8.22895 3.35058 8.21524 3.21526C8.21322 3.19453 8.2112 3.17381 8.20912 3.15245C8.2072 3.13373 8.20528 3.11501 8.2033 3.09573C8.20179 3.04935 8.20179 3.04935 8.22336 3.00252ZM8.3916 8.96258C8.36814 8.98894 8.36814 8.98894 8.34419 9.01583C8.32673 9.03513 8.30927 9.05444 8.29128 9.07433C8.26433 9.10519 8.26433 9.10519 8.23684 9.13667C8.21904 9.15643 8.20125 9.17619 8.18291 9.19654C7.49688 9.96317 6.99952 10.8364 7.0077 11.9345C7.02017 12.4508 7.19183 12.9443 7.51148 13.33C7.52537 13.3468 7.52537 13.3468 7.53953 13.364C7.88342 13.7741 8.35223 14.036 8.86664 14.065C9.43366 14.083 9.92964 13.9086 10.3496 13.4797C10.367 13.4612 10.3843 13.4427 10.4021 13.4237C10.4201 13.4047 10.4381 13.3858 10.4566 13.3663C10.8185 12.962 10.9966 12.4069 10.9922 11.8483C10.9856 11.6028 10.9622 11.2893 10.8336 11.0819C10.796 11.0537 10.796 11.0537 10.7473 11.0584C10.7008 11.0888 10.6604 11.1193 10.6178 11.155C10.302 11.4047 9.96542 11.466 9.58239 11.4097C9.24835 11.3349 8.98036 11.1489 8.79097 10.8418C8.54894 10.4049 8.53723 9.96001 8.54289 9.46453C8.54322 9.41444 8.54351 9.36436 8.54378 9.31428C8.54448 9.19311 8.54559 9.07195 8.54694 8.95079C8.47874 8.92629 8.45248 8.91742 8.3916 8.96258Z'
                    fill='#2F2F2F'
                />
            </svg>
        </div>
    )
}

export const DiscountLabel = ({ discount }: { discount: number }) => {
    return (
        <div className='flex h-[26px] w-10 items-center justify-center rounded-xs bg-accent text-xs text-primary'>
            -{discount}%
        </div>
    )
}
