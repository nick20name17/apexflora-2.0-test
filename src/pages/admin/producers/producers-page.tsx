import { useQueryState } from 'nuqs'
import { useQuery } from 'react-query'

import { DataPageLayout } from '../components/data-page-layout'
import { DataTable } from '../components/table'

import { columns } from './columns'
import { AddProducerModal } from './modals'
import { getProducers } from '@/api/producers/producers'
import { SearchBar } from '@/components/search-bar'
import { defaultLimit } from '@/constants/table'

const ProducersPage = () => {
    const [search] = useQueryState('search', {
        defaultValue: ''
    })

    const [limit] = useQueryState('limit', {
        parse: Number,
        defaultValue: defaultLimit
    })

    const [offset] = useQueryState('offset', {
        parse: Number,
        defaultValue: 0
    })

    const { data, isLoading } = useQuery({
        queryKey: ['producers', search, limit, offset],
        queryFn: () => getProducers({ limit, offset, search })
    })

    return (
        <>
            <DataPageLayout
                title='Виробники'
                count={data?.count}
                isLoading={isLoading}
                actionComponent={<AddProducerModal />}
                searchBar={<SearchBar />}
            >
                <DataTable
                    dataCount={data?.count}
                    columns={columns}
                    data={data?.results || []}
                    isLoading={isLoading}
                />
            </DataPageLayout>
        </>
    )
}

export default ProducersPage
