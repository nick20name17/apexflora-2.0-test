import { ActiveFilter } from './active-filter'
import { RoleFilter } from './role-filter'
import { SearchBar } from '@/components/search-bar'

export const FiltersBar = () => {
    return (
        <div className='flex gap-2 max-md:flex-col md:items-center'>
            <SearchBar className='max-md:w-full md:flex-1' />
            <ActiveFilter />
            <RoleFilter className='max-md:w-full' />
        </div>
    )
}
