import { useQueryState } from 'nuqs'

import { AllPreOrdersSwitch } from './all-preorders-switch'
import { OrderStatuses } from './orders-statuses'
import { SearchBar } from '@/components/search-bar'

export const FiltersBar = () => {
    const [status] = useQueryState('status', {
        defaultValue: 'orders'
    })
    return (
        <div>
            <div className='flex flex-col gap-2'>
                <SearchBar />
                <OrderStatuses />
            </div>
            <div className='mt-2'>
                {status === 'pre-orders' ? <AllPreOrdersSwitch /> : null}
            </div>
        </div>
    )
}
