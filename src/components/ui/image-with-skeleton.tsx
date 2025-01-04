import { useState } from 'react'

import { Skeleton } from './skeleton'
import { cn } from '@/lib/utils'

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const ImageWithSkeleton = (props: ImageWithSkeletonProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const handleImageLoad = () => {
        setIsLoading(false)
    }

    const handleImageError = () => {
        setIsLoading(false)
        setHasError(true)
    }

    return (
        <>
            {(isLoading || hasError) && <Skeleton className={props.className} />}
            <img
                {...props}
                className={cn(props.className, isLoading || hasError ? 'hidden' : '')}
                onLoad={handleImageLoad}
                onError={handleImageError}
            />
        </>
    )
}

export default ImageWithSkeleton
