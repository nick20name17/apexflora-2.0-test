import type { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { CreateModal, DeleteModal, EditModal } from '../components/base-modal'

import { addProducer, deleteProducer, patchProducer } from '@/api/producers/producers'
import type { Producer } from '@/api/producers/producers.types'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const producerSchema = z.object({
    name: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим"),
    country: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим")
})

const producerFormFields = (form: UseFormReturn<z.infer<typeof producerSchema>>) => (
    <>
        {' '}
        <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            placeholder='Bibo Flowers'
                            {...field}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name='country'
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            placeholder='NL'
                            {...field}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    </>
)

export const AddProducerModal = ({ size = 'sm' }: { size?: 'sm' | 'icon' }) => (
    <CreateModal
        title='Виробника'
        defaultValues={{
            name: '',
            country: ''
        }}
        schema={producerSchema}
        mutation={addProducer}
        queryKey='producers'
        renderFields={producerFormFields}
        size={size}
    />
)

export const EditProducerModal = ({ producer }: { producer: Producer }) => (
    <EditModal
        title='Виробника'
        data={producer}
        schema={producerSchema}
        transformDefaultValues={() => {
            return {
                country: producer.country?.code,
                name: producer.name
            }
        }}
        mutation={patchProducer}
        queryKey='producers'
        renderFields={producerFormFields}
    />
)

export const RemoveProducerModal = ({ producer }: { producer: Producer }) => (
    <DeleteModal
        title='Виробника'
        data={producer}
        mutation={deleteProducer}
        queryKey='producers'
    />
)
