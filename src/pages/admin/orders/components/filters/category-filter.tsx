import { useQuery } from 'react-query'

import { getAllCategories } from '@/api/categories/categories'
import { MultiSelect } from '@/components/ui/multi-select'

interface CategoryFilterProps {
    className?: string
    categories: string
    setCategories: (categories: string) => void
}

export const CategoryFilter = ({ categories, setCategories }: CategoryFilterProps) => {
    const { data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await getAllCategories({})
            return res
        }
    })

    const categoriesOptions =
        categoriesData?.map((category) => ({
            label: category.name,
            value: category.id.toString()
        })) || []

    const handleCategoriesChange = (value: string[]) => {
        setCategories(value.length > 0 ? value.join(',') : '')
    }

    return (
        <MultiSelect
            id='categories'
            modalPopover
            maxCount={2}
            options={categoriesOptions}
            onValueChange={handleCategoriesChange}
            defaultValue={categories ? categories.split(',') : []}
            placeholder='Оберіть категорії'
            animation={0}
        />
    )
}
