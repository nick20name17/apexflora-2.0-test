import type { VariantProps } from 'class-variance-authority'
import { HambergerMenu } from 'iconsax-react'
import { forwardRef } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { getCategories } from '@/api/categories/categories'
import { Button, buttonVariants } from '@/components/ui/button'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'

interface HeaderCatalogueProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    size?: VariantProps<typeof buttonVariants>['size']
    className?: string
}

export const HeaderCatalogue = ({
    open,
    setOpen,
    size = 'lg',
    className
}: HeaderCatalogueProps) => {
    return (
        <Sheet
            open={open}
            onOpenChange={setOpen}
        >
            <SheetTrigger asChild>
                <Button
                    size={size}
                    className='font-book max-md:h-10 max-md:px-2'
                    variant={open ? 'accent' : 'outline'}
                >
                    <HambergerMenu className='hidden !size-5 sm:inline' />
                    <span> Каталог</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                overlayHidden
                closeHidden
                className={cn(
                    '!absolute left-0 top-16 !-z-50 max-h-[calc(100vh-8rem)] min-h-[460px] w-full rounded-b-xl bg-background/90 p-3 pt-2 shadow-lg backdrop-blur-lg max-md:h-[calc(100vh-8rem)] md:top-20 md:bg-[#FFFEFC]/90 md:p-6 md:pt-4',
                    className
                )}
                side='top'
            >
                <SheetHeader>
                    <SheetTitle className='sr-only'>Каталог товарів</SheetTitle>
                    <CatalogueNavigationMenu setOpen={setOpen} />
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

const flowersKey = 'Квіти'
const furnituresKey = 'Фурнітура'

interface CatalogueNavigationMenuProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const CatalogueNavigationMenu = ({ setOpen }: CatalogueNavigationMenuProps) => {
    const { data: flowers } = useQuery({
        queryKey: ['categories', flowersKey],
        queryFn: () =>
            getCategories({
                name: flowersKey
            })
    })

    const { data: furnitures } = useQuery({
        queryKey: ['categories', furnituresKey],
        queryFn: () =>
            getCategories({
                name: furnituresKey
            })
    })

    const flowersComponents = flowers?.results?.[0]?.children?.map((flower) => ({
        title: flower.name,
        to: `${routes.catalogue}?categories=${flower.id}`
    })) || [
            {
                title: 'До каталогу',
                to: routes.catalogue
            }
        ]

    const furnituresComponents = furnitures?.results?.[0]?.children?.map((flower) => ({
        title: flower.name,
        to: `${routes.catalogue}?categories=${flower.id}`
    })) || [
            {
                title: 'До каталогу',
                to: routes.catalogue
            }
        ]

    return (
        <NavigationMenu
            orientation='vertical'
            defaultValue='flowers'
        >
            <NavigationMenuList className='w-[240px] flex-col items-center justify-start space-x-0 space-y-1 max-sm:w-[150px]'>
                <NavigationMenuItem
                    value='flowers'
                    className='w-full'
                >
                    <Link
                        to={`${routes.catalogue}?categories=${flowers?.results[0]?.id}`}
                        className='w-full'
                    >
                        <NavigationMenuTrigger
                            onClick={() => setOpen(false)}
                            className='w-full justify-between text-left'
                        >
                            Квіти
                        </NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent className='h-full min-w-full'>
                        <ul className='grid h-[calc(460px-3rem)] min-w-full grid-cols-1 gap-x-16 overflow-y-auto max-md:h-[calc(100vh-10rem)] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {flowersComponents.map((component) => (
                                <ListItem
                                    onClick={() => setOpen(false)}
                                    key={component.title}
                                    title={component.title}
                                    href={component.to}
                                ></ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem
                    value='furnitures'
                    className='w-full'
                >
                    <Link
                        to={`${routes.catalogue}?categories=${furnitures?.results[0]?.id}`}
                        className={cn(
                            'w-full',
                            furnitures?.results[0]?.id === undefined &&
                            'pointer-events-none opacity-50'
                        )}
                    >
                        <NavigationMenuTrigger
                            disabled={furnitures?.results[0]?.id === undefined}
                            onClick={() => setOpen(false)}
                            className='w-full justify-between text-left'
                        >
                            Флористична фурнітура
                        </NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent className='h-full min-w-full'>
                        <ul className='grid h-[calc(460px-3rem)] min-w-full grid-cols-1 gap-x-16 overflow-y-auto max-md:h-[calc(100vh-10rem)] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {furnituresComponents.map((component) => (
                                <ListItem
                                    onClick={() => setOpen(false)}
                                    key={component.title}
                                    title={component.title}
                                    href={component.to}
                                ></ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <Link
                        to={props.href || ''}
                        ref={ref}
                        className={cn(
                            buttonVariants({
                                variant: 'link'
                            }),
                            'h-10 w-full justify-start text-left',
                            className
                        )}
                        {...props}
                    >
                        <div className='truncate text-left text-sm leading-none'>
                            {title}
                        </div>
                        <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                            {children}
                        </p>
                    </Link>
                </NavigationMenuLink>
            </li>
        )
    }
)
