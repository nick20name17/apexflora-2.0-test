import type { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { CreateModal, DeleteModal, EditModal } from '../../components/base-modal'

import { addBonusLimit, patchBonusLimit, removeBonusLimit } from '@/api/bonuses/bonuses'
import type { BonusLimit } from '@/api/bonuses/bonuses.types'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const bonusLimitsSchema = z.object({
    accumulation_limit: z.coerce.number().min(1, 'Значення повинно бути більше 0'),
    discount: z.coerce
        .number()
        .min(1, "Це поле є обов'язковим")
        .max(100, 'Значення повинно бути від 0 до 100')
})

const bonusLimitsFormFields = (
    form: UseFormReturn<z.infer<typeof bonusLimitsSchema>>
) => {
    return (
        <>
            <FormField
                control={form.control}
                name='accumulation_limit'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Ліміт </FormLabel>
                        <FormControl>
                            <Input
                                placeholder='100'
                                type='number'
                                inputMode='numeric'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='discount'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Відсоток знижки</FormLabel>

                        <FormControl>
                            <Input
                                placeholder='3'
                                type='number'
                                inputMode='numeric'
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

export const AddBonusLimitModal = ({ size = 'sm' }: { size?: 'icon' | 'sm' }) => (
    <CreateModal
        title='Бонусний ліміт'
        defaultValues={{ accumulation_limit: 0, discount: 0 }}
        schema={bonusLimitsSchema}
        mutation={addBonusLimit}
        queryKey='bonuses-limits'
        renderFields={bonusLimitsFormFields}
        size={size}
    />
)

export const EditBonusLimitModal = ({ bonusLimit }: { bonusLimit: BonusLimit }) => (
    <EditModal
        title='Бонусний ліміт'
        data={bonusLimit}
        schema={bonusLimitsSchema}
        mutation={patchBonusLimit}
        queryKey='bonuses-limits'
        renderFields={bonusLimitsFormFields}
    />
)

export const RemoveBonusLimitModal = ({ bonusLimit }: { bonusLimit: BonusLimit }) => (
    <DeleteModal
        title='Бонусний ліміт'
        data={bonusLimit}
        mutation={removeBonusLimit}
        queryKey='bonuses-limits'
    />
)
