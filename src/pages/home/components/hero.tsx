import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { getProfiles } from '@/api/profile/profile'
import type { ProfilesResponse } from '@/api/profile/profile.types'
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
import { cn } from '@/lib/utils'

export const Hero = () => {
    const { data: profiles, isLoading } = useQuery({
        queryKey: ['profiles'],
        queryFn: () => getProfiles({ limit: 50 })
    })
    return (
        <>
            <h1 className='sr-only'>Apex Flora</h1>
            <HeroCarousel
                profiles={profiles}
                isLoading={isLoading}
            />
        </>
    )
}

interface HeroCarouselProps {
    profiles: ProfilesResponse | undefined
    isLoading: boolean
}
export const HeroCarousel = ({ profiles, isLoading }: HeroCarouselProps) => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(profiles?.count ?? 0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(profiles?.count ?? 0)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api, profiles])

    if (isLoading) {
        return (
            <div className='container mt-5'>
                <Skeleton className='h-[508px] w-full rounded-2xl' />
            </div>
        )
    }

    return (
        <section
            className='mt-5'
            id='hero'
        >
            <Carousel
                className='container'
                setApi={setApi}
                opts={{
                    loop: true
                }}
                plugins={[
                    Autoplay({
                        delay: 10_000
                    })
                ]}
            >
                <CarouselContent>
                    {profiles?.results?.map((profile) => {
                        return (
                            <CarouselItem className='relative h-[508px] w-full'>
                                <div
                                    className='flex h-full w-full flex-col items-start justify-center gap-y-4 overflow-clip rounded-2xl bg-muted bg-cover bg-center p-5 text-background md:p-20'
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${profile?.image})`
                                    }}
                                >
                                    <h2 className='max-w-[560px] text-3xl font-bold leading-tight md:text-5xl'>
                                        {profile?.data?.title}
                                    </h2>
                                    <p className='max-w-[560px] text-sm text-muted-foreground'>
                                        {profile?.data?.text}
                                    </p>
                                    <Button
                                        className='min-w-40'
                                        variant='secondary'
                                        asChild
                                    >
                                        <Link to={profile?.data?.link}>
                                            {profile?.data?.['btn-text']}
                                        </Link>
                                    </Button>
                                </div>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
                <div className='absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-x-2'>
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            className={cn(
                                'h-1.5 w-10 rounded-full bg-background/50 transition-colors',
                                {
                                    'bg-background': index + 1 === current
                                }
                            )}
                            onClick={() => api?.scrollTo(index)}
                        ></button>
                    ))}
                </div>
                <div className='absolute bottom-12 right-20 z-10 hidden sm:block'>
                    <CarouselPrevious className='-left-20 border-white bg-transparent text-background hover:bg-background hover:text-foreground [&_svg]:size-5' />
                    <CarouselNext className='border-white bg-transparent text-background hover:bg-background hover:text-foreground [&_svg]:size-5' />
                </div>
            </Carousel>
        </section>
    )
}
