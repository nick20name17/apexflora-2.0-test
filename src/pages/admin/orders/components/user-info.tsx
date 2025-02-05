import { Info } from 'lucide-react'

import type { Order } from '@/api/orders/orders.types'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'


interface UserInfoProps {
    order: Order
    short?: boolean
}

export const UserInfo = ({ order, short = false }: UserInfoProps) => {
    const creatorFullName =
        order?.creator?.first_name.charAt(0).toUpperCase().concat('.') +
        ' ' +
        order?.creator?.last_name

    const recipientFullName =
        order?.recipient?.first_name.charAt(0).toUpperCase().concat('.') +
        ' ' +
        order?.recipient?.last_name

    return (
        <Popover>
            <div className='flex gap-x-1 max-w-48 sm:max-w-56 truncate max-sm:text-xs'>
                <PopoverTrigger
                    asChild
                    onClick={(e) => e.stopPropagation()}
                >
                    <Button
                        variant='ghost'
                        size='icon'
                        className={
                            cn('rounded-full text-primary shrink-0', short ? 'size-5 [&_svg]:size-3' : 'size-7')
                        }
                    >
                        <Info />
                    </Button>
                </PopoverTrigger>
                <div className='max-w-full space-y-1 text-left truncate'>
                    {
                        short
                            ? <div className='text-xs'>Ко-вач/От-вач</div> : <div className='text-xs'>Користувач / Отримувач</div>
                    }
                    <div className='truncate text-primary'>
                        {creatorFullName} / {order?.recipient ? recipientFullName : '-'}
                    </div>
                </div>
            </div>
            <PopoverContent
                hideWhenDetached
                collisionBoundary={[document.getElementById('scroll-area')]}
                onClick={(e) => e.stopPropagation()}
                align='start'
                className='md:w-[600px] max-h-[500px] overflow-y-auto'
            >
                <h3 className='text-left md:text-lg font-medium text-primary'>
                    Інформація про користувача та отримувача
                </h3>
                <div className='mt-4 flex flex-col items-start gap-y-0.5'>
                    <span className='text-xs'>Адреса замовлення</span>
                    <span className='text-primary text-left'>
                        {order?.address?.city
                            ? order?.address?.city + ', ' + order?.address?.street
                            : 'Самовивіз'}
                    </span>
                </div>
                <div className='mt-4 grid-cols-1 grid md:grid-cols-2 gap-4'>
                    <div>
                        <h4 className='text-left font-medium text-primary'>Користувач</h4>
                        <div className='mt-2 grid gap-2'>
                            <div className='flex flex-col items-start gap-y-0.5'>
                                <span className='text-xs'>Ім'я та прізвище</span>
                                <span className='text-primary'>
                                    {order?.creator?.first_name +
                                        ' ' +
                                        order?.creator?.last_name}
                                </span>
                            </div>
                            <div className='flex flex-col items-start gap-y-0.5'>
                                <span className='text-xs'>Пошта</span>
                                <a
                                    href={`mailto:${order?.creator?.email}`}
                                    className='text-primary underline'
                                >
                                    {order.creator.email}
                                </a>
                            </div>
                            <div className='flex flex-col items-start gap-y-0.5'>
                                <span className='text-xs'>Телефон</span>
                                <a
                                    href={`tel:${order?.creator?.phone_number}`}
                                    className='text-primary underline'
                                >
                                    {order.creator.phone_number}
                                </a>
                            </div>
                            <div className='flex flex-col items-start gap-y-0.5'>
                                <span className='text-xs'>Місто</span>
                                <span className='text-primary'>{order.creator.city}</span>
                            </div>
                            <div className='flex flex-col items-start gap-y-0.5'>
                                <span className='text-xs'>Компанія</span>
                                <span className='text-primary'>
                                    {order.creator.company}
                                </span>
                            </div>
                            <div className='flex flex-col items-start gap-y-0.5'>
                                <span className='text-xs'>Відповідальний менеджер</span>
                                <span className='text-primary'>
                                    {order?.creator?.service_manager?.first_name +
                                        ' ' +
                                        order?.creator?.service_manager?.last_name}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4
                            className={cn(
                                'text-left font-medium',
                                order.recipient ? 'text-primary' : 'text-primary/50'
                            )}
                        >
                            {order.recipient ? 'Отримувач' : 'Отримувач відсутній'}
                        </h4>
                        {order.recipient ? (
                            <div className='mt-2 grid gap-2'>
                                <div className='flex flex-col items-start gap-y-0.5'>
                                    <span className='text-xs'>Ім'я та прізвище</span>
                                    <span className='text-primary'>
                                        {order?.recipient?.first_name +
                                            ' ' +
                                            order?.recipient?.last_name}
                                    </span>
                                </div>
                                <div className='flex flex-col items-start gap-y-0.5'>
                                    <span className='text-xs'>Пошта</span>
                                    <a
                                        href={`mailto:${order?.recipient?.email}`}
                                        className='text-primary underline'
                                    >
                                        {order?.recipient?.email}
                                    </a>
                                </div>
                                <div className='flex flex-col items-start gap-y-0.5'>
                                    <span className='text-xs'>Телефон</span>
                                    <a
                                        href={`tel:${order?.recipient?.phone_number}`}
                                        className='text-primary underline'
                                    >
                                        {order?.recipient?.phone_number}
                                    </a>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
