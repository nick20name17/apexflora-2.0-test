import { CategoryFilter } from './category'
import { HasCategorysFilter } from './has-category'
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
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1.25fr,repeat(5,1fr)]'>
                <div className='w-full'>
                    <CategoryFilter />
                </div>
                <div className='w-full'>
                    <HasCategorysFilter />
                </div>
                <div className='w-full'>
                    <HasImagesFilter />
                </div>
                <div className='w-full'>
                    <PromoFilter />
                </div>
                <div className='w-full'>
                    <HasCode1cFilter />
                </div>
                <div className='w-full'>
                    <IsVisibleFilter />
                </div>
            </div>
            <StatusTabs className='w-full border-b' />
        </div>
    )
}
