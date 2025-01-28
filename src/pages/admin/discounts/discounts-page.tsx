import { useQuery } from 'react-query'

import { DataPageLayout } from '../components/data-page-layout'
import { DataTable } from '../components/table'

import { columns } from './columns'
import { AddDiscountModal } from './modals'
import { getDiscounts } from '@/api/discounts/discounts'
import { defaultLimit } from '@/constants/table'

const DiscountsPage = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['discounts'],
        queryFn: () => getDiscounts({ limit: defaultLimit })
    })

    return (
        <DataPageLayout
            title='Знижки'
            count={data?.count}
            isLoading={isLoading}
            actionComponent={<AddDiscountModal />}
        >
            <DataTable
                columns={columns}
                data={data?.results || []}
                isLoading={isLoading}
            />
        </DataPageLayout>
    )
}

export default DiscountsPage
