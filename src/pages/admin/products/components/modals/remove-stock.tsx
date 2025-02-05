import { Loader2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'sonner'

import { removeStock } from '@/api/stock/stock'
import type { Stock } from '@/api/stock/stock.types'
import { getStatusProductsDisplay } from '@/components/status-tabs'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'

interface RemoveStockModalProps {
    stock: Stock
}

export const RemoveStockModal = ({ stock }: RemoveStockModalProps) => {
    const queryClient = useQueryClient()

    const removeStockMutation = useMutation({
        mutationFn: removeStock,
        onSuccess: () => {
            setOpen(false)
            toast.success(
                <>
                    Товар {stock?.shop_product?.product?.ukr_name} зі статусом{' '}
                    <span>
                        {getStatusProductsDisplay(stock?.status?.id).name.toLowerCase()}
                    </span>{' '}
                    успішно видалено
                </>
            )
            queryClient.invalidateQueries('shop-products')
        },
        onError: () => {
            toast.error('Щось пішло не так')
        }
    })

    const [open, setOpen] = useState(false)

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    className='hover:bg-destructive hover:text-destructive-foreground hover:border-destructive'
                    variant='outline'
                    size='icon'
                >
                    <Trash2 className='size-4' />
                </Button>
            </DialogTrigger>
            <DialogContent className='mx-2 rounded-md'>
                <DialogHeader className='text-left'>
                    <DialogTitle>
                        Видалити товар {stock.shop_product.product.ukr_name} зі статусом{' '}
                        <span className='text-destructive'>
                            {getStatusProductsDisplay(stock.status.id).name.toLowerCase()}
                        </span>
                        ?
                    </DialogTitle>
                </DialogHeader>

                <div className='flex items-center justify-end gap-x-4'>
                    <Button
                        onClick={() => {
                            setOpen(false)
                        }}
                        size='sm'
                        variant='secondary'
                    >
                        Відмінити
                    </Button>
                    <Button
                        disabled={removeStockMutation.isLoading}
                        onClick={() => {
                            removeStockMutation.mutate(stock.id)
                        }}
                        size='sm'
                        variant='destructive'
                        className='flex w-24 items-center gap-x-1.5'
                    >
                        {removeStockMutation.isLoading ? (
                            <Loader2 className='animate-spin' />
                        ) : (
                            'Видалити'
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
