import { useQueryState } from 'nuqs'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export const HasCode1cFilter = () => {
    const [hasCode1c, setHasCode1c] = useQueryState('has-code-1c', {
        parse: (value: string) => {
            return value === 'all' ? null : value === 'code' ? true : false
        }
    })

    const handleHasCode1cChange = (hasCode1c: string) => {
        if (hasCode1c === 'all') {
            setHasCode1c(null)
        } else {
            setHasCode1c(hasCode1c === 'code' ? true : false)
        }
    }

    return (
        <div>
            <label
                htmlFor='has-code-1c'
                className='text-xs'
            >
                З кодом 1С / Без коду 1С
            </label>
            <Select
                value={
                    hasCode1c === true ? 'code' : hasCode1c === false ? 'no-code' : 'all'
                }
                onValueChange={handleHasCode1cChange}
            >
                <SelectTrigger id='has-code-1c'>
                    <SelectValue placeholder='Оберіть наявність зображення' />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='all'>Усі товари</SelectItem>
                    <SelectItem value='code'>Товари з кодом 1С</SelectItem>
                    <SelectItem value='no-code'>Товари без коду 1С</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
