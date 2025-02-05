import { SearchBar } from '@/components/search-bar'
import { StatusTabs } from '@/components/status-tabs'
import { CategoryFilter } from './category'
import { HasCode1cFilter } from './has-code-1c'
import { HasImagesFilter } from './has-images'
import { IsVisibleFilter } from './is-visible'
import { PromoFilter } from './promo'

export const FiltersBar = () => {
    return (
        <div className='w-full space-y-3 lg:space-y-5'>
            <SearchBar />
            <div className='flex lg:items-start gap-2 lg:[&>*]:basis-1/5 max-lg:flex-col'>
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
