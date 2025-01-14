import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { z } from 'zod'

import {
    addDeliverAddress,
    patchDeliverAddress
} from '@/api/deliver-address/deliver-address'
import type {
    DeliverAddress,
    DeliverAddressPayload
} from '@/api/deliver-address/deliver-address.types'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'

interface DeliverAddressFormProps {
    deliverAddress?: DeliverAddress
    setOpen: (open: boolean) => void
}

const ordersAddressSchema = z.object({
    city: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим"),
    street: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим")
})

type DeliverAddressFormData = z.infer<typeof ordersAddressSchema>

export const DeliverAddressForm = ({
    deliverAddress,
    setOpen
}: DeliverAddressFormProps) => {
    const queryClient = useQueryClient()

    const form = useForm<DeliverAddressFormData>({
        values: {
            city: deliverAddress?.city || '',
            street: deliverAddress?.street || ''
        },
        resolver: zodResolver(ordersAddressSchema)
    })

    const { currentUser } = useAuth()

    const addAddressMutation = useMutation({
        mutationFn: addDeliverAddress,
        onSuccess: () => {
            setOpen(false)
            queryClient.invalidateQueries(['currentUser'])
            queryClient.invalidateQueries(['deliverAddress', currentUser?.id])
        }
    })
    const patchAddressMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: DeliverAddressPayload }) =>
            patchDeliverAddress(id, payload),
        onSuccess: () => {
            setOpen(false)
            queryClient.invalidateQueries(['currentUser'])
            queryClient.invalidateQueries(['deliverAddress', currentUser?.id])
        }
    })

    const onSubmit = (formData: DeliverAddressFormData) => {
        if (deliverAddress?.id) {
            patchAddressMutation.mutate({
                id: deliverAddress.id,
                payload: {
                    ...formData,
                    creator: currentUser?.id!
                }
            })
        } else {
            addAddressMutation.mutate({
                ...formData,
                creator: currentUser?.id!
            })
        }
    }

    return (
        <Form {...form}>
            <form
                className='w-full space-y-4'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    disabled={addAddressMutation.isLoading}
                    control={form.control}
                    name='city'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Місто</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Рівне'
                                    type='text'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={addAddressMutation.isLoading}
                    control={form.control}
                    name='street'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Вулиця</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='вул. Чорновола 24'
                                    type='text'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    className='w-full'
                    disabled={
                        addAddressMutation.isLoading || patchAddressMutation.isLoading
                    }
                    type='submit'
                >
                    {addAddressMutation.isLoading || patchAddressMutation.isLoading ? (
                        <Loader2 className='size-4 animate-spin' />
                    ) : deliverAddress?.id ? (
                        'Змінити'
                    ) : (
                        'Додати'
                    )}
                </Button>
            </form>
        </Form>
    )
}
