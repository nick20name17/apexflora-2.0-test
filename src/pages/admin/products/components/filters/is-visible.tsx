import { useQueryState } from 'nuqs'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

const VISIBILITY_OPTIONS = {
    ALL: 'all',
    VISIBLE: 'visible',
    HIDDEN: 'hidden'
} as const

type VisibilityOption = (typeof VISIBILITY_OPTIONS)[keyof typeof VISIBILITY_OPTIONS]

const VISIBILITY_ITEMS = [
    { value: VISIBILITY_OPTIONS.ALL, label: 'Усі товари' },
    { value: VISIBILITY_OPTIONS.VISIBLE, label: 'Видимі товари' },
    { value: VISIBILITY_OPTIONS.HIDDEN, label: 'Приховані товари' }
] as const

export const IsVisibleFilter = () => {
    const [visibility, setVisibility] = useQueryState('is-visible', {
        defaultValue: VISIBILITY_OPTIONS.ALL,
        parse: (value: string | null): VisibilityOption => {
            if (!value) return VISIBILITY_OPTIONS.ALL
            if (value === VISIBILITY_OPTIONS.VISIBLE) return VISIBILITY_OPTIONS.VISIBLE
            if (value === VISIBILITY_OPTIONS.HIDDEN) return VISIBILITY_OPTIONS.HIDDEN
            return VISIBILITY_OPTIONS.ALL
        },
        serialize: (value: VisibilityOption): string => value
    })

    const handleVisibilityChange = (value: VisibilityOption) => {
        setVisibility(value)
    }

    return (
        <div>
            <label
                htmlFor='is-visible'
                className='text-xs'
            >
                Видимі / Приховані
            </label>
            <Select
                value={visibility}
                onValueChange={handleVisibilityChange}
            >
                <SelectTrigger id='is-visible'>
                    <SelectValue placeholder='Оберіть видимість товарів' />
                </SelectTrigger>
                <SelectContent>
                    {VISIBILITY_ITEMS.map(({ value, label }) => (
                        <SelectItem
                            key={value}
                            value={value}
                        >
                            {label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default IsVisibleFilter
