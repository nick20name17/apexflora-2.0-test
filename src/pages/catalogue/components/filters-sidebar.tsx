import { useQuery } from 'react-query'

import { getAllCategories } from '@/api/categories/categories'
import { getAllColors } from '@/api/colors/colors'
import { getAllProducers } from '@/api/producers/producers'
import type { MinMaxValues } from '@/api/shop-products/shop-products.types'
import { FilterIcon } from '@/components/icons'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { ActiveFilters } from './active-filters'
import { CategoryFilter } from './filters/category-filter'
import { ColorsFilter } from './filters/color-filter'
import { CountriesFilter } from './filters/country-filter'
import { HeightFilter } from './filters/height-filter'
import { PriceFilter } from './filters/price-filter'

interface FiltersSidebarProps {
    minMaxValues: MinMaxValues
    className?: string
}

export const FiltersSidebar = ({ minMaxValues, className }: FiltersSidebarProps) => {
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () =>
            getAllCategories({
                only_parent: true
            })
    })

    const { data: producers } = useQuery({
        queryKey: ['countries'],
        queryFn: () => getAllProducers({})
    })

    const { data: colors } = useQuery({
        queryKey: ['colors'],
        queryFn: () => getAllColors({})
    })

    return (
        <ScrollArea
            className={cn('h-full w-64 bg-background px-5 py-10', className)}
            id='filters'
        >
            <Accordion
                type='multiple'
                defaultValue={['price', 'height']}
            >
                <AccordionItem
                    className='border-b-0'
                    value='category'
                >
                    <AccordionTrigger className='border-b px-1 pb-2 pt-0 text-primary'>
                        Категорія
                    </AccordionTrigger>
                    <AccordionContent className='space-y-2 px-1 pb-3'>
                        <CategoryFilter categories={categories || []} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='country'>
                    <AccordionTrigger className='px-1 py-3 text-primary'>
                        Країна
                    </AccordionTrigger>
                    <AccordionContent className='space-y-3 px-1 pb-3'>
                        <CountriesFilter producers={producers || []} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='color'>
                    <AccordionTrigger className='px-1 py-3 text-primary'>
                        Колір
                    </AccordionTrigger>
                    <AccordionContent className='space-y-3 px-1 pb-3'>
                        <ColorsFilter colors={colors || []} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='price'>
                    <AccordionTrigger className='px-1 py-3 text-primary'>
                        Ціна за штуку, ₴
                    </AccordionTrigger>
                    <AccordionContent>
                        <PriceFilter
                            minRetailPrice={minMaxValues?.min_retail_price}
                            maxRetailPrice={minMaxValues?.max_retail_price}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='height'>
                    <AccordionTrigger className='px-1 py-3 text-primary'>
                        Висота, см.
                    </AccordionTrigger>
                    <AccordionContent>
                        <HeightFilter
                            minHeight={minMaxValues?.min_height}
                            maxHeight={minMaxValues?.max_height}
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </ScrollArea>
    )
}

interface MobileFiltersSidebar extends FiltersSidebarProps {
    size?: 'icon' | 'lg'
}

export const MobileFiltersSidebar = ({
    minMaxValues,
    className,
    size = 'lg'
}: MobileFiltersSidebar) => {
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () =>
            getAllCategories({
                only_parent: true
            })
    })

    const { data: producers } = useQuery({
        queryKey: ['countries'],
        queryFn: () => getAllProducers({})
    })

    const { data: colors } = useQuery({
        queryKey: ['colors'],
        queryFn: () => getAllColors({})
    })

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    className={cn(
                        'hover:text-background',
                        size === 'lg' && 'justify-start text-left',
                        className
                    )}
                    size={size}
                    variant='outline'
                >
                    <FilterIcon />
                    {size === 'lg' ? <span>Фільтри</span> : null}
                </Button>
            </SheetTrigger>
            <SheetContent
                className='w-fit px-5 py-10'
                side='left'
            >
                <SheetHeader className='sr-only'>
                    <SheetTitle>Фільтри</SheetTitle>
                </SheetHeader>
                <div className='max-h-40 overflow-y-auto'>
                    <ActiveFilters className='w-72' />
                </div>

                <ScrollArea
                    className='mt-2 h-[calc(100vh-60px)] w-72 bg-background'
                    id='filters'
                >
                    <Accordion
                        type='multiple'
                        defaultValue={['price', 'height']}
                    >
                        <AccordionItem
                            className='border-b-0'
                            value='category'
                        >
                            <AccordionTrigger className='border-b px-1 pb-2 pt-0 text-primary'>
                                Категорія
                            </AccordionTrigger>
                            <AccordionContent className='space-y-2 px-1 pb-3'>
                                <CategoryFilter categories={categories || []} />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='country'>
                            <AccordionTrigger className='px-1 py-3 text-primary'>
                                Країна
                            </AccordionTrigger>
                            <AccordionContent className='space-y-3 px-1 pb-3'>
                                <CountriesFilter producers={producers || []} />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='color'>
                            <AccordionTrigger className='px-1 py-3 text-primary'>
                                Колір
                            </AccordionTrigger>
                            <AccordionContent className='space-y-3 px-1 pb-3'>
                                <ColorsFilter colors={colors || []} />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='price'>
                            <AccordionTrigger className='px-1 py-3 text-primary'>
                                Ціна за штуку, ₴
                            </AccordionTrigger>
                            <AccordionContent>
                                <PriceFilter
                                    minRetailPrice={minMaxValues?.min_retail_price}
                                    maxRetailPrice={minMaxValues?.max_retail_price}
                                />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='height'>
                            <AccordionTrigger className='px-1 py-3 text-primary'>
                                Висота, см.
                            </AccordionTrigger>
                            <AccordionContent>
                                <HeightFilter
                                    minHeight={minMaxValues?.min_height}
                                    maxHeight={minMaxValues?.max_height}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
