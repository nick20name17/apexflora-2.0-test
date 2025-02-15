import type { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { CreateModal, DeleteModal, EditModal } from '../../components/base-modal'

import { addProfile, deleteProfile, updateProfile } from '@/api/profile/profile'

import type { Profile } from '@/api/profile/profile.types'
import { FilePicker } from '@/components/ui/file-picker'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const profilesSchema = z.object({
    title: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим"),
    text: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим"),
    'btn-text': z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим"),
    link: z.string()
        .regex(
            /^\/(?:[a-zA-Z0-9-_]+)?(?:\?[a-zA-Z0-9-_]+=.+(?:&[a-zA-Z0-9-_]+=.+)*)?$/,
            'Неправильний формат посилання'
        )
        .min(1, "Це поле є обов'язковим"),
    image: z.array(z.any()).min(1, 'Необхідно додати зображення'),
})

const profileFormFields = (form: UseFormReturn<z.infer<typeof profilesSchema>>) => (
    <>
        <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
                <FormItem>
                    <FormControl >
                        <FilePicker
                            caption
                            multiple={false}
                            onChange={field.onChange}
                            value={field.value}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            placeholder='Заголовок'
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />

                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name='text'
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            placeholder='Текст'
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />

                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name='btn-text'
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            placeholder='Текст кнопки'
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />

                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name='link'
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            placeholder='Посилання'
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    </>
)

export const AddProfileModal = ({ size = 'sm' }: { size?: 'sm' | 'icon' }) => (
    <CreateModal
        title='Слайд'
        defaultValues={{
            link: '',
            text: '',
            title: '',
            "btn-text": '',
            image: []
        }}
        schema={profilesSchema}
        mutation={(payload) => {
            const formData = new FormData()

            const data = {
                title: payload.title,
                text: payload.text,
                'btn-text': payload['btn-text'],
                link: payload.link
            };

            formData.append('image', payload.image[0] as any)
            formData.append('data', JSON.stringify(data))
            formData.append('page', 'home')
            formData.append('component', 'slider')


            return addProfile(formData)
        }}
        queryKey='profiles'
        renderFields={profileFormFields}
        size={size}
    />
)

export const EditProfileModal = ({ profile, className }: { profile: Profile, className?: string }) => (
    <EditModal
        className={className}
        title='Слайд'
        data={profile}
        schema={profilesSchema}
        transformDefaultValues={(values) => {
            return {
                ...values?.data,
                image: [
                    {
                        url: values?.image ?? ''
                    }
                ] as any
            }
        }}
        mutation={(_, payload) => {
            const formData = new FormData()

            const data = {
                title: payload.title,
                text: payload.text,
                'btn-text': payload['btn-text'],
                link: payload.link
            };

            formData.append('image', payload.image[0] as any)
            formData.append('data', JSON.stringify(data))
            formData.append('page', 'home')
            formData.append('component', 'slider')


            return updateProfile(profile.id, formData)
        }}
        queryKey='profiles'
        renderFields={profileFormFields}
    />
)

export const RemoveProfileModal = ({ profile, className }: { profile: Profile, className?: string }) => (
    <DeleteModal
        title='Слайд'
        className={className}
        data={profile}
        mutation={deleteProfile}
        queryKey='profiles'
    />
)
