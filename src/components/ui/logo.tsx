import { Link } from 'react-router-dom'

import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'

export const Logo = ({ className }: { className?: string }) => {
    return (
        <Link to={routes.home}>
            <svg
                className={cn('w-14', className)}
                viewBox='0 0 56 34'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <g clip-path='url(#clip0_1282_3424)'>
                    <path
                        d='M5.84165 0L0 15.7058H2.58656L4.1168 11.4879H10.6697L12.1999 15.7058H14.7865L8.94553 0H5.84165ZM5.00093 9.08664L7.39359 2.51287L9.78625 9.08664H5.00093Z'
                        fill='currentColor'
                    />
                    <path
                        d='M22.7893 15.975C25.9575 15.975 28.2641 13.3051 28.2641 9.53583C28.2641 5.76654 25.9148 3.09671 22.8102 3.09671C20.9834 3.09671 19.5884 4.01329 18.7202 5.36693C18.6435 3.96073 17.5271 2.84326 16.1568 2.84326H13.084C13.084 4.32146 14.2352 5.51957 15.6554 5.51957H16.2154L16.2024 33.7306H18.6594V13.6414C19.5219 15.0325 20.9356 15.975 22.79 15.975H22.7893ZM22.272 5.51957C24.3412 5.51957 25.807 7.17993 25.807 9.53583C25.807 11.8917 24.3195 13.5521 22.272 13.5521C20.2244 13.5521 18.6291 11.9148 18.6291 9.53583C18.6291 7.15689 20.2027 5.51957 22.272 5.51957Z'
                        fill='currentColor'
                    />
                    <path
                        d='M35.5665 15.9749C38.0887 15.9749 40.3518 14.6739 41.2786 11.914H38.7565C38.1958 13.1258 37.0106 13.7537 35.5882 13.7537C33.6051 13.7537 32.0748 12.4972 31.8809 10.2313H41.516C41.7533 6.17044 39.3389 3.09668 35.5238 3.09668C31.9453 3.09668 29.4022 5.83419 29.4022 9.55813C29.4022 13.2821 31.967 15.9749 35.5672 15.9749H35.5665ZM35.5231 5.2949C37.3123 5.2949 38.5409 6.48365 38.907 8.16705H32.009C32.4185 6.50669 33.6687 5.2949 35.5224 5.2949H35.5231Z'
                        fill='currentColor'
                    />
                    <path
                        d='M41.0153 15.7059H43.947L46.7058 11.2857L49.5723 15.7059H52.483L48.2577 9.4014L52.2674 3.36548H49.3357L46.7919 7.49407L44.1626 3.36548H41.2526L45.2616 9.35603L41.0153 15.7059Z'
                        fill='currentColor'
                    />
                    <path
                        d='M4.93652 33.7299H7.37187V27.0438H12.8272V24.621H7.37187V20.4478H14.7872V18.0242H4.93652V33.7299Z'
                        fill='currentColor'
                    />
                    <path
                        d='M26.2368 21.1211C22.8529 21.1211 20.0934 23.8356 20.0934 27.5602C20.0934 31.2849 22.8095 33.9993 26.2368 33.9993C29.6641 33.9993 32.3802 31.2618 32.3802 27.5602C32.3802 23.8586 29.6424 21.1211 26.2368 21.1211ZM26.2368 31.5765C24.1676 31.5765 22.5505 29.9392 22.5505 27.5602C22.5505 25.1813 24.1885 23.544 26.2368 23.544C28.2851 23.544 29.9231 25.182 29.9231 27.5602C29.9231 29.9384 28.3068 31.5765 26.2368 31.5765Z'
                        fill='currentColor'
                    />
                    <path
                        d='M41.7793 20.8691H38.7065C37.5967 20.8691 36.6539 21.6021 36.2936 22.6281V20.8691H33.8575V33.7301H36.2936V23.5455H39.2079C40.6282 23.5455 41.7793 22.3473 41.7793 20.8691Z'
                        fill='currentColor'
                    />
                    <path
                        d='M52.9272 20.8691C52.3556 20.8691 51.8268 21.0628 51.3999 21.3904C51.2964 21.471 51.1995 21.5589 51.1083 21.6518C50.7343 22.0435 50.4738 22.5554 50.3877 23.1264C50.3747 23.212 50.3667 23.2992 50.3616 23.3877C49.4934 22.0341 48.0985 21.1197 46.2723 21.1197C43.1677 21.1197 40.8192 23.7895 40.8192 27.5581C40.8192 31.3267 43.1258 33.9986 46.2933 33.9986C48.1477 33.9986 49.5701 33.0785 50.4333 31.6636V33.7294H52.8679V23.5425H53.4301C54.1384 23.5425 54.7816 23.2444 55.2475 22.7592C55.7113 22.2746 56 21.6064 56 20.8669H52.9272V20.8691ZM46.8121 31.5758C44.7645 31.5758 43.277 29.9385 43.277 27.5595C43.277 25.1806 44.7428 23.5433 46.8121 23.5433C48.8813 23.5433 50.4543 25.2043 50.4543 27.5595C50.4543 29.9147 48.8813 31.5758 46.8121 31.5758Z'
                        fill='currentColor'
                    />
                </g>
                <defs>
                    <clipPath id='clip0_1282_3424'>
                        <rect
                            width='56'
                            height='34'
                            fill='white'
                        />
                    </clipPath>
                </defs>
            </svg>
        </Link>
    )
}
