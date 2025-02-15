import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { withMask } from 'use-mask-input'
import z from 'zod'

import { postContact } from '@/api/contacts/contacts'
import { CalendarIcon, CallIcon, SmsIcon } from '@/components/icons'
import { Socials } from '@/components/socials'
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
import { Textarea } from '@/components/ui/textarea'

export const Contact = () => {
    return (
        <section
            className='container mt-15 max-md:px-0'
            id='contact'
        >
            <div className='relative min-h-[720px] rounded-2xl bg-flower bg-cover bg-no-repeat py-8 max-md:pb-0 lg:px-10 xl:p-15'>
                <div className='absolute inset-0 rounded-2xl bg-foreground/70'></div>

                <div className='relative z-10 flex min-h-full flex-col items-start justify-between gap-8 lg:flex-row'>
                    <div className='flex flex-col justify-between max-lg:px-10 max-md:px-4 lg:min-h-[calc(720px-3.75rem)]'>
                        <div>
                            <div>
                                <h2 className='text-xl text-background md:text-2xl'>
                                    Наші контакти
                                </h2>
                                <p className='mt-1 text-muted max-md:text-sm'>
                                    Ми завжди раді допомогти! Якщо у вас є питання або ви
                                    хочете отримати додаткову інформацію про наші продукти
                                    та послуги, не соромтесь звертатися до нас.
                                </p>
                            </div>
                            <div className='mt-10 flex flex-wrap items-start gap-x-5 gap-y-5 xl:gap-x-10'>
                                <div>
                                    <div className='flex size-8 items-center justify-center rounded-full bg-background/10'>
                                        <CallIcon className='size-4 text-background' />
                                    </div>
                                    <h4 className='mt-1.5 text-background'>
                                        Номер телефону
                                    </h4>
                                    <div className='mt-1.5 flex flex-col gap-y-1.5'>
                                        <Link
                                            className='text-muted transition-colors hover:text-background'
                                            to='tel:+380679999569'
                                        >
                                            067 999 95 69
                                        </Link>
                                        <Link
                                            className='text-muted transition-colors hover:text-background'
                                            to='tel:+380679999569'
                                        >
                                            067 999 95 69
                                        </Link>
                                        <Link
                                            className='text-muted transition-colors hover:text-background'
                                            to='tel:+380679999569'
                                        >
                                            067 999 95 69
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex size-8 items-center justify-center rounded-full bg-background/10'>
                                        <SmsIcon className='size-4 text-background' />
                                    </div>
                                    <h4 className='mt-1.5 text-background'>Наша пошта</h4>
                                    <div className='mt-1.5 flex flex-col gap-y-1.5'>
                                        <Link
                                            className='text-muted transition-colors hover:text-background'
                                            to='mailto: admin@apexflora.ua'
                                        >
                                            admin@apexflora.ua
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex size-8 items-center justify-center rounded-full bg-background/10'>
                                        <CalendarIcon className='size-4 text-background' />
                                    </div>
                                    <h4 className='mt-1.5 text-background'>
                                        Графік роботи
                                    </h4>
                                    <div className='mt-1.5 flex flex-col gap-y-1.5'>
                                        <span className='text-muted'>
                                            пн - сб 09:00 - 18:00
                                        </span>
                                        <span className='text-muted'>
                                            нд 09:00 - 17:00
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Socials
                            className='mt-10'
                            socilasClassName='text-background'
                            titleClassName='text-background'
                        />
                    </div>
                    <ContactForm />
                </div>
            </div>
        </section>
    )
}

const contactSchema = z.object({
    name: z.string().min(1, "Це поле є обов'язковим"),
    email: z.string().email({
        message: 'Введіть дійсну адресу електронної пошти'
    }),
    phone_number: z.string().min(1, "Це поле є обов'язковим"),
    // text: z
    //     .string()
    //     .optional()
    //     .refine(
    //         (value) => {
    //             if (value === undefined || value === '') {
    //                 return true
    //             }
    //             return value.length >= 10 && value.length <= 150
    //         },
    //         {
    //             message: 'Повідомлення має бути від 10 до 150 символів'
    //         }
    //     ),
    text: z
        .string()
        .min(10, 'Мін. довжина повідомлення - 10 символів')
        .max(150, 'Макс. довжина повідомлення - 150 символів')
})

type ContactFormData = z.infer<typeof contactSchema>

const ContactForm = () => {
    const form = useForm<ContactFormData>({
        defaultValues: {
            name: '',
            email: '',
            phone_number: '',
            text: ''
        },
        resolver: zodResolver(contactSchema)
    })

    const contactMutation = useMutation({
        mutationFn: postContact,
        onSuccess: () => {
            form.reset()
        }
    })

    const onSubmit = (data: ContactFormData) => {
        contactMutation.mutate({
            ...data,
            phone_number: data.phone_number.replace(/\s/g, '')
        })
    }

    return (
        <div className='h-full min-h-full rounded-xl bg-background px-3 py-5 md:p-8 xl:px-10'>
            <h2 className='text-xl font-medium md:text-2xl'>Зв'язатися з нами</h2>
            <p className='mt-1 font-book text-muted max-md:text-sm'>
                Скористайтесь формою для зв'язку нижче, і ми обов'язково відповімо на ваше
                повідомлення у найкоротший термін.
            </p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='mt-3 h-full space-y-3.5'
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ім’я*</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Андрій'
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
                                <FormLabel>Номер телефону*</FormLabel>
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
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Електронна пошта*</FormLabel>
                                <FormControl>
                                    <Input
                                        type='email'
                                        inputMode='email'
                                        placeholder='stepanenkoa@gmail.com'
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
                                <FormLabel>Повідомлення*</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder='Текстове повідомлення'
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={contactMutation.isLoading}
                        className='w-full bg-foreground hover:bg-foreground/90'
                        type='submit'
                    >
                        {contactMutation.isLoading ? (
                            <Loader2 className='animate-spin' />
                        ) : (
                            'Надіслати'
                        )}
                    </Button>
                    {contactMutation.isSuccess ? (
                        <FormSubmissionMessage
                            variant='success'
                            message='Ваше повідомлення відправлено!'
                        />
                    ) : null}

                    {contactMutation.isError ? (
                        <FormSubmissionMessage
                            variant='destructive'
                            message='Щось пішло не так, спробуйте ще раз!'
                        />
                    ) : null}
                </form>
            </Form>
        </div>
    )
}
