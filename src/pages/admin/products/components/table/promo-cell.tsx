import { useMutation, useQueryClient } from 'react-query'

import { patchStock } from '@/api/stock/stock'
import type { Stock } from '@/api/stock/stock.types'
import { Switch } from '@/components/ui/switch'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'

interface PromoCellProps {
    stocks: Stock[]
}
export const PromoCell = ({ stocks }: PromoCellProps) => {
    const { currentStock } = useCatalogueOperations({
        stocks
    })

    const queryClient = useQueryClient()

    const patchStockMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: Partial<Stock> }) => {
            return patchStock(id, {
                promotion: payload.promotion
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries('shop-products')
        }
    })

    return (
        <Switch
            onCheckedChange={(checked) => {
                patchStockMutation.mutate({
                    id: currentStock?.id!,
                    payload: {
                        promotion: checked
                    }
                })
            }}
            className='data-[state=checked]:border-highlight data-[state=checked]:bg-highlight'
            defaultChecked={currentStock?.promotion}
        />
    )
}
