import { MobileFiltersSidebar } from './filters-sidebar'
import type { MinMaxValues } from '@/api/shop-products/shop-products.types'
import { useCartOperations } from '@/hooks/use-cart-operations'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

interface FiltersPopupProps {
    minMaxValues: MinMaxValues
    scrollPosition: number
}

export const FiltersPopup = ({ minMaxValues, scrollPosition }: FiltersPopupProps) => {
    const { cartCount } = useCartOperations()
    const isXl = useMediaQuery('(max-width: 1280px)')

    const isVisible = scrollPosition >= 180

    return isXl ? (
        <div
            className={cn(
                'fixed right-0 z-40 mx-auto flex max-w-md items-center justify-end gap-x-4 text-sm leading-tight transition-all duration-300 ease-in-out md:max-w-2xl xl:left-48',
                cartCount > 0 ? 'bottom-28' : 'bottom-14',
                isVisible ? 'opacity-100' : 'opacity-0'
            )}
        >
            <MobileFiltersSidebar
                className='rounded-r-none border-none bg-primary text-primary-foreground'
                minMaxValues={minMaxValues}
                size='icon'
            />
        </div>
    ) : null
}
