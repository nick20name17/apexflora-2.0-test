import type { UseFormReturn } from 'react-hook-form'
import { useQuery } from 'react-query'
import { z } from 'zod'

import { CreateModal, DeleteModal, EditModal } from '../../components/base-modal'

import {
    addCategory,
    deleteCategory,
    getAllCategories,
    patchCategory
} from '@/api/categories/categories'
import type { Category } from '@/api/categories/categories.types'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

const categorySchema = z.object({
    name: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим"),

    parent: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .nullable()
})

const categoryFormFields = (form: UseFormReturn<z.infer<typeof categorySchema>>) => {
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getAllCategories({})
    })

    return (
        <>
            <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Назва категорії</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='Гвоздика'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='parent'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Батьківська </FormLabel>
                        <FormControl>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field?.value?.toString()}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder='Оберіть батьківську категорію' />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories?.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category?.id?.toString()}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}

export const AddCategoryModal = ({ size = 'sm' }: { size?: 'sm' | 'icon' }) => (
    <CreateModal
        title='Категорію'
        defaultValues={{
            name: '',
            parent: null
        }}
        schema={categorySchema}
        mutation={addCategory}
        queryKey='categories'
        renderFields={categoryFormFields}
        size={size}
    />
)

export const EditCategoryModal = ({ category }: { category: Category }) => (
    <EditModal
        title='Категорію'
        data={category}
        schema={categorySchema}
        mutation={patchCategory}
        queryKey='categories'
        renderFields={categoryFormFields}
    />
)

export const RemoveCategoryModal = ({ category }: { category: Category }) => (
    <DeleteModal
        title='Категорію'
        data={category}
        mutation={deleteCategory}
        queryKey='categories'
    />
)
