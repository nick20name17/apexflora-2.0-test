import { useQueryState } from 'nuqs'

import type { Color } from '@/api/colors/colors.types'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export const ColorsFilter = ({ colors }: { colors: Color[] }) => {
    const [colorsParam, setColorsParam] = useQueryState('colors', {
        defaultValue: ''
    })

    const [, setOffset] = useQueryState('offset', { defaultValue: 0, parse: Number })

    const selectedColors = colorsParam ? colorsParam.split(',') : []

    const onColorChange = (color: number) => {
        let updatedColors = [...selectedColors]

        if (updatedColors.includes(color.toString())) {
            updatedColors = updatedColors.filter((c) => c !== color.toString())
        } else {
            updatedColors.push(color.toString())
        }

        setColorsParam(updatedColors.length > 0 ? updatedColors.join(',') : null)
        setOffset(0)
    }

    return (
        <>
            {colors?.map((color) => (
                <div
                    key={color.id}
                    className='flex items-center gap-x-3'
                >
                    <Checkbox
                        id={color.id.toString()}
                        checked={selectedColors.includes(color.id.toString())}
                        onCheckedChange={() => onColorChange(color.id)}
                    />
                    <Label
                        htmlFor={color.id.toString()}
                        className='flex items-center gap-x-1.5'
                    >
                        <div
                            className='size-4 rounded-full border'
                            style={{ backgroundColor: color.hex }}
                        ></div>
                        {color.name}
                    </Label>
                </div>
            ))}
        </>
    )
}
