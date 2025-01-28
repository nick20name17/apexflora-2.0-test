import type { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { CreateModal, DeleteModal, EditModal } from '../../components/base-modal'

import { addColor, patchColor, removeColor } from '@/api/colors/colors'
import type { Color } from '@/api/colors/colors.types'
import { ColorPicker } from '@/components/ui/color-picker'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const colorSchema = z.object({
    name: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим"),
    hex: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим")
})

const colorFormFields = (form: UseFormReturn<z.infer<typeof colorSchema>>) => (
    <>
        <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            placeholder='Зелений'
                            {...field}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name='hex'
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <ColorPicker
                            onChange={field.onChange}
                            value={field.value}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    </>
)

export const AddColorModal = ({ size = 'sm' }: { size?: 'sm' | 'icon' }) => (
    <CreateModal
        title='Колір'
        defaultValues={{
            name: '',
            hex: ''
        }}
        schema={colorSchema}
        mutation={addColor}
        queryKey='colors'
        renderFields={colorFormFields}
        size={size}
    />
)

export const EditColorModal = ({ color }: { color: Color }) => (
    <EditModal
        title='Колір'
        data={color}
        schema={colorSchema}
        mutation={patchColor}
        queryKey='colors'
        renderFields={colorFormFields}
    />
)

export const RemoveColorModal = ({ color }: { color: Color }) => (
    <DeleteModal
        title='Колір'
        data={color}
        mutation={removeColor}
        queryKey='colors'
    />
)
