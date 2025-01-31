import { CirclePlus, Lock, MapPin, User } from 'lucide-react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

import { getCoworkers } from '@/api/coworkers/coworkers'
import type { Coworker } from '@/api/coworkers/coworkers.types'
import { getDeliverAddress } from '@/api/deliver-address/deliver-address'
import type { DeliverAddress } from '@/api/deliver-address/deliver-address.types'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible'
import { Skeleton } from '@/components/ui/skeleton'
import { routes } from '@/config/routes'
import { useAuth } from '@/hooks/use-auth'
import { ChangePasswordForm } from './forms/change-password-form'
import { DeliverAddressForm } from './forms/deliver-address-form'
import { OrdersCoworkerForm } from './forms/orders-coworker-form'
import { UserInfoForm } from './forms/user-info-form'
import { EditAddressModal, RemoveAddressModal } from './modals/address-modal'
import { EditCoworkerModal, RemoveCoworkerModal } from './modals/coworker-modal'

const SettingsPage = () => {
    const { currentUser, isLoadingUser } = useAuth()

    const userManager = currentUser?.service_manager

    return (
        <section className='relative size-full overflow-hidden rounded-xl border bg-background p-3 xl:p-6'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to={routes.home}>Головна</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Налаштування</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className='py-4 text-2xl'>Налаштування</h1>

            <div className='flex flex-col gap-y-4'>
                <div className='flex flex-wrap items-center gap-8 rounded-lg border border-secondary p-3 max-sm:flex-col max-sm:items-start bg-[#F9F9F9]'>
                    {isLoadingUser ? (
                        <Skeleton className='h-48 w-full lg:h-32' />
                    ) : (
                        <div className='flex h-48 w-full items-start justify-between gap-6 max-lg:flex-col lg:h-32'>
                            <div className='flex h-full flex-col justify-around'>
                                <div className='flex flex-col'>
                                    <span className='text-sm text-foreground/60'>
                                        Ваш персональний менеджер
                                    </span>
                                    <span>
                                        {userManager?.first_name +
                                            ' ' +
                                            userManager?.last_name}
                                    </span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-sm text-foreground/60'>
                                        Номер телефону для контакту з менеджером
                                    </span>
                                    <Link
                                        className='transition-colors hover:text-accent'
                                        to='tel:+380679999569'
                                    >
                                        <span>{userManager?.phone_number}</span>
                                    </Link>
                                </div>
                            </div>
                            <div className='flex flex-col max-sm:w-full'>
                                <span className='text-sm text-foreground/60'>
                                    Соціальні мережі Apex Flora
                                </span>
                                <ul className='flex w-full items-center gap-x-5'>
                                    <li className='h-11'>
                                        <Link
                                            className='flex size-full items-center justify-center gap-x-1 rounded-lg text-xs sm:text-sm'
                                            to='/'
                                            target='_blank'
                                        >
                                            <ReactSVG src='/icons/telegram.svg' />
                                            <span>Telegram</span>
                                        </Link>
                                    </li>
                                    <li className='h-11'>
                                        <Link
                                            className='flex size-full items-center justify-center gap-x-1 rounded-lg text-xs sm:text-sm'
                                            to='https://www.instagram.com/apexflora.ua/'
                                            target='_blank'
                                        >
                                            <ReactSVG src='/icons/Instagram.svg' />
                                            <span>Instagram</span>
                                        </Link>
                                    </li>
                                    <li className='h-11'>
                                        <Link
                                            className='flex size-full items-center justify-center gap-x-1 rounded-lg text-xs sm:text-sm'
                                            to='/'
                                            target='_blank'
                                        >
                                            <ReactSVG src='/icons/facebook.svg' />
                                            <span>Facebook</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <UsersInfo />
                <OrdersCoworkers />
                <DeliverAddress />
                <ChangePassword />
            </div>
        </section>
    )
}

const UsersInfo = () => {
    const [open, setOpen] = useState(false)

    const { currentUser } = useAuth()

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className='rounded-lg border border-secondary p-3 max-lg:flex-col-reverse max-lg:items-start bg-[#F9F9F9]'
        >
            <CollapsibleTrigger className='flex w-full items-center justify-between gap-x-4'>
                <h2 className='flex items-center gap-x-2'>
                    <User className='size-6' /> <span>Особисті дані</span>
                </h2>
                <Button
                    onClick={() => setOpen(!open)}
                    size='icon'
                    variant='ghost'
                >
                    <svg
                        width='20'
                        height='20'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M9.16699 1.66663H7.50033C3.33366 1.66663 1.66699 3.33329 1.66699 7.49996V12.5C1.66699 16.6666 3.33366 18.3333 7.50033 18.3333H12.5003C16.667 18.3333 18.3337 16.6666 18.3337 12.5V10.8333'
                            stroke='#8A8A8A'
                            stroke-width='1.5'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                        <path
                            d='M13.3666 2.51663L6.7999 9.0833C6.5499 9.3333 6.2999 9.82497 6.2499 10.1833L5.89157 12.6916C5.75823 13.6 6.3999 14.2333 7.30823 14.1083L9.81657 13.75C10.1666 13.7 10.6582 13.45 10.9166 13.2L17.4832 6.6333C18.6166 5.49997 19.1499 4.1833 17.4832 2.51663C15.8166 0.849966 14.4999 1.3833 13.3666 2.51663Z'
                            stroke='#8A8A8A'
                            stroke-width='1.5'
                            stroke-miterlimit='10'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                        <path
                            d='M12.4248 3.45837C12.9831 5.45004 14.5415 7.00837 16.5415 7.57504'
                            stroke='#8A8A8A'
                            stroke-width='1.5'
                            stroke-miterlimit='10'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                    </svg>
                </Button>
            </CollapsibleTrigger>
            <div className='mt-3 border-t border-t-secondary pt-3'>
                {open ? null : <UserInfo />}
                <CollapsibleContent>
                    <UserInfoForm
                        user={currentUser!}
                        setOpen={setOpen}
                    />
                </CollapsibleContent>
            </div>
        </Collapsible>
    )
}

const UserInfo = () => {
    const { currentUser, isLoadingUser } = useAuth()

    if (isLoadingUser) return <Skeleton className='h-[44px] w-full' />

    return (
        <div className='flex w-full flex-wrap items-center justify-between gap-6 max-sm:flex-col max-sm:items-start '>
            <div className='flex flex-col'>
                <span className='text-sm text-foreground/60'>Ім’я</span>
                <span>{currentUser?.first_name}</span>
            </div>
            <div className='flex flex-col'>
                <span className='text-sm text-foreground/60'>Прізвище</span>
                <span>{currentUser?.last_name}</span>
            </div>
            <div className='flex flex-col'>
                <span className='text-sm text-foreground/60'>Номер телефону</span>
                <Link
                    className='transition-colors hover:text-accent'
                    to='tel:+380679999569'
                >
                    <span>{currentUser?.phone_number}</span>
                </Link>
            </div>
            <div className='flex flex-col'>
                <span className='text-sm text-foreground/60'>Електронна пошта</span>
                <Link
                    className='transition-colors hover:text-accent'
                    to='mailto:apexflora.ua@gmail.com'
                >
                    <span>{currentUser?.email}</span>
                </Link>
            </div>
            <div className='flex flex-col'>
                <span className='text-sm text-foreground/60'>Компанія</span>
                <span>{currentUser?.company}</span>
            </div>
        </div>
    )
}

const OrdersCoworkers = () => {
    const [open, setOpen] = useState(false)

    const { currentUser } = useAuth()

    const userId = currentUser?.id!

    const { data, isLoading } = useQuery({
        queryKey: ['coworkers', userId],
        queryFn: () => getCoworkers({ creator: userId })
    })

    const userCoworkers = data?.results || []

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className='rounded-lg border border-secondary p-3 max-lg:flex-col-reverse max-lg:items-start bg-[#F9F9F9]'
        >
            <CollapsibleTrigger className='flex w-full items-center justify-between gap-x-4'>
                <h2 className='flex items-center gap-x-2'>
                    <User className='size-6' /> Отримувач замовлень
                </h2>
                <Button
                    className='text-muted-foreground'
                    onClick={() => setOpen(!open)}
                    size='icon'
                    variant='ghost'
                >
                    <CirclePlus />
                </Button>
            </CollapsibleTrigger>
            <div className='mt-3 border-t border-t-secondary pt-3'>
                {open ? null : (
                    <div className='flex w-full flex-col gap-y-4'>
                        {isLoading ? (
                            <>
                                <Skeleton className='h-[44px] w-full' />
                            </>
                        ) : (
                            userCoworkers?.map((coworker) => (
                                <OrdersCoworker
                                    key={coworker.id}
                                    coworker={coworker}
                                />
                            ))
                        )}
                    </div>
                )}
                {userCoworkers?.length || isLoading ? (
                    ''
                ) : (
                    <div className='h-[44px] text-foreground/60'>
                        Додайте отримувача замовлень
                    </div>
                )}
                <CollapsibleContent>
                    <OrdersCoworkerForm setOpen={setOpen} />
                </CollapsibleContent>
            </div>
        </Collapsible>
    )
}

const OrdersCoworker = ({ coworker }: { coworker: Coworker }) => {
    return (
        <div className='flex items-center justify-between gap-x-10 border-b border-b-secondary max-sm:items-start max-sm:rounded-md max-sm:border max-sm:p-3 sm:pb-3 sm:last:border-none sm:last:pb-0'>
            <div className='flex items-center gap-x-10 gap-y-6 max-sm:flex-col max-sm:items-start'>
                <div className='flex flex-col'>
                    <span className='text-sm text-foreground/60'>ПІБ</span>
                    <span>{coworker.first_name + ' ' + coworker.last_name}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-sm text-foreground/60'>Номер телефону</span>
                    <Link
                        className='transition-colors hover:text-accent'
                        to='tel:+380679999569'
                    >
                        <span>{coworker.phone_number}</span>
                    </Link>
                </div>
                <div className='flex flex-col'>
                    <span className='text-sm text-foreground/60'>Електронна пошта</span>
                    <Link
                        className='transition-colors hover:text-accent'
                        to='mailto:apexflora.ua@gmail.com'
                    >
                        <span>{coworker.email}</span>
                    </Link>
                </div>
            </div>
            <div className='flex items-center gap-x-2'>
                <EditCoworkerModal coworker={coworker} />
                <RemoveCoworkerModal coworker={coworker} />
            </div>
        </div>
    )
}

const DeliverAddress = () => {
    const [open, setOpen] = useState(false)

    const { currentUser } = useAuth()

    const userId = currentUser?.id!

    const { data, isLoading } = useQuery({
        queryKey: ['deliverAddress', userId],
        queryFn: () => getDeliverAddress({ creator: userId })
    })

    const deliverAddress = data?.results || []

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className='rounded-lg border border-secondary p-3 max-lg:flex-col-reverse max-lg:items-start bg-[#F9F9F9]'
        >
            <CollapsibleTrigger className='flex w-full items-center justify-between gap-x-4'>
                <h2 className='flex items-center gap-x-2'>
                    <MapPin className='size-6' /> Адреси доставки
                </h2>
                <Button
                    className='text-muted-foreground'
                    onClick={() => setOpen(!open)}
                    size='icon'
                    variant='ghost'
                >
                    <CirclePlus />
                </Button>
            </CollapsibleTrigger>
            <div className='mt-3 border-t border-t-secondary pt-3'>
                {deliverAddress.length || isLoading ? (
                    ''
                ) : (
                    <div className='h-[44px] text-foreground/60'>
                        Додайте адресу доставки
                    </div>
                )}

                {open ? null : (
                    <div className='flex w-full flex-col gap-y-4'>
                        {isLoading ? (
                            <>
                                <Skeleton className='h-[44px] w-full' />
                            </>
                        ) : (
                            deliverAddress?.map((deliverAddress) => (
                                <OrdersAddress
                                    key={deliverAddress.id}
                                    deliverAddress={deliverAddress}
                                />
                            ))
                        )}
                    </div>
                )}
                <CollapsibleContent>
                    <DeliverAddressForm setOpen={setOpen} />
                </CollapsibleContent>
            </div>
        </Collapsible>
    )
}

const OrdersAddress = ({ deliverAddress }: { deliverAddress: DeliverAddress }) => {
    return (
        <div className='flex items-center justify-between gap-x-10 border-b border-b-secondary max-sm:items-start max-sm:rounded-md max-sm:border max-sm:p-3 sm:pb-3 sm:last:border-none sm:last:pb-0'>
            <div className='flex items-center gap-x-10'>
                <div className='flex flex-col'>
                    <span className='text-sm text-foreground/60'>Адреса магазину</span>
                    <span>{deliverAddress.city + ', ' + deliverAddress.street}</span>
                </div>
            </div>
            <div className='flex items-center gap-x-2'>
                <EditAddressModal deliverAddress={deliverAddress} />
                <RemoveAddressModal deliverAddress={deliverAddress} />
            </div>
        </div>
    )
}

const ChangePassword = () => {
    const [open, setOpen] = useState(false)

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className='rounded-lg border border-secondary p-3 max-lg:flex-col-reverse max-lg:items-start bg-[#F9F9F9]'
        >
            <CollapsibleTrigger className='flex w-full items-center justify-between gap-x-4'>
                <h2 className='flex items-center gap-x-2'>
                    <Lock className='size-6' />
                    Змінити пароль
                </h2>
                <Button
                    onClick={() => setOpen(!open)}
                    size='icon'
                    variant='ghost'
                >
                    <svg
                        width='20'
                        height='20'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M9.16699 1.66663H7.50033C3.33366 1.66663 1.66699 3.33329 1.66699 7.49996V12.5C1.66699 16.6666 3.33366 18.3333 7.50033 18.3333H12.5003C16.667 18.3333 18.3337 16.6666 18.3337 12.5V10.8333'
                            stroke='#8A8A8A'
                            stroke-width='1.5'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                        <path
                            d='M13.3666 2.51663L6.7999 9.0833C6.5499 9.3333 6.2999 9.82497 6.2499 10.1833L5.89157 12.6916C5.75823 13.6 6.3999 14.2333 7.30823 14.1083L9.81657 13.75C10.1666 13.7 10.6582 13.45 10.9166 13.2L17.4832 6.6333C18.6166 5.49997 19.1499 4.1833 17.4832 2.51663C15.8166 0.849966 14.4999 1.3833 13.3666 2.51663Z'
                            stroke='#8A8A8A'
                            stroke-width='1.5'
                            stroke-miterlimit='10'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                        <path
                            d='M12.4248 3.45837C12.9831 5.45004 14.5415 7.00837 16.5415 7.57504'
                            stroke='#8A8A8A'
                            stroke-width='1.5'
                            stroke-miterlimit='10'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                    </svg>
                </Button>
            </CollapsibleTrigger>
            <div className='mt-3 border-t border-t-secondary pt-3'>
                <CollapsibleContent>
                    <ChangePasswordForm setOpen={setOpen} />
                </CollapsibleContent>
            </div>
        </Collapsible>
    )
}

export default SettingsPage
