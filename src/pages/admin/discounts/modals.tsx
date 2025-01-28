import { format } from 'date-fns'
import type { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { CreateModal, DeleteModal, EditModal } from '../components/base-modal'

import { addDiscount, patchDiscount, removeDiscount } from '@/api/discounts/discounts'
import type { Discount } from '@/api/discounts/discounts.types'
import { DatePicker } from '@/components/ui/date-picker'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DATE_FORMATS } from '@/constants/app'

const discountSchema = z
    .object({
        name: z
            .string({
                required_error: "Це поле є обов'язковим"
            })
            .min(1, "Це поле є обов'язковим"),
        percentage: z
            .string({
                required_error: "Це поле є обов'язковим"
            })
            .min(1, "Це поле є обов'язковим"),
        start_date: z.coerce.string({
            required_error: "Це поле є обов'язковим"
        }),
        end_date: z.coerce.string({
            required_error: "Це поле є обов'язковим"
        })
    })
    .refine((data) => new Date(data.start_date) <= new Date(data.end_date), {
        message: 'Не може бути пізнішою за дату завершення',
        path: ['start_date'] // Error will be attached to this field
    })
    .refine((data) => new Date(data.end_date) >= new Date(data.start_date), {
        message: 'Не може бути ранішою за дату початку',
        path: ['end_date'] // Error will be attached to this field
    })
const discountFormFields = (form: UseFormReturn<z.infer<typeof discountSchema>>) => (
    <>
        <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Назва знижки</FormLabel>
                    <FormControl>
                        <Input
                            placeholder='8 Березня'
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name='percentage'
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Відсоток</FormLabel>
                    <FormControl>
                        <Input
                            type='number'
                            inputMode='numeric'
                            placeholder='10'
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <div className='flex items-start gap-x-4'>
            <FormField
                control={form.control}
                name='start_date'
                render={({ field }) => (
                    <FormItem className='flex-1'>
                        <FormLabel>Початок знижки</FormLabel>
                        <FormControl>
                            <DatePicker
                                className='w-full'
                                date={field.value ? new Date(field.value) : undefined}
                                setDate={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='end_date'
                render={({ field }) => (
                    <FormItem className='flex-1'>
                        <FormLabel>Кінець знижки</FormLabel>
                        <FormControl>
                            <DatePicker
                                className='w-full'
                                date={field.value ? new Date(field.value) : undefined}
                                setDate={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    </>
)

export const AddDiscountModal = ({ size = 'sm' }: { size?: 'sm' | 'icon' }) => (
    <CreateModal
        title='Знижку'
        defaultValues={{
            end_date: '',
            name: '',
            percentage: '',
            start_date: ''
        }}
        schema={discountSchema}
        mutation={(payload) =>
            addDiscount({
                ...payload,
                start_date: format(new Date(payload.start_date), DATE_FORMATS.iso),
                end_date: format(new Date(payload.end_date), DATE_FORMATS.iso)
            })
        }
        queryKey='discounts'
        renderFields={discountFormFields}
        size={size}
    />
)

export const EditDiscountModal = ({ discount }: { discount: Discount }) => (
    <EditModal
        title='Знижку'
        data={discount}
        schema={discountSchema}
        transformDefaultValues={() => {
            return {
                end_date: discount.end_date
                    ? format(new Date(discount.end_date), DATE_FORMATS.iso)
                    : '',
                name: discount.name,
                percentage: discount.percentage,
                start_date: discount.start_date
                    ? format(new Date(discount.start_date), DATE_FORMATS.iso)
                    : ''
            }
        }}
        mutation={patchDiscount}
        queryKey='discounts'
        renderFields={discountFormFields}
    />
)

export const RemoveDiscountModal = ({ discount }: { discount: Discount }) => (
    <DeleteModal
        title='Знижку'
        data={discount}
        mutation={removeDiscount}
        queryKey='discounts'
    />
)
