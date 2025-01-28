import { ActiveFilter } from './active-filter'
import { RoleFilter } from './role-filter'
import { SearchBar } from '@/components/search-bar'

export const FiltersBar = () => {
    return (
        <div className='flex items-center gap-x-2'>
            <SearchBar className='flex-1' />
            <ActiveFilter />
            <RoleFilter />
        </div>
    )
}
