import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { withMask } from 'use-mask-input'
import { z, type infer as zodInfer } from 'zod'

import { AddCoworkerModal } from './add-coworker-modal'
import { getCoworkers } from '@/api/coworkers/coworkers'
import { getDeliverAddress } from '@/api/deliver-address/deliver-address'
import { addOrder } from '@/api/orders/orders'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'
import { AddAddressModal } from '@/pages/admin/orders/components/modals/add-address'
import { useAuth } from '@/providers/auth-provider'
import { isErrorWithMessage } from '@/utils/is-error-with-message'

const addOrderSchema = z.object({
    username: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим"),
    phone_number: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим"),
    address: z.coerce.number({
        required_error: "Це поле є обов'язковим"
    }),
    recepient: z.coerce.number({
        required_error: "Це поле є обов'язковим"
    })
})

type CartFormValues = zodInfer<typeof addOrderSchema>

export const CartForm = () => {
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    const currentUserUserId = currentUser?.id!

    const addOrderMutation = useMutation({
        mutationFn: addOrder,
        onSuccess: () => {
            navigate(routes.catalogue, {
                state: {
                    isOrdered: true
                }
            })
        },
        onError: (error) => {
            const isErrorMessage = isErrorWithMessage(error)
            toast.error(
                isErrorMessage ? error.response?.data?.detail : 'Щось пішло не так'
            )
        }
    })

    const [step, setStep] = useState(1)

    const { data: deliveryAddresses } = useQuery({
        queryKey: ['delivery-address', currentUserUserId],
        queryFn: () => getDeliverAddress({ creator: currentUserUserId })
    })

    const deliverAddress = deliveryAddresses?.results || []

    const { data: coworkers } = useQuery({
        queryKey: ['coworkers', currentUserUserId],
        queryFn: () => getCoworkers({ creator: currentUserUserId })
    })

    const userCoworkers = coworkers?.results || []

    const defaultAddressId = deliverAddress?.[deliverAddress?.length - 1]?.id

    const defaultUserCoworkerId = userCoworkers?.[userCoworkers?.length - 1]?.id

    const form = useForm<CartFormValues>({
        values: {
            username: currentUser?.first_name + ' ' + currentUser?.last_name,
            phone_number: currentUser?.phone_number || '',
            address: defaultAddressId,
            recepient: defaultUserCoworkerId
        },
        shouldFocusError: true,
        resolver: zodResolver(addOrderSchema)
    })

    const { address, phone_number, recepient, username } = form.watch()

    const onCheckout = (values: CartFormValues) => {
        addOrderMutation.mutate({
            creator: currentUserUserId,
            address: +values.address,
            recipient: +values.recepient,
            status: 'pending'
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onCheckout)}
                className='w-full min-w-[280px] space-y-4 rounded-lg bg-secondary p-5 lg:h-full lg:max-h-[calc(100%-80px)] lg:max-w-96'
            >
                <h2
                    className={cn(
                        'border-b border-b-primary pb-2 text-sm text-primary transition-opacity',
                        step === 1 ? '' : 'opacity-35'
                    )}
                >
                    1. Контактна інформація
                </h2>
                {step === 1 ? (
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Прізвище та ім’я</FormLabel>
                                    <FormControl>
                                        <Input
                                            readOnly
                                            className='border border-muted-foreground bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
                                            placeholder='Андрій Степаненко'
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
                                            readOnly
                                            className='border border-muted-foreground bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
                                            type='tel'
                                            inputMode='tel'
                                            placeholder='+380679999569'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            onClick={() => setStep(2)}
                            disabled={!phone_number || !username}
                            className='w-full'
                            type='button'
                        >
                            Продовжити
                        </Button>
                    </div>
                ) : null}

                <h2
                    className={cn(
                        'border-b border-b-primary pb-2 text-sm text-primary transition-opacity',
                        step === 2 ? '' : 'opacity-25'
                    )}
                >
                    2. Інформація про отримувача
                </h2>
                {step === 2 ? (
                    <FormField
                        control={form.control}
                        name='recepient'
                        render={({ field }) => (
                            <>
                                <FormItem>
                                    <FormLabel>Отримувач</FormLabel>
                                    <div className='flex items-center gap-x-2'>
                                        <Select
                                            disabled={deliverAddress.length === 0}
                                            onValueChange={field.onChange}
                                            value={field.value?.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    ref={field.ref}
                                                    className='h-12 truncate border border-muted-foreground bg-transparent'
                                                >
                                                    <div className='max-w-44 truncate'>
                                                        <SelectValue placeholder='Оберіть отримувача' />
                                                    </div>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {userCoworkers.map((userCoworker) => (
                                                    <SelectItem
                                                        className='truncate'
                                                        key={userCoworker.id}
                                                        value={userCoworker.id?.toString()}
                                                    >
                                                        {userCoworker.first_name +
                                                            ' ' +
                                                            userCoworker.last_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <AddCoworkerModal size='icon' />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                                <div className='flex items-center gap-x-4'>
                                    <Button
                                        className='flex-1'
                                        variant='outline'
                                        onClick={() => setStep(1)}
                                        type='button'
                                    >
                                        Назад
                                    </Button>
                                    <Button
                                        className='flex-1'
                                        onClick={() => setStep(3)}
                                        disabled={!recepient}
                                        type='button'
                                    >
                                        Продовжити
                                    </Button>
                                </div>
                            </>
                        )}
                    />
                ) : (
                    ''
                )}

                <h2
                    className={cn(
                        'border-b border-b-primary pb-2 text-sm text-primary transition-opacity',
                        step === 3 ? '' : 'opacity-25'
                    )}
                >
                    3. Доставка
                </h2>

                {step === 3 ? (
                    <FormField
                        control={form.control}
                        name='address'
                        render={({ field }) => (
                            <>
                                <FormItem>
                                    <FormLabel>Адреса доставки</FormLabel>
                                    <div className='flex items-center gap-x-2'>
                                        <Select
                                            disabled={deliverAddress.length === 0}
                                            onValueChange={field.onChange}
                                            value={field.value?.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    ref={field.ref}
                                                    className='h-12 truncate border border-muted-foreground bg-transparent'
                                                >
                                                    <div className='max-w-44 truncate'>
                                                        <SelectValue placeholder='Оберіть адресу доставки' />
                                                    </div>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {deliverAddress.map((deliverAddress) => (
                                                    <SelectItem
                                                        className='truncate'
                                                        key={deliverAddress.id}
                                                        value={deliverAddress.id?.toString()}
                                                    >
                                                        {deliverAddress.city},{' '}
                                                        {deliverAddress.street}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <AddAddressModal size='icon' />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                                <div className='flex items-center gap-x-4'>
                                    <Button
                                        className='flex-1'
                                        variant='outline'
                                        onClick={() => setStep(2)}
                                        type='button'
                                    >
                                        Назад
                                    </Button>
                                    <Button
                                        className='flex-1'
                                        disabled={!address || addOrderMutation.isLoading}
                                        type='submit'
                                    >
                                        {addOrderMutation.isLoading ? (
                                            <Loader2 className='animate-spin' />
                                        ) : (
                                            'Замовити'
                                        )}
                                    </Button>
                                </div>
                            </>
                        )}
                    />
                ) : (
                    ''
                )}
            </form>
        </Form>
    )
}
