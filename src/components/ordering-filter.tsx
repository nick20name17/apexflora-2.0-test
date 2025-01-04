import { useQueryState } from 'nuqs'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface OrderingFilterProps {
    className?: string
}

export const OrderingFilter = ({ className }: OrderingFilterProps) => {
    const [ordering, setOrdering] = useQueryState('ordering', {
        defaultValue: 'name'
    })

    return (
        <Select
            defaultValue={ordering}
            onValueChange={setOrdering}
        >
            <SelectTrigger className={cn('w-44', className)}>
                <SelectValue placeholder='Оберіть сортування' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='name'>За назвою (А-Я)</SelectItem>
                <SelectItem value='-name'>За назвою (Я-А)</SelectItem>
                <SelectItem value='category'>За категорією</SelectItem>
                <SelectItem value='price'>Найдорожчі</SelectItem>
                <SelectItem value='-price'>Найдешевші</SelectItem>
            </SelectContent>
        </Select>
    )
}
