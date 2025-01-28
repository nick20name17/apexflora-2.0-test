import type { UseFormReturn } from 'react-hook-form'
import { useQuery } from 'react-query'
import { z } from 'zod'

import { AddBonusLimitModal } from '../../bonus-limits/components/modals'
import { CreateModal, DeleteModal, EditModal } from '../../components/base-modal'

import {
    addBonusProgram,
    getBonusLimits,
    patchBonusProgram,
    removeBonusProgram
} from '@/api/bonuses/bonuses'
import type { BonusProgram } from '@/api/bonuses/bonuses.types'
import { Checkbox } from '@/components/ui/checkbox'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
import { defaultLimit } from '@/constants/table'

const bonusProgramsSchema = z.object({
    title: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим"),
    default: z.boolean({
        required_error: "Це поле є обов'язковим"
    }),
    limits: z.array(z.string()).min(1, 'Оберіть хоча б один ліміт')
})

const bonusProgramsFormFields = (
    form: UseFormReturn<z.infer<typeof bonusProgramsSchema>>
) => {
    const { data: bonusLimits } = useQuery({
        queryFn: () => getBonusLimits({ limit: defaultLimit })
    })

    const bonusLimitsOptions =
        bonusLimits?.results?.map((limit) => ({
            label: limit.accumulation_limit + ' ₴' + ' - ' + limit.discount + '%',
            value: limit.id.toString()
        })) || []

    return (
        <>
            <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Назва бонусної програми</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='Бонусна програма за замовчуванням'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='limits'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Бонусні ліміти (один або декілька варіантів)
                        </FormLabel>
                        <div className='flex items-center gap-x-2'>
                            <FormControl>
                                <MultiSelect
                                    modalPopover
                                    maxCount={2}
                                    options={bonusLimitsOptions}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    placeholder='Оберіть бонусні ліміти'
                                    animation={0}
                                />
                            </FormControl>
                            <AddBonusLimitModal size='icon' />
                        </div>

                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='default'
                render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>

                        <div className='space-y-1 leading-none'>
                            <FormLabel>Бонусна програма за замовчуванням</FormLabel>
                            <FormDescription>
                                Бонусна програма за замовчуванням буде додана при
                                створенні або реєстрації нового користувача
                            </FormDescription>
                        </div>
                    </FormItem>
                )}
            />
        </>
    )
}

export const AddBonusProgramModal = ({ size = 'sm' }: { size?: 'sm' | 'icon' }) => (
    <CreateModal
        title='Бонусну програму'
        defaultValues={{ limits: [], default: false, title: '' }}
        schema={bonusProgramsSchema}
        mutation={addBonusProgram}
        queryKey='bonuses-programs'
        renderFields={bonusProgramsFormFields}
        size={size}
    />
)

export const EditBonusProgramModal = ({
    bonusProgram
}: {
    bonusProgram: BonusProgram
}) => (
    <EditModal
        title='Бонусну програму'
        data={bonusProgram}
        transformDefaultValues={() => {
            return {
                limits: bonusProgram.limits.map((limit) => limit.id.toString()),
                default: bonusProgram.default,
                title: bonusProgram.title
            }
        }}
        schema={bonusProgramsSchema}
        mutation={patchBonusProgram}
        queryKey='bonuses-programs'
        renderFields={bonusProgramsFormFields}
    />
)

export const RemoveBonusProgramModal = ({
    bonusProgram
}: {
    bonusProgram: BonusProgram
}) => (
    <DeleteModal
        title='Бонусну програму'
        data={bonusProgram}
        mutation={removeBonusProgram}
        queryKey='bonuses-programs'
    />
)
