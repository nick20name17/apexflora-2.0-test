import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Pencil } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { z } from 'zod'

import { getStockFullData, patchStock } from '@/api/stock/stock'
import type { Stock } from '@/api/stock/stock.types'
import { getStatusProductsDisplay } from '@/components/status-tabs'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Dialog,
    DialogContent,
    DialogDescription,
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

const editQuantity = z.object({
    quantity: z.coerce
        .number({
            required_error: "Це поле є обов'яковим"
        })
        .min(1, "Це поле є обов'яковим")
})

type EditQuantityFormData = z.infer<typeof editQuantity>

interface EditQuantityModalProps {
    stock: Stock
}

export const EditQuantity = ({ stock }: EditQuantityModalProps) => {
    const [isMinus, setIsMinus] = useState(false)
    const [error, setError] = useState('')

    const queryClient = useQueryClient()

    const [open, setOpen] = useState(false)

    const form = useForm({
        values: {
            quantity: stock?.quantity
        },
        resolver: zodResolver(editQuantity)
    })

    const { data: stockFullData } = useQuery({
        queryKey: ['stocks-full-data', stock.id],
        queryFn: async () => {
            const res = await getStockFullData(stock.id)
            return res
        }
    })

    const patchStockMutation = useMutation({
        mutationFn: ({ quantity, id }: { quantity: number; id: number }) =>
            patchStock(id, { quantity }),
        onSuccess: () => {
            setOpen(false)
            form.reset()
            queryClient.invalidateQueries('shop-products')
        }
    })

    const onSubmit = (data: EditQuantityFormData) => {
        if (!stock) return

        const currentQuantity = stock?.quantity
        const adjustment = +data?.quantity
        const newQuantity = isMinus
            ? currentQuantity - adjustment
            : currentQuantity + adjustment

        if (isMinus && adjustment > currentQuantity) {
            setError('Введена кількість перевищує доступну кількість')
            return
        }

        patchStockMutation.mutate({
            quantity: newQuantity,
            id: stock?.id
        })
    }

    const { name, icon } = getStatusProductsDisplay(stock?.status?.id)

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    className='!size-6 shrink-0'
                    size='icon'
                    variant='ghost'
                >
                    <Pencil className='!size-3' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редагувати кількість</DialogTitle>
                    <DialogDescription className='flex items-center gap-x-2'>
                        {icon}
                        {name}
                    </DialogDescription>
                    <div className='flex items-center gap-x-2'>
                        <span>Надходження:</span>
                        <span className='font-medium text-primary'>
                            {stock?.quantity}
                        </span>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <span>Продано:</span>
                        <span className='font-medium text-primary'>
                            {stockFullData?.quantity_sold}
                        </span>
                    </div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4'
                        >
                            <FormField
                                control={form.control}
                                name='quantity'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Кількість</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='100'
                                                {...field}
                                                type='number'
                                                inputMode='numeric'
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                                <Checkbox
                                    checked={isMinus}
                                    onCheckedChange={(value) => setIsMinus(!!value)}
                                />

                                <FormLabel>Відняти кількість</FormLabel>
                            </div>

                            <Button
                                className='w-24'
                                type='submit'
                            >
                                {patchStockMutation?.isLoading ? (
                                    <Loader2 className='animate-spin' />
                                ) : (
                                    'Додати'
                                )}
                            </Button>

                            {error ? (
                                <div className='mt-4 text-sm font-medium text-destructive'>
                                    {error}
                                </div>
                            ) : null}
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
