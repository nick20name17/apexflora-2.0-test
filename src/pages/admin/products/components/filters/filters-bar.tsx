import { CategoryFilter } from './category'
import { HasCode1cFilter } from './has-code-1c'
import { HasImagesFilter } from './has-images'
import { IsVisibleFilter } from './is-visible'
import { PromoFilter } from './promo'
import { SearchBar } from '@/components/search-bar'
import { StatusTabs } from '@/components/status-tabs'

export const FiltersBar = () => {
    return (
        <div className='w-full space-y-3 lg:space-y-5'>
            <SearchBar />
            <div className='flex gap-2 max-lg:flex-col lg:items-start lg:[&>*]:basis-1/5'>
                <CategoryFilter />
                <HasImagesFilter />
                <PromoFilter />
                <HasCode1cFilter />
                <IsVisibleFilter />
            </div>
            <StatusTabs className='w-full border-b' />
        </div>
    )
}
