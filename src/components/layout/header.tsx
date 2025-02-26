import { Heart, User } from 'iconsax-react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { HeaderCatalogue } from '../header-catalogue'
import { ShoppingCartIcon } from '../icons'

import { getShopProducts } from '@/api/shop-products/shop-products'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { routes } from '@/config/routes'
import { useCartOperations } from '@/hooks/use-cart-operations'

export const Header = () => {
    const [catalogueOpen, setCatalogueOpen] = useState(false)

    const wishListQuery = useQuery({
        queryKey: ['shopProducts'],
        queryFn: () =>
            getShopProducts({
                limit: 200,
                in_wish_list: true
            })
    })

    const { cartCount } = useCartOperations()

    return (
        <header className='sticky top-0 z-40 h-[70px] border-b bg-card'>
            <div className='container relative z-50 flex h-full items-center justify-between gap-x-1 px-10'>
                <div className='flex items-center gap-x-2 md:gap-x-6'>
                    <Logo className='max-md:w-10' />
                    <HeaderCatalogue
                        className='!top-15'
                        size='sm'
                        open={catalogueOpen}
                        setOpen={setCatalogueOpen}
                    />
                </div>

                <div className='flex items-center gap-x-1 md:gap-x-2'>
                    <Button
                        className='max-md:size-10 max-md:[&>span]:hidden'
                        variant='ghost'
                        size='sm'
                        asChild
                    >
                        <Link to={routes.settings}>
                            <User />
                            <span>Кабінет</span>
                        </Link>
                    </Button>
                    <Button
                        className='text-foreground max-md:size-10 max-md:[&>span]:hidden'
                        variant='ghost'
                        size='sm'
                        id='wish-list'
                        asChild
                    >
                        <Link to={routes.wishList}>
                            <div className='relative'>
                                <Heart />
                                <div className='absolute -right-2 -top-2 flex size-3.5 items-center justify-center rounded-full bg-accent text-xs'>
                                    {wishListQuery.data?.count || 0}
                                </div>
                            </div>
                            <span>Обране</span>
                        </Link>
                    </Button>
                    <Button
                        className='text-foreground max-md:size-10 max-md:[&>span]:hidden'
                        variant='ghost'
                        size='sm'
                        id='cart'
                        asChild
                    >
                        <Link to={routes.cart}>
                            <div className='relative'>
                                <ShoppingCartIcon />
                                <div className='absolute -right-2 -top-2 flex size-3.5 items-center justify-center rounded-full bg-accent text-xs'>
                                    {cartCount}
                                </div>
                            </div>
                            <span>Кошик</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}
