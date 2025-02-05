import {
    Bezier,
    DiscountShape,
    EmojiSad,
    Heart,
    Login,
    Setting2,
    SidebarRight,
    User,
    Wallet
} from 'iconsax-react'
import { ErrorBoundary } from 'react-error-boundary'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

import { Header } from './header'
import { Button } from '@/components//ui/button'
import { ScrollArea } from '@/components//ui/scroll-area'
import { Skeleton } from '@/components//ui/skeleton'
import { DeliveryIcon } from '@/components/icons'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
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
                    <div className='flex h-[calc(100vh-70px)] max-xl:flex-col'>
                        <ProfileSidebar className='hidden lg:flex-col xl:flex' />
                        <div className='p-4 xl:hidden'>
                            <MobileProfileNav />
                        </div>
                        <ScrollArea className='flex-1'>
                            <div className='lg:p-5'>
                                <Outlet />
                            </div>
                        </ScrollArea>
                    </div>
                </ErrorBoundary>
            </main>
        </div>
    )
}

const MobileProfileNav = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size='sm'
                    variant='outline'
                >
                    <SidebarRight /> <span>Меню</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                className='w-fit p-0 text-background'
                side='left'
            >
                <SheetHeader className='sr-only'>
                    <SheetTitle>ProfilesSidebar</SheetTitle>
                </SheetHeader>
                <ProfileSidebar />
            </SheetContent>
        </Sheet>
    )
}

const ProfileSidebar = ({ className }: { className?: string }) => {
    const { getCurrentUserRole, logOut, currentUser, isLoadingUser } = useAuth()
    const isUser = getCurrentUserRole('client')
    const { pathname } = useLocation()

    return (
        <aside className={cn('w-[300px] flex-shrink-0 bg-background', className)}>
            <div className='flex h-24 items-center gap-x-2.5 bg-primary p-4 text-background'>
                <User className='size-6 flex-shrink-0' />
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
                                <Bezier className='size-5' />
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
                            <Heart className='size-5' />
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
                            <Setting2 className='size-5' />
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
                            <DiscountShape className='size-5' />
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
                            <Wallet className='size-5' />
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
                            <EmojiSad className='size-5' />
                            Рекламація
                        </NavLink>
                    </li>

                    <li className='mt-auto'>
                        <button
                            onClick={logOut}
                            className='flex w-full items-center gap-x-2 rounded-md p-3 text-sm text-muted transition-colors hover:bg-primary/10 hover:text-primary'
                        >
                            <Login className='size-5 rotate-180' />
                            Вийти
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
