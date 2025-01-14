import { Loader2, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { DeliverAddressForm } from '../forms/deliver-address-form'

import { removeDeliverAddress } from '@/api/deliver-address/deliver-address'
import type { DeliverAddress } from '@/api/deliver-address/deliver-address.types'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { useAuth } from '@/hooks/use-auth'

export const EditAddressModal = ({
    deliverAddress
}: {
    deliverAddress: DeliverAddress
}) => {
    const [open, setOpen] = useState(false)
    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    size='icon'
                    variant='ghost'
                >
                    <svg
                        width='20'
                        height='20'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M9.16699 1.66663H7.50033C3.33366 1.66663 1.66699 3.33329 1.66699 7.49996V12.5C1.66699 16.6666 3.33366 18.3333 7.50033 18.3333H12.5003C16.667 18.3333 18.3337 16.6666 18.3337 12.5V10.8333'
                            stroke='#8A8A8A'
                            stroke-width='1.5'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                        <path
                            d='M13.3666 2.51663L6.7999 9.0833C6.5499 9.3333 6.2999 9.82497 6.2499 10.1833L5.89157 12.6916C5.75823 13.6 6.3999 14.2333 7.30823 14.1083L9.81657 13.75C10.1666 13.7 10.6582 13.45 10.9166 13.2L17.4832 6.6333C18.6166 5.49997 19.1499 4.1833 17.4832 2.51663C15.8166 0.849966 14.4999 1.3833 13.3666 2.51663Z'
                            stroke='#8A8A8A'
                            stroke-width='1.5'
                            stroke-miterlimit='10'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                        <path
                            d='M12.4248 3.45837C12.9831 5.45004 14.5415 7.00837 16.5415 7.57504'
                            stroke='#8A8A8A'
                            stroke-width='1.5'
                            stroke-miterlimit='10'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                    </svg>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редагувати адресу</DialogTitle>
                </DialogHeader>
                <DeliverAddressForm
                    deliverAddress={deliverAddress}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>
    )
}

export const RemoveAddressModal = ({
    deliverAddress
}: {
    deliverAddress: DeliverAddress
}) => {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)

    const { currentUser } = useAuth()

    const removeAddresMutation = useMutation({
        mutationFn: (id: number) => removeDeliverAddress(id),
        onSuccess: () => {
            setOpen(false)
            queryClient.invalidateQueries(['currentUser'])
            queryClient.invalidateQueries(['deliverAddress', currentUser?.id])
        }
    })

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    className='text-muted-foreground hover:bg-destructive hover:text-destructive-foreground'
                    size='icon'
                    variant='ghost'
                >
                    <TrashIcon className='size-4' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Видалити адресу?</DialogTitle>
                </DialogHeader>
                <div className='ml-auto flex items-center gap-x-4'>
                    <Button
                        disabled={removeAddresMutation.isLoading}
                        className='w-24'
                        onClick={() => removeAddresMutation.mutate(deliverAddress?.id)}
                        size='sm'
                        variant='destructive'
                    >
                        {removeAddresMutation.isLoading ? (
                            <Loader2 className='animate-spin' />
                        ) : (
                            'Видалити'
                        )}
                    </Button>
                    <Button
                        className='w-24'
                        onClick={() => setOpen(false)}
                        size='sm'
                        variant='outline'
                    >
                        Відмінити
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
