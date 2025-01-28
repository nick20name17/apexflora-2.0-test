import { useQuery } from 'react-query'

import { getStatusProducts } from '@/api/status-products/status-products'
import { getStatusProductsDisplay } from '@/components/status-tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

interface StatusTabsProps {
    className?: string
    setOffset: React.Dispatch<React.SetStateAction<number>>
    status: string
    setStatus: (status: string) => void
}
export const AdminStatusTabs = ({
    className,
    setOffset,
    setStatus,
    status
}: StatusTabsProps) => {
    const { data: statusProducts, isLoading } = useQuery({
        queryKey: ['statusProducts'],
        queryFn: async () => {
            const res = await getStatusProducts({})

            return res.results
        }
    })

    const isMobile = useMediaQuery('(max-width: 640px)')

    if (isLoading) {
        return <Skeleton className={cn('h-12 w-full', className)} />
    }

    const handleStatusChange = (status: string) => {
        setStatus(status)

        setOffset(0)
    }

    return (
        <Tabs
            className={cn(className)}
            id='statuses'
            defaultValue={status!}
            onValueChange={handleStatusChange}
        >
            <TabsList className='h-9 w-full bg-transparent py-0 md:h-12'>
                {statusProducts?.map((statusProduct) => {
                    const { name, icon } = getStatusProductsDisplay(statusProduct.id)

                    return (
                        <TabsTrigger
                            key={statusProduct.id}
                            className='flex h-full flex-1 items-center gap-x-1 rounded-b-none leading-tight max-sm:px-2 md:gap-x-2'
                            value={statusProduct.id.toString()}
                        >
                            <span> {icon}</span>

                            {name === 'Передзамовлення' && isMobile ? (
                                <span className='text-left text-xs md:text-sm'>
                                    Передза <br />
                                    мовлення
                                </span>
                            ) : (
                                <span className='text-xs md:text-sm'>{name}</span>
                            )}
                        </TabsTrigger>
                    )
                })}
            </TabsList>
        </Tabs>
    )
}
