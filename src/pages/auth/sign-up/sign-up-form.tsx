import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { withMask } from 'use-mask-input'
import { z } from 'zod'

import { signUp } from '@/api/auth/auth'
import { CitySelect } from '@/components/city-select'
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
import { routes } from '@/config/routes'
import { emailSchema, passwordSchema } from '@/config/schemas'
import { isErrorWithMessage } from '@/utils/is-error-with-message'

export const signUpSchema = z.object({
    ...emailSchema.shape,
    ...passwordSchema.shape,
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
    city: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим"),
    phone_number: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим")
})

type SignUpFormData = z.infer<typeof signUpSchema>

export const SignUpForm = () => {
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const form = useForm<SignUpFormData>({
        defaultValues: {
            email: '',
            first_name: '',
            last_name: '',
            phone_number: '',
            password: '',
            city: ''
        },
        resolver: zodResolver(signUpSchema)
    })

    const signUpMutation = useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            navigate(routes.home, {
                state: {
                    isSignUp: true
                }
            })
        },
        onError: (error) => {
            const isErrorMessage = isErrorWithMessage(error)
            setErrorMessage(
                isErrorMessage ? error.response?.data?.detail : 'Щось пішло не так'
            )
        }
    })

    const onSubmit = (formData: SignUpFormData) => {
        signUpMutation.mutate({
            ...formData,
            phone_number: formData.phone_number.replace(/\s/g, '')
        })
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='grid w-full grid-cols-2 gap-4 max-md:grid-cols-1'>
                        <div className='space-y-4'>
                            <FormField
                                disabled={signUpMutation.isLoading}
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Електронна пошта</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='nickname@gmail.com'
                                                type='email'
                                                inputMode='email'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                disabled={signUpMutation.isLoading}
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
                                disabled={signUpMutation.isLoading}
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
                        </div>
                        <div className='space-y-4'>
                            <FormField
                                disabled={signUpMutation.isLoading}
                                control={form.control}
                                name='city'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Місто</FormLabel>
                                        <FormControl>
                                            <CitySelect
                                                city={field.value}
                                                setCity={field.onChange}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                disabled={signUpMutation.isLoading}
                                control={form.control}
                                name='phone_number'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Номер телефону</FormLabel>
                                        <FormControl ref={withMask('+380 99 999 9999')}>
                                            <Input
                                                type='tel'
                                                inputMode='tel'
                                                placeholder='+380 000 000 0000'
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                disabled={signUpMutation.isLoading}
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
                        </div>
                    </div>
                    <Button
                        className='mt-5 w-full'
                        disabled={signUpMutation.isLoading}
                        type='submit'
                    >
                        {signUpMutation.isLoading ? (
                            <Loader2 className='animate-spin' />
                        ) : (
                            'Продовжити'
                        )}
                    </Button>
                    {signUpMutation.isError ? (
                        <FormSubmissionMessage
                            variant='destructive'
                            message={errorMessage}
                        />
                    ) : null}
                </form>
            </Form>

            <div className='mt-4 text-center text-sm text-muted-foreground'>
                Вже зареєстровані?{' '}
                <Link
                    className='text-primary transition-colors hover:text-accent'
                    to={routes.signIn}
                >
                    Увійти
                </Link>
            </div>
        </>
    )
}
