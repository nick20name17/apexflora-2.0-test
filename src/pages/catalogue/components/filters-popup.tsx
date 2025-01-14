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
                'fixed left-0 right-0 z-20 mx-auto flex h-14 w-[calc(100%-2rem)] max-w-md items-center justify-end gap-x-4 text-sm leading-tight transition-all duration-300 ease-in-out md:max-w-2xl xl:left-48',
                cartCount > 0 ? 'bottom-18' : 'bottom-4',
                isVisible ? 'opacity-100' : 'opacity-0'
            )}
        >
            <MobileFiltersSidebar
                className='border-none bg-accent text-primary'
                minMaxValues={minMaxValues}
                size='icon'
            />
        </div>
    ) : null
}
