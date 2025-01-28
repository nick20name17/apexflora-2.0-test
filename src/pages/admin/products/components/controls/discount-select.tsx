import { useQuery } from 'react-query'

import { AddDiscountModal } from '../../../discounts/modals'

import { getDiscounts } from '@/api/discounts/discounts'
import { MultiSelect } from '@/components/ui/multi-select'

interface DiscountSelectProps {
    discounts: string[]
    setDiscounts: (discounts: string[]) => void
}
export const DiscountsSelect = ({ discounts, setDiscounts }: DiscountSelectProps) => {
    const { data: discountsData } = useQuery({
        queryKey: ['discounts'],
        queryFn: async () => {
            const res = await getDiscounts({ limit: 100 })
            return res
        }
    })

    const discountsOptions =
        discountsData?.results?.map((discount) => ({
            label: discount.name,
            value: discount.id.toString()
        })) || []

    return (
        <div className='flex items-center gap-x-2'>
            <MultiSelect
                disabled={discountsData?.results?.length === 0}
                modalPopover
                maxCount={1}
                defaultValue={discounts}
                options={discountsOptions}
                onValueChange={setDiscounts}
                placeholder='Оберіть знижки'
                animation={0}
            />
            <AddDiscountModal size='icon' />
        </div>
    )
}
