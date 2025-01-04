import { useQueryState } from 'nuqs'

import { DualSliderWithInputs } from '@/components/ui/dual-slider-with-inputs'
import { Skeleton } from '@/components/ui/skeleton'

interface PriceFilterProps {
    minRetailPrice: number
    maxRetailPrice: number
}

export const PriceFilter = ({ minRetailPrice, maxRetailPrice }: PriceFilterProps) => {
    const [priceParam, setPriceParam] = useQueryState('price', {
        defaultValue: `${minRetailPrice},${maxRetailPrice}`
    })

    const [, setOffset] = useQueryState('offset', { defaultValue: 0, parse: Number })

    const onPriceChange = (price: number[]) => {
        setPriceParam(`${price[0]},${price[1]}`)
        setOffset(0)
    }

    if (minRetailPrice === undefined || maxRetailPrice === undefined) {
        return <Skeleton className='mt-2 h-14 w-full' />
    }

    return (
        <DualSliderWithInputs
            className='mt-2 pl-2'
            key={priceParam}
            minStepsBetweenThumbs={1}
            step={1}
            max={maxRetailPrice}
            min={minRetailPrice}
            value={priceParam?.split(',').map((value) => +value)}
            setValue={onPriceChange}
        />
    )
}
