import { useQueryState } from 'nuqs'

import { DualSliderWithInputs } from '@/components/ui/dual-slider-with-inputs'
import { Skeleton } from '@/components/ui/skeleton'

interface HeightFilterProps {
    minHeight: number
    maxHeight: number
}

export const HeightFilter = ({ minHeight, maxHeight }: HeightFilterProps) => {
    const [heightParam, setHeightParam] = useQueryState('height', {
        defaultValue: `${minHeight},${maxHeight}`
    })

    const [, setOffset] = useQueryState('offset', { defaultValue: 0, parse: Number })

    const onHeightChange = (height: number[]) => {
        setHeightParam(`${height[0]},${height[1]}`)
        setOffset(0)
    }

    if (minHeight === undefined || maxHeight === undefined) {
        return <Skeleton className='mt-2 h-14 w-full' />
    }

    return (
        <DualSliderWithInputs
            className='mt-2 pl-2'
            key={heightParam}
            minStepsBetweenThumbs={1}
            step={1}
            max={maxHeight}
            min={minHeight}
            value={heightParam?.split(',').map((value) => +value)}
            setValue={onHeightChange}
        />
    )
}
