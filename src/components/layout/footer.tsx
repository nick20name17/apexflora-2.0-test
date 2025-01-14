import { Link } from 'react-router-dom'

import { CalendarIcon, CallIcon } from '../icons'
import { Socials } from '../socials'

import { Logo } from '@/components/ui/logo'
import { routes } from '@/config/routes'

export const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
        <footer className='mt-15 min-h-[520px] rounded-t-2xl bg-foreground pb-8 pt-15'>
            <div className='container px-4 text-background md:px-10'>
                <div className='flex flex-col items-start justify-between gap-10 pb-15 lg:flex-row'>
                    <div>
                        <Logo className='w-18' />
                        <Socials className='mt-4 lg:mt-28' />
                    </div>
                    <div className='grid grid-cols-2 gap-x-6 gap-y-8 lg:gap-y-10'>
                        <nav>
                            <h3>Головна</h3>
                            <ul className='mt-3 space-y-3 font-book'>
                                <li>
                                    <a
                                        className='text-muted transition-colors hover:text-background'
                                        href='#catalogue'
                                    >
                                        Каталог
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className='text-muted transition-colors hover:text-background'
                                        href='#about'
                                    >
                                        Про нас
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className='text-muted transition-colors hover:text-background'
                                        href='#contact'
                                    >
                                        Контакти
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <nav>
                            <h3>Про компанію</h3>
                            <ul className='mt-3 space-y-3 font-book'>
                                <li>
                                    <Link
                                        className='text-muted transition-colors hover:text-background'
                                        to={routes.delivery}
                                    >
                                        Оплата та доставка
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        className='text-muted transition-colors hover:text-background'
                                        href='#about'
                                    >
                                        Про нас
                                    </a>
                                </li>
                                <li>
                                    <Link
                                        className='text-muted transition-colors hover:text-background'
                                        to='#contact'
                                    >
                                        Оферта
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div>
                            <div className='flex size-8 items-center justify-center rounded-full bg-muted'>
                                <CallIcon className='size-4' />
                            </div>
                            <h4 className='mt-1.5'>Номер телефону</h4>
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
                            <div className='flex size-8 items-center justify-center rounded-full bg-muted'>
                                <CalendarIcon className='size-4' />
                            </div>
                            <h4 className='mt-1.5'>Графік роботи</h4>
                            <div className='mt-1.5 flex flex-col gap-y-1.5'>
                                <span className='text-muted'>пн - сб 09:00 - 18:00</span>
                                <span className='text-muted'>нд 09:00 - 17:00</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center border-t pt-6 font-book text-xs text-muted sm:justify-between'>
                    <span>Copyright {currentYear}. All Rights Reserved</span>
                    <Link
                        className='hidden transition-colors hover:text-accent sm:block'
                        to='mailto:apexflora.ua@gmail.com'
                    >
                        <span>apexflora.ua@gmail.com</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
