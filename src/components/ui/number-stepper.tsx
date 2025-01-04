import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface NumberStepperProps {
    initialValue?: number
    min?: number
    max?: number
    step?: number
    onChange?: (value: number) => void
    className?: string
}

export const NumberStepper = ({
    initialValue = 0,
    min = 0,
    max = 100,
    step = 1,
    onChange,
    className
}: NumberStepperProps) => {
    const [value, setValue] = useState(initialValue)

    const handleIncrement = () => {
        const newValue = Math.min(value + step, max)
        setValue(newValue)
        onChange?.(newValue)
    }

    const handleDecrement = () => {
        const newValue = Math.max(value - step, min)
        setValue(newValue)
        onChange?.(newValue)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.min(Math.max(Number(e.target.value), min), max)
        setValue(newValue)
        onChange?.(newValue)
    }

    return (
        <div className={cn('relative flex items-center', className)}>
            <Button
                variant='ghost'
                size='icon'
                className='absolute bottom-0 left-0 top-0 h-full px-2 hover:bg-transparent'
                onClick={handleDecrement}
                disabled={value <= min}
                aria-label='Decrease value'
            >
                <Minus />
            </Button>
            <Input
                type='number'
                value={value}
                onChange={handleInputChange}
                className='h-10 w-full truncate pl-8 pr-8 text-center focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0'
                min={min}
                max={max}
                step={step}
            />
            <Button
                variant='ghost'
                size='icon'
                className='absolute bottom-0 right-0 top-0 h-full px-2 hover:bg-transparent'
                onClick={handleIncrement}
                disabled={value >= max}
                aria-label='Increase value'
            >
                <Plus />
            </Button>
        </div>
    )
}
