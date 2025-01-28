import type React from 'react'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

import type { ButtonProps } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const useForwardedRef = <T,>(ref: React.ForwardedRef<T>) => {
    const innerRef = useRef<T>(null)

    useEffect(() => {
        if (!ref) return
        if (typeof ref === 'function') {
            ref(innerRef.current)
        } else {
            ref.current = innerRef.current
        }
    })

    return innerRef
}

interface ColorPickerProps {
    value: string
    onChange: (value: string) => void
    onBlur?: () => void
}

const ColorPicker = forwardRef<
    HTMLInputElement,
    Omit<ButtonProps, 'value' | 'onChange' | 'onBlur'> & ColorPickerProps
>(({ disabled, value, onChange, onBlur, name, className, ...props }, forwardedRef) => {
    const ref = useForwardedRef(forwardedRef)
    const [open, setOpen] = useState(false)

    const parsedValue = useMemo(() => {
        return value || '#FFFFFF'
    }, [value])

    return (
        <div className='flex items-center gap-x-2'>
            <Popover
                modal
                onOpenChange={setOpen}
                open={open}
            >
                <PopoverTrigger
                    asChild
                    disabled={disabled}
                    onBlur={onBlur}
                >
                    <Button
                        {...props}
                        className={cn('block', className)}
                        name={name}
                        onClick={() => {
                            setOpen(true)
                        }}
                        size='icon'
                        style={{
                            backgroundColor: parsedValue
                        }}
                        variant='outline'
                    >
                        <div className='size-10' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-fit'>
                    <HexColorPicker
                        className='size-10'
                        color={parsedValue}
                        onChange={onChange}
                    />
                </PopoverContent>
            </Popover>
            <Input
                className='w-28'
                maxLength={7}
                onChange={(e) => {
                    onChange(e?.currentTarget?.value)
                }}
                ref={ref}
                value={parsedValue}
            />
        </div>
    )
})
ColorPicker.displayName = 'ColorPicker'

export { ColorPicker }
