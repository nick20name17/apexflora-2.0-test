import { useQueryState } from 'nuqs'
import { useQuery } from 'react-query'

import { getAllCategories } from '@/api/categories/categories'
import { MultiSelect } from '@/components/ui/multi-select'

export const CategoryFilter = () => {
    const [categories, setCategories] = useQueryState('categories', {
        defaultValue: ''
    })

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
        setCategories(value.length > 0 ? value.join(',') : null)
    }

    return (
        <div>
            <label
                htmlFor='categories'
                className='text-xs'
            >
                Оберіть категорії
            </label>
            <MultiSelect
                id='categories'
                modalPopover
                maxCount={1}
                options={categoriesOptions}
                onValueChange={handleCategoriesChange}
                defaultValue={categories ? categories.split(',') : []}
                placeholder='Оберіть категорії'
                animation={0}
            />
        </div>
    )
}
