import Autoplay from 'embla-carousel-autoplay'
import { Heart } from 'iconsax-react'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { getShopProducts } from '@/api/shop-products/shop-products'
import type { ShopProduct } from '@/api/shop-products/shop-products.types'
import { HeightIcon } from '@/components/icons'
import { DiscountLabel, PromoLabel, getProductLabel } from '@/components/product-card'
import { WeighDiameterInfo } from '@/components/product-info'
import { Button } from '@/components/ui/button'
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { routes } from '@/config/routes'
import { useAuth } from '@/hooks/use-auth'
import { formatPrice, useCatalogueOperations } from '@/hooks/use-catalogue-operations'
import { cn } from '@/lib/utils'

export const Catalogue = () => {
    const { data: shopProducts, isLoading } = useQuery({
        queryKey: ['shopProducts'],
        queryFn: () =>
            getShopProducts({
                limit: 20,
                promotion: true
            })
    })

    const [api, setApi] = useState<CarouselApi>()
    const [slidesInView, setSlidesInView] = useState<number[]>([])

    useEffect(() => {
        if (!api) {
            return
        }

        setSlidesInView(api.slidesInView())

        const onScroll = () => {
            setSlidesInView(api.slidesInView())
        }

        api.on('slidesInView', onScroll)
        api.on('init', () => setSlidesInView(api.slidesInView()))
        api.on('reInit', () => setSlidesInView(api.slidesInView()))

        return () => {
            api.off('slidesInView', onScroll)
            api.off('init', () => setSlidesInView(api.slidesInView()))
            api.off('reInit', () => setSlidesInView(api.slidesInView()))
        }
    }, [api])

    return (
        <section
            className='mx-auto mt-15 w-screen max-w-[1920px] overflow-hidden'
            id='catalogue'
        >
            <div className='container mx-auto flex items-center justify-between gap-4 px-4'>
                <div>
                    <h2 className='text-2xl font-medium md:text-4xl'>Каталог</h2>
                    <p className='mt-1 font-book text-muted-foreground'>
                        Більше 1000 позицій квітів, від кращих виробників з усього світу,
                        в одному місці
                    </p>
                </div>
                <Link
                    className='max-md:hidden'
                    to={routes.catalogue}
                >
                    <Button className='w-40'>До каталогу</Button>
                </Link>
            </div>
            <div className='relative mt-10'>
                <div className='pl-4 md:pl-0'>
                    <Carousel
                        opts={{
                            align: 'center',

                            loop: true,
                            dragFree: true,
                            inViewThreshold: 1
                        }}
                        plugins={[
                            Autoplay({
                                delay: 10_000,
                                stopOnInteraction: false,
                                stopOnMouseEnter: true
                            })
                        ]}
                        className='w-full'
                        setApi={setApi}
                    >
                        <CarouselContent className='-ml-2.5'>
                            {isLoading
                                ? Array.from({ length: 20 }).map((_, index) => (
                                      <CarouselItem
                                          key={index}
                                          className='flex-shrink-0 flex-grow-0 basis-[210px] pl-2.5'
                                      >
                                          <Skeleton className='h-[270px] w-[200px] rounded-sm' />
                                      </CarouselItem>
                                  ))
                                : shopProducts?.results?.map((shopProduct, index) => (
                                      <CarouselItem
                                          key={shopProduct.id}
                                          className={cn(
                                              'flex-shrink-0 flex-grow-0 basis-[210px] pl-2.5 transition-[filter]',
                                              !slidesInView.includes(index)
                                                  ? 'md:blur-[1.6px]'
                                                  : 'blur-none'
                                          )}
                                      >
                                          <ProductCard shopProduct={shopProduct} />
                                      </CarouselItem>
                                  ))}
                        </CarouselContent>
                        <CarouselPrevious className='absolute left-12 top-1/2 z-20 hidden -translate-y-1/2 border-none bg-background text-black shadow-md hover:bg-black hover:text-background md:flex' />
                        <CarouselNext className='absolute right-12 top-1/2 z-20 hidden -translate-y-1/2 border-none bg-background text-black shadow-md hover:bg-black hover:text-background md:flex' />
                    </Carousel>
                </div>
            </div>
            <Link
                className='mx-auto mt-5 block w-40 md:hidden'
                to={routes.catalogue}
            >
                <Button className='w-full'>До каталогу</Button>
            </Link>
        </section>
    )
}

interface ProductCardProps {
    shopProduct: ShopProduct
}

export const ProductCard = ({ shopProduct }: ProductCardProps) => {
    const {
        handleAddToWishList,
        currentStockPrice,
        priceWithDiscount,
        currentStock,
        currentStockMaxDiscountPercentage
    } = useCatalogueOperations({
        initialCurrentStock: shopProduct?.stocks?.[0],
        inWishList: shopProduct.in_wish_list
    })

    const isPromo = shopProduct.stocks.some((stock) => stock.promotion)

    const { isAuth } = useAuth()

    return (
        <article className='h-[280px] w-[200px] overflow-hidden rounded-sm border border-muted-foreground bg-[#F6F4F0] font-book'>
            <div className='relative h-[150px] w-full rounded-t-sm bg-muted-foreground'>
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
                                '!size-5 text-card group-hover:fill-accent group-hover:text-accent/40',
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
            <div className='flex h-[28px] items-center justify-center gap-x-1 truncate bg-[hsl(0,0%,91%)] px-1.5 text-center text-xs text-muted'>
                Доступно:{'  '}
                <span> {currentStock?.quantity ?? '-'}</span>
                {getProductLabel(currentStock?.quantity ?? 0)}
            </div>
            <div className='flex items-start justify-between gap-x-1 border-b p-2.5 leading-none'>
                <div className='flex h-full flex-col gap-y-1 truncate'>
                    <h1 className='truncate font-sans text-sm'>
                        {shopProduct.product.ukr_name}
                    </h1>
                    <div className='flex items-center gap-x-1'>
                        <img
                            className='shrink-0'
                            src={shopProduct.producer.country.flag}
                            alt={shopProduct.producer.name}
                        />

                        <span className='max-w-full truncate text-[10px] text-muted-foreground'>
                            {shopProduct.producer.name}
                        </span>
                    </div>
                </div>
                {currentStockMaxDiscountPercentage ? (
                    <div className='flex h-full flex-col gap-y-1 font-sans'>
                        <span className='text-xs text-muted-foreground line-through'>
                            {formatPrice(currentStockPrice)}₴
                        </span>
                        <span className='font-medium text-primary'>
                            {formatPrice(priceWithDiscount)}₴
                        </span>
                    </div>
                ) : (
                    <span className='font-sans font-medium text-primary'>
                        {formatPrice(currentStockPrice)}₴
                    </span>
                )}
            </div>
            <div className='flex items-start justify-between px-2.5 py-1.5 font-book leading-none'>
                <div className='flex flex-col gap-y-0.5'>
                    <h2 className='text-xs text-muted-foreground'>Висота</h2>
                    <div className='flex items-center gap-x-0.5'>
                        <HeightIcon className='size-4 text-muted-foreground' />
                        <span className='text-sm'>{shopProduct.height}см</span>
                    </div>
                </div>
                <div className='flex flex-col gap-y-0.5'>
                    <h2 className='text-xs text-muted-foreground'>Ваг./діам.</h2>
                    <WeighDiameterInfo
                        weight={shopProduct.weight_size}
                        diameter={shopProduct.diameter}
                    />
                </div>
            </div>
        </article>
    )
}
