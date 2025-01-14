import { useCallback, useEffect, useState } from 'react'

import { DualSlider } from './dual-slider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface DualSliderProps extends React.ComponentProps<typeof DualSlider> {
    min: number
    max: number
    value: number[]
    setValue: (value: number[]) => void
}

export const DualSliderWithInputs = ({
    min,
    max,
    value,
    setValue,
    minStepsBetweenThumbs,
    className,
    step
}: DualSliderProps) => {
    const [localMin, setLocalMin] = useState<number>(value[0])
    const [localMax, setLocalMax] = useState<number>(value[1])

    useEffect(() => {
        setLocalMin(value[0])
        setLocalMax(value[1])
    }, [value])

    const validateInput = useCallback(
        (val: number, isMin: boolean): boolean => {
            if (isMin) {
                return val >= min && val < localMax && val % step === 0
            } else {
                return val <= max && val > localMin && val % step === 0
            }
        },
        [min, max, localMin, localMax, step]
    )

    const handleSliderChange = useCallback((newValues: number[]) => {
        setLocalMin(newValues[0])
        setLocalMax(newValues[1])
    }, [])

    const handleInputChange = useCallback((val: string, isMin: boolean) => {
        const numVal = Number(val)
        if (isMin) {
            setLocalMin(numVal)
        } else {
            setLocalMax(numVal)
        }
    }, [])

    const handleSubmit = useCallback(() => {
        if (validateInput(localMin, true) && validateInput(localMax, false)) {
            setValue([localMin, localMax])
        }
    }, [localMin, localMax, setValue, validateInput])

    const isSubmitDisabled =
        !validateInput(localMin, true) || !validateInput(localMax, false)

    return (
        <div className={cn(className)}>
            <DualSlider
                min={min}
                max={max}
                step={step}
                minStepsBetweenThumbs={minStepsBetweenThumbs}
                value={[localMin, localMax]}
                onValueChange={handleSliderChange}
                formatLabel={() => ''}
            />
            <div className='mt-2 flex items-center gap-x-2'>
                <Input
                    type='number'
                    value={localMin}
                    onChange={(e) => handleInputChange(e.target.value, true)}
                    className={cn(
                        'h-10 w-16 flex-1',
                        !validateInput(localMin, true) && 'pointer-events-none opacity-50'
                    )}
                    min={min}
                    max={localMax - step}
                    step={step}
                />
                <Input
                    type='number'
                    value={localMax}
                    onChange={(e) => handleInputChange(e.target.value, false)}
                    className={cn(
                        'h-10 w-16 flex-1',
                        !validateInput(localMax, false) &&
                            'pointer-events-none opacity-50'
                    )}
                    min={localMin + step}
                    max={max}
                    step={step}
                />
                <Button
                    onClick={handleSubmit}
                    size='icon'
                    className='transition-opacity'
                    disabled={isSubmitDisabled}
                >
                    Ок
                </Button>
            </div>
        </div>
    )
}
