import { useQueryState } from 'nuqs'
import { useQuery } from 'react-query'

import { DataPageLayout } from '../components/data-page-layout'
import { DataTable } from '../components/table'
import { RoleFilter } from '../users/components/filters/role-filter'

import { columns } from './components/columns'
import { getDeletedUsers } from '@/api/users/users'
import { SearchBar } from '@/components/search-bar'
import { defaultLimit } from '@/constants/table'

const ArchivePage = () => {
    const [search] = useQueryState('search', {
        defaultValue: ''
    })

    const [role] = useQueryState('role', {
        defaultValue: 'all'
    })

    const [limit] = useQueryState('limit', {
        parse: Number,
        defaultValue: defaultLimit
    })

    const [offset] = useQueryState('offset', {
        parse: Number,
        defaultValue: 0
    })

    const queryParams = {
        search: search || undefined,
        limit,
        offset,
        role: role === 'all' ? undefined : role || undefined
    }

    const { data, isLoading } = useQuery({
        queryKey: [
            'users',
            queryParams.search,
            queryParams.limit,
            queryParams.offset,
            queryParams.role
        ],
        queryFn: async () => getDeletedUsers(queryParams)
    })

    return (
        <>
            <DataPageLayout
                title='Архів Користувачів'
                count={data?.count}
                isLoading={isLoading}
                filterComponent={
                    <div className='flex items-center gap-2 max-md:flex-col'>
                        <SearchBar className='max-md:w-full md:flex-1' />
                        <RoleFilter className='max-md:w-full' />
                    </div>
                }
            >
                <DataTable
                    columns={columns}
                    data={data?.results || []}
                    isLoading={isLoading}
                    dataCount={data?.count}
                />
            </DataPageLayout>
        </>
    )
}

export default ArchivePage
