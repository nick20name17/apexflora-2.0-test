import { useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { ApproveCell } from './approve-cell'
import { patchShopProducts } from '@/api/shop-products/shop-products'
import type {
    ShopProduct,
    ShopProductsPayload
} from '@/api/shop-products/shop-products.types'
import { Input } from '@/components/ui/input'

interface OriginIdCellProps {
    shopProduct: ShopProduct
}

export const OriginIdCell = ({ shopProduct }: OriginIdCellProps) => {
    const queryClient = useQueryClient()

    const [value, setValue] = useState(shopProduct?.origin_id ?? '')
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
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
            <Input
                className='h-9 px-2'
                ref={inputRef}
                type='number'
                value={value}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                placeholder='0'
            />

            <ApproveCell
                isFocused={isFocused && shopProduct?.origin_id !== value}
                handleCancel={handleCancel}
                mutation={patchShopProductMutation}
                payload={{
                    id: shopProduct?.id!,
                    payload: {
                        origin_id: value
                    }
                }}
            />
        </>
    )
}
