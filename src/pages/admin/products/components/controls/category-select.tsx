import { useQuery } from 'react-query'

import { AddCategoryModal } from '../../../categories/components/modals'

import { getAllCategories } from '@/api/categories/categories'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

interface CategorylectProps {
    category: string
    setCategory: (categories: string) => void
    withAdd?: boolean
}
export const CategorySelect = ({
    category,
    setCategory,
    withAdd = true
}: CategorylectProps) => {
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await getAllCategories({})
            return res
        }
    })
    return (
        <div className='flex items-center gap-2'>
            <Select
                defaultValue={category}
                onValueChange={setCategory}
            >
                <SelectTrigger>
                    <SelectValue placeholder='Оберіть категорію' />
                </SelectTrigger>
                <SelectContent>
                    {categories?.map((category) => (
                        <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                        >
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {withAdd ? <AddCategoryModal size='icon' /> : null}
        </div>
    )
}
