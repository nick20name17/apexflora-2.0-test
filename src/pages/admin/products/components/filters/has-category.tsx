import { useQueryState } from 'nuqs'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export const HasCategorysFilter = () => {
    const [hasCategory, setHasCategory] = useQueryState('has-category', {
        parse: (value: string) => {
            return value === 'all' ? null : value === 'has-category' ? true : false
        }
    })

    const handleHasCategoryChange = (hasCategory: string) => {
        if (hasCategory === 'all') {
            setHasCategory(null)
        } else {
            setHasCategory(hasCategory === 'has-category' ? true : false)
        }
    }

    return (
        <div>
            <label
                htmlFor='has-category'
                className='text-xs'
            >
                З категорією. / Без категорії.
            </label>
            <Select
                value={
                    hasCategory === true
                        ? 'has-category'
                        : hasCategory === false
                          ? 'no-category'
                          : 'all'
                }
                onValueChange={handleHasCategoryChange}
            >
                <SelectTrigger
                    className='text-left'
                    id='has-category'
                >
                    <SelectValue placeholder='Оберіть наявність зображення' />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='all'>Усі товари</SelectItem>
                    <SelectItem value='has-category'>Товари з категорією</SelectItem>
                    <SelectItem value='no-category'>Товари без категорії</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
