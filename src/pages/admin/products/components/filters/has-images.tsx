import { useQueryState } from 'nuqs'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export const HasImagesFilter = () => {
    const [hasImage, setHasImage] = useQueryState('has-image', {
        parse: (value: string) => {
            return value === 'all' ? null : value === 'has-image' ? true : false
        }
    })

    const handleHasImageChange = (hasImage: string) => {
        if (hasImage === 'all') {
            setHasImage(null)
        } else {
            setHasImage(hasImage === 'has-image' ? true : false)
        }
    }

    return (
        <div>
            <label
                htmlFor='has-image'
                className='text-xs'
            >
                З зображ. / Без зображ.
            </label>
            <Select
                value={
                    hasImage === true
                        ? 'has-image'
                        : hasImage === false
                          ? 'no-image'
                          : 'all'
                }
                onValueChange={handleHasImageChange}
            >
                <SelectTrigger
                    className='text-left'
                    id='has-image'
                >
                    <SelectValue placeholder='Оберіть наявність зображення' />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='all'>Усі товари</SelectItem>
                    <SelectItem value='has-image'>Товари з зображенням</SelectItem>
                    <SelectItem value='no-image'>Товари без зображення</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
