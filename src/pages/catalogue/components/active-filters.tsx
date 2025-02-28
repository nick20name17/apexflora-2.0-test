import { X } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useQuery } from 'react-query'

import { getAllCategories } from '@/api/categories/categories'
import type { Category } from '@/api/categories/categories.types'
import { getAllColors } from '@/api/colors/colors'
import { getAllProducers } from '@/api/producers/producers'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type FilterKey = 'colors' | 'price' | 'height' | 'categories' | 'countries' | 'producer'

export const ActiveFilters = ({ className }: { className?: string }) => {
    const { data: allCategories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getAllCategories({ only_parent: true })
    })

    const { data: allProducers } = useQuery({
        queryKey: ['countries'],
        queryFn: () => getAllProducers({})
    })

    const { data: allColors } = useQuery({
        queryKey: ['colors'],
        queryFn: () => getAllColors({})
    })

    const [, setOffset] = useQueryState('offset', {
        defaultValue: 0,
        parse: Number
    })

    const [colors, setColors] = useQueryState('colors')
    const [price, setPrice] = useQueryState('price')
    const [height, setHeight] = useQueryState('height')
    const [categories, setCategories] = useQueryState('categories')
    const [countries, setCountries] = useQueryState('countries')
    const [producers, setProducers] = useQueryState('producer')

    const selectedColors = colors ? colors.split(',') : []
    const selectedCountries = countries ? countries.split(',') : []
    const selectedCategories = categories ? categories.split(',') : []
    const selectedProducers = producers ? producers.split(',') : []

    const getColor = (colorId: string) => {
        const color = allColors?.find((color) => color.id.toString() === colorId)
        return {
            color: color?.hex,
            name: color?.name
        }
    }

    const getCategoryName = (categoryId: string) => {
        const flattenCategories = (categories: Category[]): Category[] => {
            return categories.reduce((acc: Category[], category: Category) => {
                const { children, ...rest } = category
                return acc.concat(
                    rest as Category,
                    children ? flattenCategories(children) : []
                )
            }, [])
        }

        const allFlattenedCategories = flattenCategories(allCategories || [])
        const category = allFlattenedCategories?.find(
            (category) => category.id.toString() === categoryId
        )
        return category ? category.name : null
    }

    const getCountryNameAndFlag = (countryCode: string) => {
        const producer = allProducers?.find(
            (producer) => producer.country.code === countryCode
        )
        return {
            name: producer?.country.name,
            flag: producer?.country.flag
        }
    }

    const getProducerName = (producerId: string) => {
        const producer = allProducers?.find(
            (producer) => producer.id.toString() === producerId
        )
        return producer?.name
    }

    const filters = [
        {
            key: 'price',
            label: price && `Ціна: ${price?.split(',')[0]}₴ - ${price?.split(',')[1]}₴`
        },
        {
            key: 'height',
            label:
                height &&
                `Висота: ${height?.split(',')[0]}см - ${height?.split(',')[1]}см`
        }
    ].filter((filter) => filter.label)

    const onFilterRemove = (key: FilterKey, value: string | null = null) => {
        const setterMap: Record<
            FilterKey,
            React.Dispatch<React.SetStateAction<string | null>>
        > = {
            colors: setColors,
            producer: setProducers,
            price: setPrice,
            height: setHeight,
            categories: setCategories,
            countries: setCountries
        }

        const setter = setterMap[key]

        if (value) {
            setter((currentValue: string | null) => {
                if (!currentValue) return null
                const values = currentValue.split(',')
                const newValues = values.filter((v: any) => v !== value)
                return newValues.length > 0 ? newValues.join(',') : null
            })
        } else {
            setter(null)
        }
        setOffset(0)
    }

    const onClearAll = () => {
        setColors(null)
        setPrice(null)
        setProducers(null)
        setHeight(null)
        setCategories(null)
        setCountries(null)
        setOffset(0)
    }

    const isFiltersHidden =
        !filters.length &&
        !selectedCategories.length &&
        !selectedColors.length &&
        !selectedCountries.length &&
        !selectedProducers.length

    return (
        <ul
            id='active-filters'
            className={cn(
                'mt-4 flex flex-wrap items-center gap-2',
                isFiltersHidden && 'hidden',
                className
            )}
        >
            {filters?.map((filter) => (
                <li key={filter.key}>
                    <Button
                        onClick={() => onFilterRemove(filter.key as FilterKey)}
                        className='h-8 rounded-full bg-secondary/50 p-2 text-xs text-muted-foreground transition-colors hover:text-background xl:xl:h-9 xl:px-4 xl:py-3'
                    >
                        {filter.label}
                        <X className='ml-2 size-4' />
                    </Button>
                </li>
            ))}

            {selectedColors.map((colorId) => (
                <li key={`color-${colorId}`}>
                    <Button
                        onClick={() => onFilterRemove('colors', colorId)}
                        className='h-8 rounded-full bg-secondary/50 p-2 text-xs text-muted-foreground transition-colors hover:text-background xl:h-9 xl:px-4 xl:py-3'
                    >
                        <div
                            className='size-3 rounded-full border'
                            style={{ backgroundColor: getColor(colorId).color }}
                        />
                        {getColor(colorId).name}
                        <X className='ml-2 size-4' />
                    </Button>
                </li>
            ))}

            {selectedCountries.map((country) => {
                const { flag, name } = getCountryNameAndFlag(country)

                return (
                    <li key={`country-${country}`}>
                        <Button
                            onClick={() => onFilterRemove('countries', country)}
                            className='h-8 rounded-full bg-secondary/50 p-2 text-xs text-muted-foreground transition-colors hover:text-background xl:h-9 xl:px-4 xl:py-3'
                        >
                            <img
                                src={flag}
                                alt='flag'
                                className='mr-1 size-4 rounded-xs'
                            />
                            {name}
                            <X className='ml-2 size-4' />
                        </Button>
                    </li>
                )
            })}

            {selectedProducers?.map((producer) => (
                <li key={`producer-${producer}`}>
                    <Button
                        onClick={() => onFilterRemove('producer', producer)}
                        className='h-8 rounded-full bg-secondary/50 p-2 text-xs text-muted-foreground transition-colors hover:text-background xl:h-9 xl:px-4 xl:py-3'
                    >
                        {getProducerName(producer)}
                        <X className='ml-2 size-4' />
                    </Button>
                </li>
            ))}

            {selectedCategories.map((category) => (
                <li key={`category-${category}`}>
                    <Button
                        onClick={() => onFilterRemove('categories', category)}
                        className='h-8 rounded-full bg-secondary/50 p-2 text-xs text-muted-foreground transition-colors hover:text-background xl:h-9 xl:px-4 xl:py-3'
                    >
                        {getCategoryName(category)}
                        <X className='ml-2 size-4' />
                    </Button>
                </li>
            ))}

            {filters.length ||
            selectedColors.length ||
            selectedCountries.length ||
            selectedProducers.length ||
            selectedCategories.length ? (
                <li>
                    <Button
                        onClick={onClearAll}
                        className='h-8 rounded-full bg-highlight/15 p-2 text-xs text-highlight transition-colors hover:bg-highlight hover:text-background xl:h-9 xl:px-4 xl:py-3'
                    >
                        Скинути <span className='max-lg:hidden'>все</span>
                    </Button>
                </li>
            ) : null}
        </ul>
    )
}
