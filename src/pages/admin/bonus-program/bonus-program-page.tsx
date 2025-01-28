import { useQuery } from 'react-query'

import { DataPageLayout } from '../components/data-page-layout'
import { DataTable } from '../components/table'

import { columns } from './components/columns'
import { AddBonusProgramModal } from './components/modals'
import { getBonusPrograms } from '@/api/bonuses/bonuses'
import { defaultLimit } from '@/constants/table'

const BonusProgramPage = () => {
    const { data: bonusesPrograms, isLoading } = useQuery({
        queryKey: ['bonuses-programs'],
        queryFn: async () => {
            const res = await getBonusPrograms({
                limit: defaultLimit
            })
            return res
        }
    })

    return (
        <DataPageLayout
            title='Бонусні програми'
            count={bonusesPrograms?.count}
            isLoading={isLoading}
            actionComponent={<AddBonusProgramModal />}
        >
            <DataTable
                columns={columns}
                data={bonusesPrograms?.results || []}
                isLoading={isLoading}
            />
        </DataPageLayout>
    )
}

export default BonusProgramPage
