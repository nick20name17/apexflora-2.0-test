import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

interface StoryProps {
    videoSrc: string
    isActive: boolean
}

export const Story = ({ videoSrc, isActive }: StoryProps) => {
    const [progress, setProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        if (!isActive && videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
            setProgress(0)
            setIsPlaying(false)
        }
    }, [isActive])

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isPlaying && videoRef.current) {
            interval = setInterval(() => {
                const currentTime = videoRef.current?.currentTime || 0
                setProgress((currentTime / duration) * 100)
            }, 100)
        }
        return () => clearInterval(interval)
    }, [isPlaying, duration])

    const togglePlay = () => {
        if (!videoRef.current || !isActive) return

        if (isPlaying) {
            videoRef.current.pause()
            setIsPlaying(false)
        } else {
            videoRef.current.play()
            setIsPlaying(true)
        }
    }

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration)
        }
    }

    return (
        <div
            className={cn(
                'relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-lg bg-muted transition-all duration-300',
                isActive ? 'scale-100' : 'scale-90'
            )}
        >
            <div className='absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/60 to-transparent'></div>
            <div className='absolute left-4 right-4 top-4 z-20'>
                <div className='h-1 w-full overflow-hidden rounded-full bg-background/20'>
                    <div
                        className='h-full bg-background transition-all duration-100 ease-linear'
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <Link
                to='https://www.instagram.com/apexflora.ua/'
                target='_blank'
                className='absolute left-4 top-8 z-20 flex items-center'
            >
                <div className='grid size-8 place-items-center rounded-full bg-background'>
                    <svg
                        className='size-4'
                        viewBox='0 0 109 111'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M0.340088 0.439941C28.0001 0.43994 50.4601 22.8999 50.4601 50.5599L50.4601 110.52C22.8001 110.52 0.340092 88.0599 0.340091 60.3999L0.340088 0.439941Z'
                            fill='#C4DD00'
                        />
                        <path
                            d='M108.62 0.449949L108.62 60.4099C108.62 88.0699 86.16 110.53 58.5 110.53L58.5 50.57C58.5 22.91 80.96 0.44995 108.62 0.449949Z'
                            fill='#C4DD00'
                        />
                    </svg>
                </div>
                <span className='ml-2 text-background'>apexflora.ua</span>
            </Link>

            <video
                ref={videoRef}
                src={videoSrc}
                className='h-full w-full object-cover'
                loop
                onLoadedMetadata={handleLoadedMetadata}
            />

            <div className='absolute inset-0 flex items-center justify-center'>
                <button
                    onClick={togglePlay}
                    className='rounded-full bg-background/60 bg-opacity-50 p-4 text-background backdrop-blur-xs [&>svg]:size-6'
                >
                    {isPlaying ? <Pause /> : <Play />}
                </button>
            </div>
        </div>
    )
}
