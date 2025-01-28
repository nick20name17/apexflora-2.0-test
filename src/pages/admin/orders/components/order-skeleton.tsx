import { Skeleton } from '@/components/ui/skeleton'

export const OrderCardSkeleton = () => {
    return (
        <div className='grid grid-cols-1 gap-2'>
            {Array.from({ length: 10 }).map((_, index) => (
                <div
                    key={index}
                    className='flex h-20 items-center justify-center rounded-md'
                >
                    <Skeleton className='h-full w-full rounded-sm object-cover' />
                </div>
            ))}
        </div>
    )
}
