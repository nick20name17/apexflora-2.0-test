import { useQueryState } from 'nuqs'
import { useQuery } from 'react-query'

import { DataPageLayout } from '../components/data-page-layout'
import { DataTable } from '../components/table'

import { columns } from './components/columns'
import { AddColorModal } from './components/modals'
import { getAllColors } from '@/api/colors/colors'
import { SearchBar } from '@/components/search-bar'

const ColorsPage = () => {
    const [search] = useQueryState('search', {
        defaultValue: ''
    })

    const { data, isLoading } = useQuery({
        queryKey: ['colors', search],
        queryFn: async () => {
            const res = await getAllColors({
                search: search
            })
            return res
        }
    })

    return (
        <DataPageLayout
            title='Кольори'
            count={data?.length}
            isLoading={isLoading}
            actionComponent={<AddColorModal />}
            searchBar={<SearchBar />}
        >
            <DataTable
                columns={columns}
                data={data || []}
                isLoading={isLoading}
            />
        </DataPageLayout>
    )
}

export default ColorsPage
