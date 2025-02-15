import type { ProfilesResponse } from "@/api/profile/profile.types"
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { EditProfileModal, RemoveProfileModal } from "./modals"


interface AdminCarouselProps {
    profiles: ProfilesResponse | undefined
    isLoading: boolean
}
export const AdminCarousel = ({ profiles, isLoading }: AdminCarouselProps) => {
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
        return <div className='container'>
            <Skeleton className='h-[508px] w-full rounded-2xl' />
        </div>
    }

    return (
        <section
            className='container'
            id='hero'
        >
            <Carousel
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
                    {
                        profiles?.results?.map((profile) => {
                            return <CarouselItem className='h-[508px] w-full relative'>
                                <div className="top-5 right-5 absolute flex items-center gap-x-2 ">
                                    <EditProfileModal className="bg-background border-none" profile={profile} />
                                    {profiles?.count > 1 && <RemoveProfileModal className="bg-background border-none" profile={profile} />}
                                </div>
                                <div
                                    className='flex h-full w-full flex-col items-start justify-center gap-y-4 overflow-clip rounded-2xl bg-muted bg-cover bg-center p-5 text-background md:p-20'
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${profile?.image})`
                                    }}

                                >
                                    <h2 className='text-3xl font-bold leading-tight md:text-5xl max-w-[560px]'>
                                        {profile?.data?.title}
                                    </h2>
                                    <p className='text-sm text-muted-foreground max-w-[560px]'>
                                        {profile?.data?.text}
                                    </p>
                                    <Button
                                        className="min-w-40"
                                        variant='secondary'
                                        asChild
                                    >
                                        <Link to={profile?.data?.link}>{profile?.data?.["btn-text"]}</Link>
                                    </Button>
                                </div>
                            </CarouselItem>
                        })
                    }


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
