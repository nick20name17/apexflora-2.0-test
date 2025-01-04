import { useQueryState } from 'nuqs'

import type { Category } from '@/api/categories/categories.types'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'

export const CategoryFilter = ({ categories }: { categories: Category[] }) => {
    const [category, setCategory] = useQueryState('categories', {
        defaultValue: ''
    })

    const [, setOffset] = useQueryState('offset', { defaultValue: 0, parse: Number })

    const selectedCategories = category ? category.split(',') : []

    const onCategoryChange = (categoryId: string) => {
        let updatedCategories = [...selectedCategories]

        if (updatedCategories.includes(categoryId)) {
            updatedCategories = updatedCategories.filter((id) => id !== categoryId)
        } else {
            updatedCategories.push(categoryId)
        }

        setCategory(updatedCategories.length > 0 ? updatedCategories.join(',') : null)
        setOffset(0)
    }

    const renderCategories = (categories: Category[]) =>
        categories.map((category) =>
            category.children && category.children.length > 0 ? (
                <AccordionItem
                    className='border-none'
                    key={category.id}
                    value={category.id.toString()}
                >
                    <AccordionTrigger className='py-1.5'>
                        <div className='flex items-center gap-x-2'>
                            <Checkbox
                                onClick={(e) => {
                                    e.stopPropagation()
                                }}
                                id={category.id.toString()}
                                checked={selectedCategories.includes(
                                    category.id.toString()
                                )}
                                onCheckedChange={() =>
                                    onCategoryChange(category.id.toString())
                                }
                            />
                            <label
                                onClick={(e) => {
                                    e.stopPropagation()
                                }}
                                htmlFor={category.id.toString()}
                                className='text-sm leading-none text-muted'
                            >
                                {category.name}
                            </label>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className='pl-3'>{renderCategories(category.children)}</div>
                    </AccordionContent>
                </AccordionItem>
            ) : (
                <div
                    key={category.id}
                    className='mt-2.5 flex items-center gap-x-3'
                >
                    <Checkbox
                        id={category.id.toString()}
                        checked={selectedCategories.includes(category.id.toString())}
                        onCheckedChange={() => onCategoryChange(category.id.toString())}
                    />
                    <label
                        htmlFor={category.id.toString()}
                        className='text-sm leading-none text-muted'
                    >
                        {category.name}
                    </label>
                </div>
            )
        )

    return <Accordion type='multiple'>{renderCategories(categories)}</Accordion>
}
