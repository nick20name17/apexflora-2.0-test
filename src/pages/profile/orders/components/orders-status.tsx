import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface OrdersStatusProps {
    status: 'orders' | 'pre-orders'
    onStatusChange: (status: 'orders' | 'pre-orders') => void
    setOffset: (offset: number) => void
}

export const OrdersStatus = ({
    onStatusChange,
    status,
    setOffset
}: OrdersStatusProps) => {
    const handleStatusChange = (status: string) => {
        onStatusChange(status as 'orders' | 'pre-orders')
        setOffset(0)
    }
    return (
        <Tabs
            className='mt-4 w-full'
            defaultValue={status}
            onValueChange={handleStatusChange}
        >
            <TabsList className='h-11 w-full bg-secondary p-0'>
                <TabsTrigger
                    className='h-full flex-1 text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='orders'
                >
                    Історія замовлень
                </TabsTrigger>
                <TabsTrigger
                    className='h-full flex-1 text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='pre-orders'
                >
                    Мої передзамовлення
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
