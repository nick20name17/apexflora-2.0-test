// hooks/useProductFilters.js
import { useQueryState } from 'nuqs'
import { useEffect, useMemo } from 'react'

import { useFilters } from '../store/filters'

import { defaultLimit } from '@/constants/table'

export const useProductFilters = () => {
    const [statuses] = useQueryState('status', { defaultValue: '2' })
    const [ordering] = useQueryState('ordering', { defaultValue: 'name' })
    const [promotion] = useQueryState('promo', { defaultValue: false, parse: Boolean })
    const [colors] = useQueryState('colors', { defaultValue: '' })
    const [price] = useQueryState('price')
    const [height] = useQueryState('height', { defaultValue: '' })
    const [categories] = useQueryState('categories', { defaultValue: '' })
    const [countries] = useQueryState('countries', { defaultValue: '' })
    const [search] = useQueryState('search', { defaultValue: '' })
    const [producers] = useQueryState('producer', { defaultValue: '' })
    const [limit] = useQueryState('limit', { defaultValue: defaultLimit, parse: Number })
    const [offset] = useQueryState('offset', { defaultValue: 0, parse: Number })

    const { setFilters } = useFilters()

    const filters = useMemo(
        () => ({
            offset,
            limit,
            statuses,
            ordering,
            price,
            height,
            countries,
            categories,
            promotion,
            colors,
            producers,
            is_visible: true,
            search
        }),
        [
            offset,
            limit,
            statuses,
            ordering,
            price,
            height,
            countries,
            categories,
            producers,
            promotion,
            colors,
            search
        ]
    )

    useEffect(() => {
        setFilters(filters)
    }, [JSON.stringify(filters)])

    return filters
}
