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
            <TabsList className='h-12 w-full bg-secondary'>
                <TabsTrigger
                    className='h-full flex-1 text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='orders'
                >
                    Замовлення
                </TabsTrigger>
                <TabsTrigger
                    className='h-full flex-1 text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='pre-orders'
                >
                    Передзамовлення
                </TabsTrigger>
                <TabsTrigger
                    className='h-full flex-1 text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='supplier'
                >
                    Надхоження
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
