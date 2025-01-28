import { useQueryState } from 'nuqs'
import { useQuery } from 'react-query'

import { DataPageLayout } from '../components/data-page-layout'
import { DataTable } from '../components/table'

import { columns } from './components/columns'
import { AddCategoryModal } from './components/modals'
import { getCategories } from '@/api/categories/categories'
import { SearchBar } from '@/components/search-bar'
import { defaultLimit } from '@/constants/table'

const CategoriesPage = () => {
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
        queryKey: ['categories', search, limit, offset],
        queryFn: () => getCategories({ limit, offset, search })
    })

    return (
        <>
            <DataPageLayout
                title='Категорії'
                count={data?.count}
                isLoading={isLoading}
                actionComponent={<AddCategoryModal />}
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

export default CategoriesPage
