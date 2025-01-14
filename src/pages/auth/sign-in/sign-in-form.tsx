import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { ForgetPassword } from './forget-password'
import { login } from '@/api/auth/auth'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormSubmissionMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordWithReveal } from '@/components/ui/password-with-reveal'
import { DEFAULT_LOGIN_REDIRECT, routes } from '@/config/routes'
import { emailSchema, passwordShape } from '@/config/schemas'
import { isErrorWithMessage } from '@/utils/is-error-with-message'

const signInSchema = z.object({
    ...emailSchema.shape,
    ...passwordShape
})

type SignInFormData = z.infer<typeof signInSchema>

export const SignInForm = () => {
    const [errorMessage, setErrorMessage] = useState('')

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            localStorage.setItem('accessToken', data.access)
            localStorage.setItem('refreshToken', data.refresh)
            localStorage.setItem('user', JSON.stringify(data.user))
            navigate(DEFAULT_LOGIN_REDIRECT)
        },
        onError: (error) => {
            const isErrorMessage = isErrorWithMessage(error)
            setErrorMessage(
                isErrorMessage ? error.response?.data?.detail : 'Щось пішло не так'
            )
        }
    })

    const navigate = useNavigate()

    const form = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(signInSchema)
    })

    const onSubmit = (formData: SignInFormData) => {
        loginMutation.mutate(formData)
    }

    return (
        <>
            <Form {...form}>
                <form
                    className='space-y-4'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        disabled={loginMutation.isLoading}
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
                        disabled={loginMutation.isLoading}
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <PasswordWithReveal {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <ForgetPassword />
                    <Button
                        className='w-full'
                        disabled={loginMutation.isLoading}
                        type='submit'
                    >
                        {loginMutation.isLoading ? (
                            <Loader2 className='size-4 animate-spin' />
                        ) : (
                            'Продовжити'
                        )}
                    </Button>
                    {loginMutation.isError ? (
                        <FormSubmissionMessage
                            variant='destructive'
                            message={errorMessage}
                        />
                    ) : null}
                </form>
            </Form>

            <div className='mt-4 text-center text-sm text-muted-foreground'>
                Новий користувач?{' '}
                <Link
                    className='text-primary transition-colors hover:text-accent'
                    to={routes.signUp}
                >
                    Зареєструйтесь
                </Link>
            </div>
        </>
    )
}
