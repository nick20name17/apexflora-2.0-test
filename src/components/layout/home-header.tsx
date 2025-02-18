import { Calendar, Call, Heart, Sms } from 'iconsax-react'
import { useLayoutEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

import { HeaderCatalogue } from '../header-catalogue'
import { CallIcon, ShoppingCartIcon } from '../icons'

import { getShopProducts } from '@/api/shop-products/shop-products'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Logo } from '@/components/ui/logo'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import { routes } from '@/config/routes'
import { useCartOperations } from '@/hooks/use-cart-operations'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

export const HomeHeader = () => {
    const [catalogueOpen, setCatalogueOpen] = useState(false)
    const [contactOpen, setContactOpen] = useState(false)

    const { data: wishList } = useQuery({
        queryKey: ['wishList'],
        queryFn: () =>
            getShopProducts({
                limit: 200,
                in_wish_list: true
            })
    })

    const [isScrolled, setIsScrolled] = useState(false)

    useLayoutEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const { cartCount } = useCartOperations()

    return (
        <header
            className={cn(
                'sticky left-0 right-0 top-0 !z-50 transition-all',
                isScrolled
                    ? 'shadow-sm before:absolute before:inset-0 before:bg-[#FFFEFC]/80 before:backdrop-blur-lg'
                    : ''
            )}
        >
            <div className='container'>
                <div
                    className={cn(
                        'relative mt-4 flex h-[70px] items-center justify-between gap-x-1 px-4 py-2.5 transition-all before:absolute before:inset-0 before:top-0 before:-z-10 before:rounded-xl before:bg-[#FFFEFC]/80 before:backdrop-blur-lg max-md:h-16 max-md:before:bg-background/80 md:px-8 md:py-4',
                        isScrolled ? 'mt-0 before:!rounded-none' : '',
                        catalogueOpen || contactOpen ? 'before:rounded-b-none' : ''
                    )}
                >
                    <div className='flex items-center gap-x-2 md:gap-x-6'>
                        <Logo className='max-md:w-10' />
                        <HeaderCatalogue
                            open={catalogueOpen}
                            setOpen={setCatalogueOpen}
                        />
                    </div>

                    <div className='flex items-center gap-x-1 md:gap-x-2'>
                        <HeaderContact />

                        <HeaderContactMobile
                            isScrolled={isScrolled}
                            open={contactOpen}
                            setOpen={setContactOpen}
                        />

                        <Button
                            className='max-md:size-10 max-md:[&>span]:hidden'
                            variant='ghost'
                            asChild
                        >
                            <Link to={routes.settings}>
                                <ReactSVG
                                    src='/icons/user.svg'
                                    className='size-5 stroke-foreground'
                                />
                                <span className='font-book'>Кабінет</span>
                            </Link>
                        </Button>
                        <Button
                            className='text-foreground max-md:size-10 max-md:[&>span]:hidden'
                            variant='ghost'
                            asChild
                        >
                            <Link to={routes.wishList}>
                                <div className='relative'>
                                    <Heart />
                                    <div className='absolute -right-2 -top-2 flex size-3.5 items-center justify-center rounded-full bg-accent text-xs'>
                                        {wishList?.count ?? 0}
                                    </div>
                                </div>
                                <span className='font-book'>Обране</span>
                            </Link>
                        </Button>
                        <Button
                            className='text-foreground max-md:size-10 max-md:[&>span]:hidden'
                            variant='ghost'
                            asChild
                        >
                            <Link to={routes.cart}>
                                <div className='relative'>
                                    <ShoppingCartIcon />
                                    <div className='absolute -right-2 -top-2 flex size-3.5 items-center justify-center rounded-full bg-accent text-xs'>
                                        {cartCount}
                                    </div>
                                </div>
                                <span className='font-book'>Кошик</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

const HeaderContact = () => {
    const isTablet = useMediaQuery('(max-width: 768px)')

    const isLg = useMediaQuery('(max-width: 1024px)')

    return isTablet ? null : (
        <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
                <Button
                    className='font-book max-md:size-10 max-md:[&>span]:hidden'
                    variant='ghost'
                >
                    <CallIcon className='text-foreground md:hidden' />
                    <span> Контакти</span>
                </Button>
            </HoverCardTrigger>
            <HoverCardContent
                className='h-screen sm:h-fit sm:w-[432px]'
                align={isLg ? 'start' : 'center'}
            >
                <h3 className='text-2xl leading-none'>Контакти</h3>
                <div className='mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2'>
                    <div className='rounded-lg border p-3'>
                        <div className='flex size-8 items-center justify-center rounded-full bg-foreground/10'>
                            <Call className='size-4' />
                        </div>
                        <h4 className='mt-1'>Номер телефону</h4>
                        <div className='flex flex-col space-y-0.5'>
                            <Link
                                className='text-muted transition-colors hover:text-primary hover:underline'
                                to='tel:+380679999569'
                            >
                                067 999 95 69
                            </Link>
                            <Link
                                className='text-muted transition-colors hover:text-primary hover:underline'
                                to='tel:+380679999569'
                            >
                                067 999 95 69
                            </Link>
                            <Link
                                className='text-muted transition-colors hover:text-primary hover:underline'
                                to='tel:+380679999569'
                            >
                                067 999 95 69
                            </Link>
                        </div>
                    </div>
                    <div className='rounded-lg border p-3'>
                        <div className='flex size-8 items-center justify-center rounded-full bg-foreground/10'>
                            <Calendar className='size-4' />
                        </div>
                        <h4 className='mt-1'>Графік роботи</h4>
                        <div className='text-muted'>пн - сб 09:00 - 18:00 </div>
                        <div className='text-muted'>нд 09:00 - 17:00</div>
                    </div>
                    <div className='rounded-lg border p-3 sm:col-span-2'>
                        <div className='flex size-8 items-center justify-center rounded-full bg-foreground/10'>
                            <Sms className='size-4' />
                        </div>
                        <h4 className='mt-1'>Наша пошта</h4>
                        <Link
                            className='text-muted transition-colors hover:text-primary hover:underline'
                            to='mailto:apexflora.ua@gmail.com'
                        >
                            apexflora.ua@gmail.com
                        </Link>
                    </div>
                    <div className='rounded-lg border p-3 sm:col-span-2'>
                        <h4>Соціальні мережі</h4>
                        <ul className='mt-1 flex items-center gap-x-2'>
                            <li className='h-10 w-full'>
                                <Link
                                    className='flex size-full items-center gap-x-1 text-sm text-muted transition-colors hover:text-primary hover:underline'
                                    to='/'
                                >
                                    <ReactSVG src='/icons/telegram.svg' />
                                    Telegram
                                </Link>
                            </li>
                            <li className='h-10 w-full'>
                                <Link
                                    className='flex size-full items-center gap-x-1 text-sm text-muted transition-colors hover:text-primary hover:underline'
                                    to='/'
                                >
                                    <ReactSVG src='/icons/Instagram.svg' />
                                    Instagram
                                </Link>
                            </li>
                            <li className='h-10 w-full'>
                                <Link
                                    className='flex size-full items-center gap-x-1 text-sm text-muted transition-colors hover:text-primary hover:underline'
                                    to='/'
                                >
                                    <ReactSVG src='/icons/facebook.svg' />
                                    Facebook
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

interface HeaderContactMobileProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    isScrolled: boolean
}

const HeaderContactMobile = ({ open, setOpen, isScrolled }: HeaderContactMobileProps) => {
    const isMobile = useMediaQuery('(max-width: 768px)')

    return isMobile ? (
        <Sheet
            open={open}
            onOpenChange={setOpen}
        >
            <SheetTrigger asChild>
                <Button
                    className='max-md:size-10 max-md:[&>span]:hidden'
                    variant={open ? 'accent' : 'ghost'}
                >
                    <CallIcon className='text-foreground md:hidden' />
                    <span> Контакти</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                closeHidden
                overlayClassName='!-z-50'
                className={cn(
                    'inset-x-4 top-20 !z-30 min-h-[460px] w-[calc(100vw-2rem)] rounded-b-xl bg-background/80 p-3 backdrop-blur-lg md:p-6 md:pt-4',
                    isScrolled && 'top-16'
                )}
                side='top'
            >
                <SheetHeader>
                    <SheetTitle className='sr-only'>Контакти товарів</SheetTitle>
                </SheetHeader>
                <h3 className='text-2xl leading-none'>Контакти</h3>
                <div className='mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2'>
                    <div className='rounded-lg border p-3'>
                        <div className='flex size-8 items-center justify-center rounded-full bg-foreground/10'>
                            <ReactSVG src='/icons/call.svg' />
                        </div>
                        <h4 className='mt-1'>Номер телефону</h4>
                        <div className='flex flex-col space-y-0.5'>
                            <Link
                                className='text-muted transition-colors hover:text-primary hover:underline'
                                to='tel:+380679999569'
                            >
                                067 999 95 69
                            </Link>
                            <Link
                                className='text-muted transition-colors hover:text-primary hover:underline'
                                to='tel:+380679999569'
                            >
                                067 999 95 69
                            </Link>
                            <Link
                                className='text-muted transition-colors hover:text-primary hover:underline'
                                to='tel:+380679999569'
                            >
                                067 999 95 69
                            </Link>
                        </div>
                    </div>
                    <div className='rounded-lg border p-3'>
                        <div className='flex size-8 items-center justify-center rounded-full bg-foreground/10'>
                            <ReactSVG src='/icons/calendar.svg' />
                        </div>
                        <h4 className='mt-1'>Графік роботи</h4>
                        <div className='text-muted'>пн - сб 09:00 - 18:00 </div>
                        <div className='text-muted'>нд 09:00 - 17:00</div>
                    </div>
                    <div className='rounded-lg border p-3 sm:col-span-2'>
                        <div className='flex size-8 items-center justify-center rounded-full bg-foreground/10'>
                            <ReactSVG src='/icons/sms.svg' />
                        </div>
                        <h4 className='mt-1'>Наша пошта</h4>
                        <Link
                            className='text-muted transition-colors hover:text-primary hover:underline'
                            to='mailto:apexflora.ua@gmail.com'
                        >
                            apexflora.ua@gmail.com
                        </Link>
                    </div>
                    <div className='rounded-lg border p-3 sm:col-span-2'>
                        <h4>Соціальні мережі</h4>
                        <ul className='mt-1 flex items-center gap-x-2'>
                            <li className='h-10 w-full'>
                                <Link
                                    className='flex size-full items-center gap-x-1 text-xs text-muted transition-colors hover:text-primary hover:underline sm:text-sm'
                                    to='/'
                                >
                                    <ReactSVG src='/icons/telegram.svg' />
                                    Telegram
                                </Link>
                            </li>
                            <li className='h-10 w-full'>
                                <Link
                                    className='flex size-full items-center gap-x-1 text-xs text-muted transition-colors hover:text-primary hover:underline sm:text-sm'
                                    to='/'
                                >
                                    <ReactSVG src='/icons/Instagram.svg' />
                                    Instagram
                                </Link>
                            </li>
                            <li className='h-10 w-full'>
                                <Link
                                    className='flex size-full items-center gap-x-1 text-xs text-muted transition-colors hover:text-primary hover:underline sm:text-sm'
                                    to='/'
                                >
                                    <ReactSVG src='/icons/facebook.svg' />
                                    Facebook
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    ) : null
}
