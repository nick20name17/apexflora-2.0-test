import {
    Infinity,
    ChartBarStacked,
    ChevronsUpDown,
    Contact,
    Flower,
    Flower2,
    LogOut,
    Palette,
    Percent,
    TicketPercent,
    UserMinus,
    UserPlus,
    Users
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { Avatar, AvatarFallback } from '../ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Logo } from '../ui/logo'
import {
    SidebarFooter,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from '../ui/sidebar'

import { Sidebar, SidebarContent, SidebarGroup } from '@/components/ui/sidebar'
import { adminRoutes, routes } from '@/config/routes'
import { useAuth } from '@/hooks/use-auth'

export const AdminSidebar = () => {
    const location = useLocation()

    const { state } = useSidebar()

    const { currentUser, logOut } = useAuth()

    const upperCaseInitials =
        currentUser?.first_name?.charAt(0)?.toUpperCase() ||
        '' + currentUser?.last_name?.charAt(0)?.toUpperCase() ||
        ''

    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader className='bg-primary'>
                <SidebarMenu>
                    <SidebarMenuItem className='pt-1 text-background'>
                        {state === 'collapsed' ? (
                            <Link
                                to={routes.home}
                                className='text-xl font-medium'
                            >
                                AF
                            </Link>
                        ) : (
                            <Logo className='max-w-14' />
                        )}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className='bg-primary text-background'>
                <SidebarGroup>
                    <SidebarGroupLabel className='text-background/40'>
                        Бонусні програми
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={
                                        location.pathname === adminRoutes.bonusLimits
                                    }
                                    asChild
                                >
                                    <Link to={adminRoutes.bonusLimits}>
                                        <Infinity />
                                        <span>Бонусні ліміти</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={
                                        location.pathname === adminRoutes.bonusPrograms
                                    }
                                    asChild
                                >
                                    <Link to={adminRoutes.bonusPrograms}>
                                        <Percent />
                                        <span>Бонусні програми</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className='text-background/40'>
                        Користувачі
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={location.pathname === adminRoutes.archive}
                                    asChild
                                >
                                    <Link to={adminRoutes.archive}>
                                        <UserMinus />
                                        <span>Архів</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={location.pathname === adminRoutes.contacts}
                                    asChild
                                >
                                    <Link to={adminRoutes.contacts}>
                                        <Contact />
                                        <span>Зворотній звязок</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={location.pathname === adminRoutes.users}
                                    asChild
                                >
                                    <Link to={adminRoutes.users}>
                                        <Users />
                                        <span>Користувачі</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className='text-background/40'>
                        Товари
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={location.pathname === adminRoutes.products}
                                    asChild
                                >
                                    <Link to={adminRoutes.products}>
                                        <Flower />
                                        <span>Товари</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={
                                        location.pathname === adminRoutes.categories
                                    }
                                    asChild
                                >
                                    <Link to={adminRoutes.categories}>
                                        <ChartBarStacked />
                                        <span>Категорії</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={location.pathname === adminRoutes.colors}
                                    asChild
                                >
                                    <Link to={adminRoutes.colors}>
                                        <Palette />
                                        <span>Кольори</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={location.pathname === adminRoutes.producers}
                                    asChild
                                >
                                    <Link to={adminRoutes.producers}>
                                        <UserPlus />
                                        <span>Виробники</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={location.pathname === adminRoutes.discounts}
                                    asChild
                                >
                                    <Link to={adminRoutes.discounts}>
                                        <TicketPercent />
                                        <span>Знижки</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className='text-background/40'>
                        Замовлення
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={location.pathname === adminRoutes.orders}
                                    asChild
                                >
                                    <Link to={adminRoutes.orders}>
                                        <Flower2 />
                                        <span>Замовлення</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className='bg-primary text-background'>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size='lg'
                                    className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                                >
                                    <Avatar className='size-8'>
                                        <AvatarFallback className='bg-accent text-foreground'>
                                            {upperCaseInitials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className='grid flex-1 text-left text-sm leading-tight'>
                                        <span className='truncate font-semibold'>
                                            {currentUser?.first_name +
                                                ' ' +
                                                currentUser?.last_name}
                                        </span>
                                        <span className='truncate text-xs'>
                                            {currentUser?.email}
                                        </span>
                                    </div>
                                    <ChevronsUpDown className='ml-auto size-4' />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className='w-[--radix-dropdown-menu-trigger-width] min-w-56'
                                side='bottom'
                                align='end'
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className='p-0 font-normal'>
                                    <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                                        <Avatar className='size-8'>
                                            <AvatarFallback className='bg-accent text-foreground'>
                                                {upperCaseInitials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='grid flex-1 text-left text-sm leading-tight'>
                                            <span className='truncate font-semibold'>
                                                {currentUser?.first_name +
                                                    ' ' +
                                                    currentUser?.last_name}
                                            </span>
                                            <span className='truncate text-xs'>
                                                {currentUser?.email}
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem onClick={logOut}>
                                    <LogOut className='mr-2 size-4' />
                                    Вийти з аккаунту
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
