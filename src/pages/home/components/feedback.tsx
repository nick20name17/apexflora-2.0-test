import { useEffect, useState } from 'react'

import story01 from '@/assets/video/feedback_01.mp4'
import story02 from '@/assets/video/feedback_02.mp4'
import story03 from '@/assets/video/feedback_03.mp4'
import story04 from '@/assets/video/feedback_04.mp4'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel'
import { Story } from '@/components/ui/story'

const stories = [
    { id: 1, videoSrc: story01 },
    { id: 2, videoSrc: story02 },
    { id: 3, videoSrc: story03 },
    { id: 4, videoSrc: story04 },
    { id: 5, videoSrc: story01 },
    { id: 6, videoSrc: story02 },
    { id: 7, videoSrc: story03 }
]

export const Feedback = () => {
    const [api, setApi] = useState<any>()
    const [current, setCurrent] = useState(0)
    const [hasUserInteracted, setHasUserInteracted] = useState(false)

    const handleUserInteraction = () => {
        setHasUserInteracted(true)
    }

    useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap())

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap())
            handleUserInteraction()
        })
    }, [api])

    return (
        <section className='mx-auto w-full max-w-[1920px]'>
            <div className='pb-4 pt-8'>
                <h2 className='text-center text-2xl font-medium md:text-4xl'>
                    Відгуки наших клієнтів
                </h2>
                <p className='mx-auto mt-2 max-w-2xl text-center text-muted'>
                    Ніхто не скаже про тебе краще, ніж задоволений клієнт. Нам довіряють і
                    для нас це найдорожче
                </p>
            </div>
            <Carousel
                opts={{
                    align: 'center',
                    loop: true,
                    dragFree: true
                }}
                className='mt-10 w-full'
                setApi={setApi}
            >
                <CarouselContent className='-ml-4 md:-ml-6'>
                    {stories.map((story, index) => (
                        <CarouselItem
                            key={story.id}
                            className='basis-[85%] pl-4 sm:basis-[45%] md:basis-[30%] md:pl-6 lg:basis-[23%] xl:basis-[18%]'
                        >
                            <Story
                                videoSrc={story.videoSrc}
                                onUserInteraction={handleUserInteraction}
                                isActive={index === current}
                                hasUserInteracted={hasUserInteracted}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className='container mt-12 flex justify-end gap-x-4'>
                    <CarouselPrevious
                        onClick={() => {
                            api?.scrollPrev()
                            handleUserInteraction()
                        }}
                        className='static bg-transparent hover:bg-foreground hover:text-background'
                    />
                    <CarouselNext
                        onClick={() => {
                            api?.scrollNext()
                            handleUserInteraction()
                        }}
                        className='static bg-transparent hover:bg-foreground hover:text-background'
                    />
                </div>
            </Carousel>
        </section>
    )
}
