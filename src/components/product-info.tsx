import { DiametrIcon, HeightIcon, WeightIcon } from '@/components/icons'

export const WeighDiameterInfo = ({
    weight,
    diameter
}: {
    weight: number
    diameter: number
}) => {
    return (
        <div className='flex items-center gap-x-1 text-sm'>
            <div className='flex items-center gap-x-0.5'>
                <WeightIcon className='size-5 text-muted-foreground' />
                {weight ?? '-'}
            </div>
            <div className='flex items-center gap-x-0.5'>
                <DiametrIcon className='size-5 text-muted-foreground' />
                {diameter ?? '-'}
            </div>
        </div>
    )
}

export const HeightInfo = ({ height }: { height: number }) => {
    return (
        <div className='flex items-center gap-x-0.5'>
            <HeightIcon className='size-5 text-muted-foreground' />
            <span className='text-sm'> {height ?? '-'}см</span>
        </div>
    )
}
