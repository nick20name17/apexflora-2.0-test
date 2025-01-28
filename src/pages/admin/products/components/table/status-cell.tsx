import { useMutation, useQueryClient } from 'react-query'

import { patchStock } from '@/api/stock/stock'
import type { Stock, StocksPayload } from '@/api/stock/stock.types'
import { Switch } from '@/components/ui/switch'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'

interface StatusCellProps {
    stocks: Stock[]
}
export const StatusCell = ({ stocks }: StatusCellProps) => {
    const { currentStock } = useCatalogueOperations({
        stocks
    })

    const queryClient = useQueryClient()

    const patchStockMutation = useMutation({
        mutationFn: ({
            id,
            payload
        }: {
            id: number
            payload: Partial<StocksPayload>
        }) => {
            return patchStock(id, {
                is_visible: payload.is_visible
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
                        is_visible: checked
                    }
                })
            }}
            defaultChecked={currentStock?.is_visible}
        />
    )
}
