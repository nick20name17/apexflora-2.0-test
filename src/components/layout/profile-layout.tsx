import { LayoutDashboard, LogOut, PercentCircle, Settings, UserIcon } from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

import { DeliveryIcon, HeartIcon } from '../icons'
import { ScrollArea } from '../ui/scroll-area'
import { Skeleton } from '../ui/skeleton'

import { Header } from './header'
import { adminRoutes, routes } from '@/config/routes'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'
import { ErrorPage } from '@/pages/error/error-page'

export const ProfileLayout = () => {
    return (
        <div className='flex min-h-screen flex-col'>
            <Header />
            <main className='flex-1 bg-secondary'>
                <ErrorBoundary
                    onReset={() => window.location.reload()}
                    FallbackComponent={ErrorPage}
                >
                    <div className='flex h-[calc(100vh-70px)]'>
                        <ProfileSidebar />
                        <ScrollArea className='flex-1'>
                            <div className='pt-5 lg:p-5'>
                                <Outlet />
                            </div>
                        </ScrollArea>
                    </div>
                </ErrorBoundary>
            </main>
        </div>
    )
}

const ProfileSidebar = () => {
    const { getCurrentUserRole, logOut, currentUser, isLoadingUser } = useAuth()
    const isUser = getCurrentUserRole('client')
    const { pathname } = useLocation()

    return (
        <aside className='hidden w-[300px] flex-shrink-0 bg-background lg:flex-col xl:flex'>
            <div className='flex h-24 items-center gap-x-2.5 bg-primary p-4 text-background'>
                <UserIcon className='size-8 flex-shrink-0' />
                {isLoadingUser ? (
                    <Skeleton className='h-8 w-full bg-muted/50' />
                ) : (
                    <div className='flex flex-col gap-y-0.5 leading-none'>
                        <span className='text-lg'>
                            {currentUser?.first_name + ' ' + currentUser?.last_name}
                        </span>
                        <span className='text-sm'>{currentUser?.email}</span>
                    </div>
                )}
            </div>

            <nav className='flex flex-1 flex-col px-4 py-6'>
                <ul className='flex flex-1 flex-col gap-y-2'>
                    {!isUser && (
                        <li
                            className={cn(
                                'cursor-pointer rounded-md text-muted transition-colors hover:bg-primary/10 hover:text-primary',
                                pathname === adminRoutes.orders &&
                                    'bg-primary text-background'
                            )}
                        >
                            <NavLink
                                className='flex items-center gap-x-2 p-3 text-sm'
                                to={adminRoutes.orders}
                            >
                                <LayoutDashboard className='size-5' />
                                Адмін
                            </NavLink>
                        </li>
                    )}
                    <li
                        className={cn(
                            'cursor-pointer rounded-md text-muted transition-colors hover:bg-primary/10 hover:text-primary',
                            pathname === routes.wishList && 'bg-primary text-background'
                        )}
                    >
                        <NavLink
                            className='flex items-center gap-x-2 p-3 text-sm'
                            to={routes.wishList}
                        >
                            <HeartIcon className='size-5' />
                            Збережені
                        </NavLink>
                    </li>
                    <li
                        className={cn(
                            'cursor-pointer rounded-md text-muted transition-colors hover:bg-primary/10 hover:text-primary',
                            pathname === routes.orders && 'bg-primary text-background'
                        )}
                    >
                        <NavLink
                            className='flex items-center gap-x-2 p-3 text-sm'
                            to={routes.orders}
                        >
                            <DeliveryIcon className='size-5' />
                            Мої замовлення
                        </NavLink>
                    </li>
                    <li
                        className={cn(
                            'cursor-pointer rounded-md text-muted transition-colors hover:bg-primary/10 hover:text-primary',
                            pathname === routes.settings && 'bg-primary text-background'
                        )}
                    >
                        <NavLink
                            className='flex items-center gap-x-2 p-3 text-sm'
                            to={routes.settings}
                        >
                            <Settings className='size-5' />
                            Налаштування
                        </NavLink>
                    </li>
                    <li
                        className={cn(
                            'cursor-pointer rounded-md text-muted transition-colors hover:bg-primary/10 hover:text-primary',
                            pathname === routes.loyalty && 'bg-primary text-background'
                        )}
                    >
                        <NavLink
                            className='flex items-center gap-x-2 p-3 text-sm'
                            to={routes.loyalty}
                        >
                            <PercentCircle className='size-5' />
                            Програма лояльності
                        </NavLink>
                    </li>
                    <li
                        className={cn(
                            'cursor-pointer rounded-md text-muted transition-colors hover:bg-primary/10 hover:text-primary',
                            pathname === routes.balance && 'bg-primary text-background'
                        )}
                    >
                        <NavLink
                            className='flex items-center gap-x-2 p-3 text-sm'
                            to={routes.balance}
                        >
                            Баланс
                        </NavLink>
                    </li>
                    <li
                        className={cn(
                            'cursor-pointer rounded-md text-muted transition-colors hover:bg-primary/10 hover:text-primary',
                            pathname === routes.adds && 'bg-primary text-background'
                        )}
                    >
                        <NavLink
                            className='flex items-center gap-x-2 p-3 text-sm'
                            to={routes.adds}
                        >
                            Рекламація
                        </NavLink>
                    </li>

                    <li className='mt-auto'>
                        <button
                            onClick={logOut}
                            className='flex w-full items-center gap-x-2 rounded-md p-3 text-sm text-muted transition-colors hover:bg-primary/10 hover:text-primary'
                        >
                            <LogOut className='size-5' />
                            Вийти
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
