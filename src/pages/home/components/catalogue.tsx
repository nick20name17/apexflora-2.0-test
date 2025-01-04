import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { getShopProducts } from '@/api/shop-products/shop-products'
import { ProductCard } from '@/components/product-card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'

export const Catalogue = () => {
    const { data: shopProducts, isLoading } = useQuery({
        queryKey: ['shopProducts'],
        queryFn: () =>
            getShopProducts({
                limit: 20,
                promotion: true,
                offset: 5
            })
    })

    const [api, setApi] = useState<any>()

    useEffect(() => {
        if (!api) {
            return
        }
    }, [api])

    return (
        <section className='mx-auto mt-15 w-screen max-w-[1920px] overflow-hidden'>
            <div className='container mx-auto px-4'>
                <h2 className='text-2xl font-medium md:text-4xl'>Каталог</h2>
                <p className='mt-1 text-muted'>
                    Більше 1000 позицій квітів, від кращих виробників з усього світу, в
                    одному місці
                </p>
            </div>
            <div className='relative mt-10'>
                <div className='absolute bottom-0 left-0 top-0 z-10 hidden w-20 bg-gradient-to-r from-background to-transparent backdrop-blur-xs md:block'></div>
                <div className='absolute bottom-0 right-0 top-0 z-10 hidden w-20 bg-gradient-to-l from-background to-transparent backdrop-blur-xs md:block'></div>
                <div className='pl-4 md:pl-0'>
                    <Carousel
                        opts={{
                            align: 'center',
                            loop: true,
                            dragFree: true
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
                                          className='flex-shrink-0 flex-grow-0 pl-2.5'
                                          style={{ flexBasis: '210px' }}
                                      >
                                          <Skeleton className='h-[248px] w-[200px] rounded-sm' />
                                      </CarouselItem>
                                  ))
                                : shopProducts?.results?.map((shopProduct) => (
                                      <CarouselItem
                                          key={shopProduct.id}
                                          className='flex-shrink-0 flex-grow-0 pl-2.5'
                                          style={{ flexBasis: '210px' }}
                                      >
                                          <ProductCard shopProduct={shopProduct} />
                                      </CarouselItem>
                                  ))}
                        </CarouselContent>
                        <CarouselPrevious className='hover:text-backbg-background absolute left-12 top-1/2 z-20 hidden -translate-y-1/2 border-none bg-background text-foreground shadow-md hover:bg-foreground hover:text-background md:flex' />
                        <CarouselNext className='absolute right-12 top-1/2 z-20 hidden -translate-y-1/2 border-none bg-background text-foreground shadow-md hover:bg-foreground hover:text-background md:flex' />
                    </Carousel>
                </div>
            </div>
        </section>
    )
}
