import { useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { patchStock } from '@/api/stock/stock'
import type { Stock, StocksPayload } from '@/api/stock/stock.types'
import { Input } from '@/components/ui/input'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'
import { cn } from '@/lib/utils'
import { ApproveCell } from './approve-cell'

interface PriceCellProps {
    stocks: Stock[]
    className?: string
}

export const PriceCell = ({ stocks, className }: PriceCellProps) => {
    const { currentStock } = useCatalogueOperations({
        stocks
    })

    const queryClient = useQueryClient()

    const [value, setValue] = useState(currentStock?.retail_price)
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const patchStockMutation = useMutation({
        mutationFn: ({
            id,
            payload
        }: {
            id: number
            payload: Partial<StocksPayload>
        }) => {
            return patchStock(id, {
                ...payload,
                retail_price: payload.retail_price
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries('shop-products')
            setIsFocused(false)
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/[^\d.]/g, '')

        const parts = inputValue.split('.')
        if (parts.length > 2) return

        if (parts[1] && parts[1].length > 2) return

        const formattedValue =
            parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
            (parts[1] ? '.' + parts[1] : '')

        setValue(+formattedValue)
    }

    const handleCancel = () => {
        setIsFocused(false)
        inputRef.current?.blur()
    }

    return (
        <>
            <div
                className={cn('relative w-full text-primary', className)}
                key={currentStock?.retail_price}
            >
                <span className='text-gray-500 absolute left-2 top-1/2 -translate-y-1/2 transform'>
                    ₴
                </span>
                <Input
                    ref={inputRef}
                    type='text'
                    className='h-10 md:h-9 pl-5 pr-2'
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    placeholder='0.00'
                />
            </div>
            <ApproveCell
                isFocused={isFocused && currentStock?.retail_price !== value}
                handleCancel={handleCancel}
                mutation={patchStockMutation}
                payload={{
                    id: currentStock?.id!,
                    payload: {
                        retail_price: value
                    }
                }}
            />
        </>
    )
}
