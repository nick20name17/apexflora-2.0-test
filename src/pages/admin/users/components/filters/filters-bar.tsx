import { SearchBar } from '@/components/search-bar'
import { ActiveFilter } from './active-filter'
import { RoleFilter } from './role-filter'

export const FiltersBar = () => {
    return (
        <div className='flex md:items-center gap-2 max-md:flex-col'>
            <SearchBar className='md:flex-1 max-md:w-full' />
            <ActiveFilter />
            <RoleFilter className='max-md:w-full' />
        </div>
    )
}
