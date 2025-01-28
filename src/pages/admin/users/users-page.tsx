import { useQueryState } from 'nuqs'
import { useQuery } from 'react-query'

import { DataPageLayout } from '../components/data-page-layout'
import { DataTable } from '../components/table'

import { usersColumns } from './components/columns'
import { FiltersBar } from './components/filters/filters-bar'
import { AddUserModal } from './components/modals'
import { getUsers } from '@/api/users/users'
import { defaultLimit } from '@/constants/table'

const UsersPage = () => {
    const [search] = useQueryState('search', {
        defaultValue: ''
    })

    const [role] = useQueryState('role', {
        defaultValue: 'all'
    })
    const [isActive] = useQueryState('is_active', {
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
        is_active: isActive === 'all' ? undefined : isActive === 'active',
        role: role === 'all' ? undefined : role || undefined
    }

    const { data, isLoading } = useQuery({
        queryKey: [
            'users',
            queryParams.search,
            queryParams.limit,
            queryParams.offset,
            queryParams.is_active,
            queryParams.role
        ],
        queryFn: async () => getUsers(queryParams)
    })

    return (
        <DataPageLayout
            title='Користувачі'
            count={data?.count}
            isLoading={isLoading}
            actionComponent={<AddUserModal />}
            filterComponent={<FiltersBar />}
        >
            <DataTable
                columns={usersColumns}
                data={data?.results || []}
                isLoading={isLoading}
                dataCount={data?.count}
            />
        </DataPageLayout>
    )
}

export default UsersPage
