import { useQuery } from 'react-query'

import { DataPageLayout } from '../components/data-page-layout'
import { DataTable } from '../components/table'

import { getBonusLimits } from '@/api/bonuses/bonuses'
import { defaultLimit } from '@/constants/table'
import { columns } from './components/columns'
import { AddBonusLimitModal } from './components/modals'

const BonusLimitsPage = () => {
    const { data: bonusesLimits, isLoading } = useQuery({
        queryKey: ['bonuses-limits'],
        queryFn: async () => {
            const res = await getBonusLimits({
                limit: defaultLimit
            })
            return res
        }
    })

    return (
        <DataPageLayout
            title='Бонусні ліміти'
            count={bonusesLimits?.count}
            isLoading={isLoading}
            actionComponent={<AddBonusLimitModal />}
        >
            <DataTable
                columns={columns}
                data={bonusesLimits?.results || []}
                isLoading={isLoading}
            />
        </DataPageLayout>
    )
}

export default BonusLimitsPage
