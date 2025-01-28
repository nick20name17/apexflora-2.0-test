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
    setOrdering: (ordering: string) => void
    ordering: string
}

export const AdminOrderingFilter = ({
    className,
    setOrdering,
    ordering
}: OrderingFilterProps) => {
    return (
        <Select
            defaultValue={ordering}
            onValueChange={setOrdering}
        >
            <SelectTrigger className={cn('h-12 w-44', className)}>
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
