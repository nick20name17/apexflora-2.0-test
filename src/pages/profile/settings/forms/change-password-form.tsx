import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { z } from 'zod'

import { passwordChange } from '@/api/passwords/passwords'
import type { PasswordChangePayload } from '@/api/passwords/passwords.types'
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
import { newPasswordSchema, passwordShape } from '@/config/schemas'
import { useAuth } from '@/hooks/use-auth'

const changePasswordSchema = z
    .object({
        old_password: passwordShape.password,
        ...newPasswordSchema.shape
    })
    .refine((data) => data.new_password1 === data.new_password2, {
        message: 'Паролі не співпадають',
        path: ['new_password2']
    })

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

interface ChangePasswordFormProps {
    setOpen: (open: boolean) => void
}

export const ChangePasswordForm = ({ setOpen }: ChangePasswordFormProps) => {
    const queryClient = useQueryClient()
    const form = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema)
    })

    const { currentUser } = useAuth()

    const passwordChangeMutation = useMutation({
        mutationFn: (data: PasswordChangePayload) =>
            passwordChange(currentUser?.id!, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['currentUser'])
            setOpen(false)
        }
    })

    const onSubmit = (formData: ChangePasswordFormData) => {
        passwordChangeMutation.mutate(formData)
    }

    return (
        <Form {...form}>
            <form
                className='w-full space-y-4'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    disabled={passwordChangeMutation.isLoading}
                    control={form.control}
                    name='old_password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Старий пароль</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='••••••••'
                                    type='text'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={passwordChangeMutation.isLoading}
                    control={form.control}
                    name='new_password1'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Новий пароль</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='••••••••'
                                    type='text'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={passwordChangeMutation.isLoading}
                    control={form.control}
                    name='new_password2'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Підведження нового паролю</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='••••••••'
                                    type='text'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    className='w-full'
                    disabled={passwordChangeMutation.isLoading}
                    type='submit'
                >
                    {passwordChangeMutation.isLoading ? (
                        <Loader2 className='animate-spin' />
                    ) : (
                        'Змінити'
                    )}
                </Button>
            </form>
        </Form>
    )
}
