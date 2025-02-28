import type { UseFormReturn } from 'react-hook-form'
import { withMask } from 'use-mask-input'
import { z } from 'zod'

import { addCoworker } from '@/api/coworkers/coworkers'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CreateModal } from '@/pages/admin/components/base-modal'
import { ordersCoworkerSchema } from '@/pages/profile/settings/forms/orders-coworker-form'
import { useAuth } from '@/providers/auth-provider'

const coworkerFormFields = (
    form: UseFormReturn<z.infer<typeof ordersCoworkerSchema>>
) => {
    return (
        <>
            <FormField
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
        </>
    )
}

export const AddCoworkerModal = ({ size = 'sm' }: { size?: 'sm' | 'icon' }) => {
    const { currentUser } = useAuth()
    return (
        <CreateModal
            title='Отримувач замовлень'
            defaultValues={{
                email: '',
                first_name: '',
                last_name: '',
                phone_number: ''
            }}
            buttonText=''
            mutation={(payload) =>
                addCoworker({
                    ...payload,
                    phone_number: payload.phone_number.replace(/\s/g, ''),
                    creator: currentUser?.id!
                })
            }
            schema={ordersCoworkerSchema}
            queryKey={['coworkers', 'currentUser']}
            renderFields={coworkerFormFields}
            size={size}
        />
    )
}
