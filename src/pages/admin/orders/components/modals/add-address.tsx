import type { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { addDeliverAddress } from '@/api/deliver-address/deliver-address'
import { CitySelect } from '@/components/city-select'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CreateModal } from '@/pages/admin/components/base-modal'
import { ordersAddressSchema } from '@/pages/profile/settings/forms/deliver-address-form'
import { useAuth } from '@/providers/auth-provider'

const addressFormFields = (form: UseFormReturn<z.infer<typeof ordersAddressSchema>>) => {
    return (
        <>
            <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Місто</FormLabel>
                        <FormControl>
                            <CitySelect
                                className='h-10'
                                city={field.value}
                                setCity={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
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
        </>
    )
}

export const AddAddressModal = ({ size = 'sm' }: { size?: 'sm' | 'icon' }) => {
    const { currentUser } = useAuth()
    return (
        <CreateModal
            title='Адреса доставки'
            defaultValues={{
                city: '',
                street: ''
            }}
            buttonText=''
            mutation={(payload) =>
                addDeliverAddress({
                    ...payload,
                    creator: currentUser?.id!
                })
            }
            schema={ordersAddressSchema}
            queryKey={'deliver-address'}
            renderFields={addressFormFields}
            size={size}
        />
    )
}
