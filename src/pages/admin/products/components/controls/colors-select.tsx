import { useQuery } from 'react-query'

import { AddColorModal } from '../../../colors/components/modals'

import { getAllColors } from '@/api/colors/colors'
import { MultiSelect } from '@/components/ui/multi-select'

interface ColorSelectProps {
    colors: string[]
    setColors: (colors: string[]) => void
    setOffset?: React.Dispatch<React.SetStateAction<number>>
    withAdd?: boolean
}
export const ColorsSelect = ({
    colors,
    setColors,
    setOffset,
    withAdd = true
}: ColorSelectProps) => {
    const { data: colorsData } = useQuery({
        queryKey: ['colors'],
        queryFn: async () => {
            const res = await getAllColors({})
            return res
        }
    })

    const colorsOptions =
        colorsData?.map((color) => ({
            label: color.name,
            value: color.id.toString()
        })) || []

    const handleColorsChange = (value: string[]) => {
        setColors(value)
        setOffset?.(0)
    }

    return (
        <div className='flex items-center gap-x-2'>
            <MultiSelect
                modalPopover
                maxCount={1}
                defaultValue={colors}
                options={colorsOptions}
                onValueChange={handleColorsChange}
                placeholder='Оберіть кольори'
                animation={0}
            />
            {withAdd ? <AddColorModal size='icon' /> : null}
        </div>
    )
}
