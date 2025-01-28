import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import {
    array,
    instanceof as instanceof_zod,
    object,
    string,
    type infer as zodInfer
} from 'zod'

import { addSupplierOrder } from '@/api/shop-products/shop-products'
import { getStatusProducts } from '@/api/status-products/status-products'
import { getStatusProductsDisplay } from '@/components/status-tabs'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { FilePicker } from '@/components/ui/file-picker'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

const categories = [
    {
        id: 'фурнітура',
        name: 'Фурнітура'
    },
    {
        id: 'квіти',
        name: 'Квіти'
    }
]

const addFileSchema = object({
    category: string({
        required_error: 'Необхідно вказати категорію'
    }).min(1, 'Необхідно вказати категорію'),
    product_status: string({
        required_error: 'Необхідно вказати статус товару'
    }).min(1, 'Необхідно вказати статус товару'),
    file: array(instanceof_zod(File)).min(1, 'Необхідно додати файл')
})

type FileFormData = zodInfer<typeof addFileSchema>

export const AddFileModal = () => {
    const addSupplierOrderMutation = useMutation({
        mutationFn: addSupplierOrder,
        onSuccess: () => {}
    })

    const { data: statusProducts } = useQuery({
        queryKey: ['status-products'],
        queryFn: async () => {
            const res = await getStatusProducts({})
            return res
        }
    })

    const form = useForm({
        values: {
            file: [],
            category: '',
            product_status: ''
        },
        resolver: zodResolver(addFileSchema)
    })

    const onFileAdd = (data: FileFormData) => {
        const formData = new FormData()
        formData.append('file', data.file[0])

        try {
            addSupplierOrder({
                category: data.category,
                product_status: +data.product_status,
                file: formData
            })
        } catch (error) {
            console.error(error)
        }
    }

    const onSubmit = (data: FileFormData) => {
        onFileAdd(data)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size='sm'
                    variant='accent'
                >
                    Додати файл
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Додати файл</DialogTitle>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4'
                        >
                            <FormField
                                control={form.control}
                                name='file'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Файл</FormLabel>
                                        <FormControl>
                                            <FilePicker
                                                caption
                                                accept={['.csv']}
                                                multiple={false}
                                                onChange={field.onChange}
                                                value={field.value}
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
                                    <FormItem>
                                        <FormLabel>Категорія</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
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
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='product_status'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Статус</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Оберіть статус' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {statusProducts?.results?.map(
                                                        (status) => (
                                                            <SelectItem
                                                                key={status.id}
                                                                value={status.id.toString()}
                                                            >
                                                                {
                                                                    getStatusProductsDisplay(
                                                                        status.id
                                                                    ).name
                                                                }
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                className='w-24'
                                type='submit'
                            >
                                {addSupplierOrderMutation.isLoading ? (
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
