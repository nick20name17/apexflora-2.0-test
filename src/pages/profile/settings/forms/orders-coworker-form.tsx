import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { withMask } from 'use-mask-input'
import { z } from 'zod'

import { addCoworker, patchCoworker } from '@/api/coworkers/coworkers'
import type { Coworker, CoworkerPayload } from '@/api/coworkers/coworkers.types'
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
import { emailSchema } from '@/config/schemas'
import { useAuth } from '@/hooks/use-auth'

export const ordersCoworkerSchema = z.object({
    ...emailSchema.shape,
    first_name: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим"),
    last_name: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим"),
    phone_number: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим")
})

type OrdersCoworkerFormValues = z.infer<typeof ordersCoworkerSchema>

interface OrdersCoworkerFormProps {
    setOpen: (open: boolean) => void
    coworker?: Coworker
}

export const OrdersCoworkerForm = ({ setOpen, coworker }: OrdersCoworkerFormProps) => {
    const queryClient = useQueryClient()

    const form = useForm({
        values: {
            first_name: coworker?.first_name || '',
            last_name: coworker?.last_name || '',
            email: coworker?.email || '',
            phone_number: coworker?.phone_number || ''
        },
        resolver: zodResolver(ordersCoworkerSchema)
    })

    const { currentUser } = useAuth()

    const coworkerId = coworker?.id!

    const addCoworkerMutation = useMutation({
        mutationFn: (data: CoworkerPayload) => addCoworker(data),
        onSuccess: () => {
            setOpen(false)
            queryClient.invalidateQueries(['currentUser'])
            queryClient.invalidateQueries(['coworkers'])
        }
    })

    const patchCoworkerMutation = useMutation({
        mutationFn: (data: CoworkerPayload) => patchCoworker(coworkerId, data),
        onSuccess: () => {
            setOpen(false)
            queryClient.invalidateQueries(['currentUser'])
            queryClient.invalidateQueries(['coworkers'])
        }
    })

    const onSubmit = (formData: OrdersCoworkerFormValues) => {
        if (coworkerId) {
            patchCoworkerMutation.mutate({
                ...formData,
                phone_number: formData.phone_number.replace(/\s/g, ''),
                creator: currentUser?.id!
            })
        } else {
            addCoworkerMutation.mutate({
                ...formData,
                phone_number: formData.phone_number.replace(/\s/g, ''),
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
                    disabled={addCoworkerMutation.isLoading}
                    control={form.control}
                    name='first_name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ім'я</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Андрій'
                                    type='text'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={addCoworkerMutation.isLoading}
                    control={form.control}
                    name='last_name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Прізвище</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Степаненко'
                                    type='text'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={addCoworkerMutation.isLoading}
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Електронна пошта</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='nickname@gmail.com'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='phone_number'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Номер телефону</FormLabel>
                            <FormControl ref={withMask('+380 99 999 9999')}>
                                <Input
                                    type='tel'
                                    inputMode='tel'
                                    placeholder='38 067 999 95 69'
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
                        addCoworkerMutation.isLoading || patchCoworkerMutation.isLoading
                    }
                    type='submit'
                >
                    {addCoworkerMutation.isLoading || patchCoworkerMutation.isLoading ? (
                        <Loader2 className='size-4 animate-spin' />
                    ) : coworkerId ? (
                        'Змінити'
                    ) : (
                        'Додати'
                    )}
                </Button>
            </form>
        </Form>
    )
}
