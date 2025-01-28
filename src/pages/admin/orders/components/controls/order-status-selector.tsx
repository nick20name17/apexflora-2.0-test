import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { type OrderStatuses, orderStatuses } from '@/constants/orders'
import { cn } from '@/lib/utils'
import { getStatusName } from '@/pages/profile/orders/components/order-card'

interface OrderStatusSelectorProps {
    className?: string
    status: OrderStatuses
    onStatusChange: (status: OrderStatuses) => void
}

export const OrderStatusSelector = ({
    className,
    status,
    onStatusChange
}: OrderStatusSelectorProps) => {
    return (
        <Select
            value={status}
            onValueChange={onStatusChange}
        >
            <SelectTrigger
                onClick={(e) => {
                    e.stopPropagation()
                }}
                className={cn('text-left', className)}
            >
                <SelectValue placeholder='Статус замовлення' />
            </SelectTrigger>
            <SelectContent>
                {orderStatuses?.map((orderStatus) => (
                    <SelectItem
                        key={orderStatus}
                        value={orderStatus}
                    >
                        {getStatusName(orderStatus).displayName}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
