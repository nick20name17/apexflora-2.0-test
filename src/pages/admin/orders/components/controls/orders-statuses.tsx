'use client'

import { useQueryState } from 'nuqs'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const OrderStatuses = () => {
    const [status, setStatus] = useQueryState('status', {
        defaultValue: 'orders'
    })

    const [, setOffset] = useQueryState('offset', {
        parse: Number,
        defaultValue: 0
    })

    const [, setAllPreorders] = useQueryState('all-preorders', {
        parse: Boolean,
        defaultValue: false
    })

    const handleStatusChange = (status: string) => {
        if (status !== 'pre-orders') {
            setAllPreorders(null)
        }
        setStatus(status)
        setOffset(0)
    }

    return (
        <Tabs
            className='w-full'
            defaultValue={status}
            onValueChange={handleStatusChange}
        >
            <TabsList className='h-10 w-full bg-transparent max-md:h-auto max-md:flex-col max-md:border md:h-12 md:bg-secondary'>
                <TabsTrigger
                    className='h-10 text-primary data-[state=active]:bg-primary data-[state=active]:text-background max-md:w-full max-md:justify-start md:h-full md:flex-1'
                    value='orders'
                >
                    Замовлення
                </TabsTrigger>
                <TabsTrigger
                    className='h-10 text-primary data-[state=active]:bg-primary data-[state=active]:text-background max-md:w-full max-md:justify-start md:h-full md:flex-1'
                    value='pre-orders'
                >
                    Передзамовлення
                </TabsTrigger>
                <TabsTrigger
                    className='h-10 text-primary data-[state=active]:bg-primary data-[state=active]:text-background max-md:w-full max-md:justify-start md:h-full md:flex-1'
                    value='supplier'
                >
                    Надхоження
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
