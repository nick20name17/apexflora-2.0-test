import { zodResolver } from '@hookform/resolvers/zod'
import { CirclePlus, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'sonner'
import { z, type infer as zodInfer } from 'zod'

import { CategorySelect } from '../controls/category-select'

import { addProduct } from '@/api/products/products'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export const addProductSchema = z.object({
    name: z
        .string({
            required_error: "Це поле є обов'яковим"
        })
        .min(1, "Це поле є обов'яковим"),
    ukr_name: z
        .string({
            required_error: "Це поле є обов'яковим"
        })
        .min(1, "Це поле є обов'яковим"),
    description: z.string({
        required_error: "Це поле є обов'яковим"
    }),
    category: z.coerce
        .number({
            required_error: "Це поле є обов'яковим"
        })
        .min(1, "Це поле є обов'яковим")
        .positive('Необхідно вказати категорію')
})

type ProductFormData = zodInfer<typeof addProductSchema>

interface AddProductModalProps {
    size?: 'icon' | 'sm'
}

export const AddProductModal = ({ size = 'sm' }: AddProductModalProps) => {
    const form = useForm<ProductFormData>({
        values: { name: '', ukr_name: '', description: '', category: -1 },
        resolver: zodResolver(addProductSchema)
    })

    const [open, setOpen] = useState(false)

    const queryClient = useQueryClient()

    const addProductMutation = useMutation({
        mutationFn: addProduct,
        onSuccess: (data) => {
            queryClient.invalidateQueries('shop-products')
            toast.success(`Товар ${data?.ukr_name} успішно додано`)
            setOpen(false)
        }
    })

    const onSubmit = (formData: ProductFormData) => {
        addProductMutation.mutate(formData)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    className='flex-shrink-0 gap-x-2'
                    size={size}
                >
                    <CirclePlus className='size-4' />
                    {size === 'icon' ? '' : 'Додати товар'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Додати товар</DialogTitle>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4'
                        >
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Назва англійською</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Rose'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='ukr_name'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Назва українською</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Троянда'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Опис</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder='Квітка червоного кольору'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='category'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Категорія</FormLabel>
                                        <FormControl>
                                            <CategorySelect
                                                category={field.value?.toString()}
                                                setCategory={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                onClick={(e) => {
                                    e.stopPropagation()
                                }}
                                className='w-24'
                                type='submit'
                            >
                                {addProductMutation.isLoading ? (
                                    <Loader2 className='animate-spin' />
                                ) : (
                                    'Додати'
                                )}
                            </Button>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
