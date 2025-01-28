import { useQueryState } from 'nuqs'
import { useQuery } from 'react-query'

import { DataPageLayout } from '../components/data-page-layout'
import { DataTable } from '../components/table'

import { columns } from './components/columns'
import { getContacts } from '@/api/contacts/contacts'
import { SearchBar } from '@/components/search-bar'
import { defaultLimit } from '@/constants/table'

const ContactsPage = () => {
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
        queryKey: ['contacts', search, limit, offset],
        queryFn: () => getContacts({ limit, offset, search })
    })

    return (
        <>
            <DataPageLayout
                title='Зворотній зв’язок'
                count={data?.count}
                isLoading={isLoading}
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

export default ContactsPage
