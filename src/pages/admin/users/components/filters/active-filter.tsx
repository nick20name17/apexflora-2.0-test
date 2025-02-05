import { useQueryState } from 'nuqs'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export const ActiveFilter = () => {
    const [isActive, setIsActive] = useQueryState('is_active', {
        defaultValue: 'all'
    })

    return (
        <Select
            defaultValue={isActive!}
            onValueChange={setIsActive}
        >
            <SelectTrigger className='w-60 max-md:w-full'>
                <SelectValue placeholder='Оберіть активність' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='all'>Усі користувачі</SelectItem>
                <SelectItem value='active'>Активні</SelectItem>
                <SelectItem value='unactive'>Неактивні</SelectItem>
            </SelectContent>
        </Select>
    )
}
