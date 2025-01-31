import { CardPos, Clock } from 'iconsax-react'
import { useQueryState } from 'nuqs'
import { useQuery } from 'react-query'

import { DeliveryIcon } from './icons'
import { getStatusProducts } from '@/api/status-products/status-products'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export const getStatusProductsDisplay = (status: number) => {
    switch (status) {
        case 1:
            return {
                name: 'В дорозі',
                icon: <DeliveryIcon className='size-4' />
            }
        case 2:
            return {
                name: 'В наявності',
                icon: <CardPos className='size-4' />
            }
        case 3:
            return {
                name: 'Передзамовлення',
                icon: <Clock className='size-4' />
            }
        default:
            return {
                name: 'В дорозі',
                icon: <DeliveryIcon className='size-4' />
            }
    }
}

interface StatusTabsProps {
    className?: string
}

export const StatusTabs = ({ className }: StatusTabsProps) => {
    const { data: statusProducts, isLoading } = useQuery({
        queryKey: ['statusProducts'],
        queryFn: async () => {
            const res = await getStatusProducts({})

            return res.results
        }
    })

    const [, setPrice] = useQueryState('price')
    const [, setHeight] = useQueryState('height')

    const [, setOffset] = useQueryState('offset', { defaultValue: 0, parse: Number })

    const [status, setStatus] = useQueryState('status', {
        defaultValue: '2'
    })

    if (isLoading) {
        return <Skeleton className={cn('h-12 w-full', className)} />
    }

    const handleStatusChange = (status: string) => {
        setStatus(status)
        setPrice(null)
        setHeight(null)
        setOffset(0)
    }

    return (
        <Tabs
            className={cn(className)}
            id='statuses'
            defaultValue={status!}
            onValueChange={handleStatusChange}
        >
            <TabsList className='h-16 w-full bg-transparent py-0 md:h-12'>
                {statusProducts?.map((statusProduct) => {
                    const { name, icon } = getStatusProductsDisplay(statusProduct.id)

                    return (
                        <TabsTrigger
                            key={statusProduct.id}
                            className='flex h-full flex-1 items-center gap-1 rounded-b-none leading-tight max-sm:flex-col max-sm:px-2 md:gap-x-2'
                            value={statusProduct.id.toString()}
                        >
                            <span> {icon}</span>
                            <span className='text-xs md:text-sm'>{name}</span>
                        </TabsTrigger>
                    )
                })}
            </TabsList>
        </Tabs>
    )
}
