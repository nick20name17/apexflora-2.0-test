import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toast } from 'sonner'
import { type infer as zodInfer } from 'zod'

import { passwordReset } from '@/api/passwords/passwords'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui//dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormSubmissionMessage
} from '@/components/ui//form'
import { Input } from '@/components/ui//input'
import { Button } from '@/components/ui/button'
import { emailSchema } from '@/config/schemas'
import { isErrorWithMessage } from '@/utils/is-error-with-message'

type ForgetPasswordFormData = zodInfer<typeof emailSchema>

export const ForgetPassword = () => {
    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const form = useForm<ForgetPasswordFormData>({
        defaultValues: {
            email: ''
        },
        resolver: zodResolver(emailSchema)
    })

    const passwordResetMutation = useMutation({
        mutationFn: passwordReset,
        onSuccess: () => {
            toast.success('Password reset', {
                description: `Посилання для відновлення пароля надіслано на пошту ${form.getValues().email}`
            })

            form.reset()
            setOpen(false)
        },
        onError: (error) => {
            const isErrorMessage = isErrorWithMessage(error)
            setErrorMessage(
                isErrorMessage ? error.response?.data?.detail : 'Щось пішло не так'
            )
        }
    })

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        if (event) {
            // sometimes not true, e.g. React Native
            if (typeof event.preventDefault === 'function') {
                event.preventDefault()
            }
            if (typeof event.stopPropagation === 'function') {
                // prevent any outer forms from receiving the event too
                event.stopPropagation()
            }
        }

        return form.handleSubmit(async (formData: ForgetPasswordFormData) => {
            passwordResetMutation.mutate(formData)
        })(event)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger
                type='button'
                className='text-sm text-primary transition-colors hover:text-accent'
            >
                Забули пароль?
            </DialogTrigger>
            <DialogContent className='mx-2 rounded-md'>
                <DialogHeader className='text-left'>
                    <DialogTitle>Відновлення пароля</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className='mx-auto w-full space-y-5'
                        onSubmit={onSubmit}
                    >
                        <FormField
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

                        <Button
                            disabled={passwordResetMutation.isLoading}
                            className='w-full'
                            type='submit'
                        >
                            {passwordResetMutation.isLoading ? (
                                <Loader2 className='animate-spin' />
                            ) : (
                                'Надіслати посилання'
                            )}
                        </Button>
                        {passwordResetMutation.isError ? (
                            <FormSubmissionMessage
                                variant='destructive'
                                message={errorMessage}
                            />
                        ) : null}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
