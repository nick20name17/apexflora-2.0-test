import { useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { ApproveCell } from './approve-cell'
import { patchShopProducts } from '@/api/shop-products/shop-products'
import type {
    ShopProduct,
    ShopProductsPayload
} from '@/api/shop-products/shop-products.types'
import { Input } from '@/components/ui/input'

interface HeightCellProps {
    shopProduct: ShopProduct
}

export const HeightCell = ({ shopProduct }: HeightCellProps) => {
    const queryClient = useQueryClient()

    const [value, setValue] = useState(shopProduct?.height ?? '')
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(+e.target.value)
    }

    const handleCancel = () => {
        setIsFocused(false)
        inputRef.current?.blur()
    }

    const patchShopProductMutation = useMutation({
        mutationFn: ({
            id,
            payload
        }: {
            id: number
            payload: Partial<ShopProductsPayload>
        }) => {
            return patchShopProducts(id, {
                ...payload,
                height: payload.height
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries('shop-products')
            setIsFocused(false)
        }
    })

    return (
        <>
            <div className='relative w-full text-primary'>
                <span className='text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 transform bg-background pl-1'>
                    см
                </span>
                <Input
                    className='h-9 px-2'
                    ref={inputRef}
                    type='number'
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    placeholder='0'
                />
            </div>

            <ApproveCell
                isFocused={isFocused && shopProduct?.height !== value}
                handleCancel={handleCancel}
                mutation={patchShopProductMutation}
                payload={{
                    id: shopProduct?.id!,
                    payload: {
                        height: value
                    }
                }}
            />
        </>
    )
}
