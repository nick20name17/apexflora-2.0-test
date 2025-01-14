import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { withMask } from 'use-mask-input'
import { z } from 'zod'

import { updateUser } from '@/api/users/users'
import type { User, UserPayload } from '@/api/users/users.types'
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

interface UserInfoFormProps {
    user: User
    setOpen: (open: boolean) => void
}

const userInfoSchema = z.object({
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
    position: z.string({
        required_error: "Це поле є обов'язковим"
    }),
    company: z.string({
        required_error: "Це поле є обов'язковим"
    }),
    phone_number: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим")
})

type UserInfoFormValues = z.infer<typeof userInfoSchema>

export const UserInfoForm = ({ user, setOpen }: UserInfoFormProps) => {
    const queryClient = useQueryClient()
    const form = useForm({
        values: {
            company: user.company || '',
            position: user.position || '',
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            email: user.email || '',
            phone_number: user.phone_number || ''
        },
        resolver: zodResolver(userInfoSchema)
    })

    const patchUserMutation = useMutation({
        mutationFn: (data: Partial<UserPayload>) => updateUser(user.id, data),
        onSuccess: () => {
            setOpen(false)
            queryClient.invalidateQueries(['currentUser'])
        }
    })

    const onSubmit = (formData: UserInfoFormValues) => {
        patchUserMutation.mutate({
            ...formData,
            phone_number: formData.phone_number.replace(/\s/g, '')
        })
    }

    return (
        <Form {...form}>
            <form
                className='w-full space-y-4'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    disabled={patchUserMutation.isLoading}
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
                    disabled={patchUserMutation.isLoading}
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
                    disabled={patchUserMutation.isLoading}
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
                <FormField
                    disabled={patchUserMutation.isLoading}
                    control={form.control}
                    name='company'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Компанія</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Flowers Shop'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={patchUserMutation.isLoading}
                    control={form.control}
                    name='position'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Посада</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Менеджер'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    className='w-full'
                    disabled={patchUserMutation.isLoading}
                    type='submit'
                >
                    {patchUserMutation.isLoading ? (
                        <Loader2 className='animate-spin' />
                    ) : (
                        'Змінити'
                    )}
                </Button>
            </form>
        </Form>
    )
}
