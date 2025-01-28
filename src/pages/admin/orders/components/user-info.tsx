import { Info } from 'lucide-react'

import type { Order } from '@/api/orders/orders.types'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export const UserInfo = ({ order }: { order: Order }) => {
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
            <div className='flex gap-x-2'>
                <PopoverTrigger
                    asChild
                    onClick={(e) => e.stopPropagation()}
                >
                    <Button
                        variant='ghost'
                        size='icon'
                        className='size-7 rounded-full text-primary'
                    >
                        <Info />
                    </Button>
                </PopoverTrigger>
                <div className='max-w-52 space-y-1 text-left'>
                    <div className='text-xs'>Користувач / Отримувач</div>
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
                className='w-[600px]'
            >
                <h3 className='text-left text-lg font-medium text-primary'>
                    Інформація про користувача та отримувача
                </h3>
                <div className='mt-4 flex flex-col items-start gap-y-0.5'>
                    <span className='text-xs'>Адреса замовлення</span>
                    <span className='text-primary'>
                        {order?.address?.city
                            ? order?.address?.city + ', ' + order?.address?.street
                            : 'Самовивіз'}
                    </span>
                </div>
                <div className='mt-4 grid grid-cols-2 gap-4'>
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
