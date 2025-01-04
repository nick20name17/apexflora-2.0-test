import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

import { cn } from '@/lib/utils'

interface SocialsProps {
    titleClassName?: string
    socilasClassName?: string
    className?: string
}

export const Socials = ({
    titleClassName,
    socilasClassName,
    className
}: SocialsProps) => {
    return (
        <div className={cn('max-w-md', className)}>
            <h2 className={cn('text-xl md:text-2xl', titleClassName)}>
                Ми у соц. мережах
            </h2>
            <p className='mt-0.5 text-sm text-muted md:text-base'>
                Будьте в курсі всіх новин, акцій та нових надходжень! Слідкуйте за нами в
                соціальних мережах, щоб не пропустити важливу інформацію.
            </p>
            <ul className='mt-6 flex items-center gap-x-2 md:gap-x-5'>
                <li className='h-11 w-full'>
                    <Link
                        className={cn(
                            'flex size-full items-center justify-center gap-x-1 rounded-full border border-black bg-background/10 text-xs transition-colors hover:bg-muted sm:text-sm',
                            socilasClassName
                        )}
                        to='/'
                    >
                        <ReactSVG src='/icons/telegram.svg' />
                        <span>Telegram</span>
                    </Link>
                </li>
                <li className='h-11 w-full'>
                    <Link
                        className={cn(
                            'flex size-full items-center justify-center gap-x-1 rounded-full border border-black bg-background/10 text-xs transition-colors hover:bg-muted sm:text-sm',
                            socilasClassName
                        )}
                        to='/'
                    >
                        <ReactSVG src='/icons/Instagram.svg' />
                        <span>Instagram</span>
                    </Link>
                </li>
                <li className='h-11 w-full'>
                    <Link
                        className={cn(
                            'flex size-full items-center justify-center gap-x-1 rounded-full border border-black bg-background/10 text-xs transition-colors hover:bg-muted sm:text-sm',
                            socilasClassName
                        )}
                        to='/'
                    >
                        <ReactSVG src='/icons/facebook.svg' />
                        <span>Facebook</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
