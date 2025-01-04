import { driver } from 'driver.js'
import { useQueryState } from 'nuqs'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { Catalogue } from './components/catalogue'
import { FiltersSidebar } from './components/filters-sidebar'
import { useActiveStockId } from './store/active-stock'
import { useFilters } from './store/filters'
import { getShopProducts } from '@/api/shop-products/shop-products'
import '@/assets/styles/driver-js.css'
import { MetaHead } from '@/components/meta-head'
import { defaultLimit } from '@/constants/table'
import { useAuth } from '@/hooks/use-auth'

import 'driver.js/dist/driver.css'

export const CataloguePage = () => {
    const [statuses] = useQueryState('status', {
        defaultValue: 2,
        parse: Number
    })

    const [ordering] = useQueryState('ordering', {
        defaultValue: 'name'
    })
    const [promotion] = useQueryState('promo', {
        defaultValue: false,
        parse: Boolean
    })
    const [colors] = useQueryState('colors', {
        defaultValue: ''
    })
    const [price] = useQueryState('price')
    const [height] = useQueryState('height', {
        defaultValue: ''
    })
    const [categories] = useQueryState('categories', {
        defaultValue: ''
    })
    const [countries] = useQueryState('countries', {
        defaultValue: ''
    })
    const [search] = useQueryState('search', {
        defaultValue: ''
    })

    const [limit] = useQueryState('limit', {
        defaultValue: defaultLimit,
        parse: Number
    })

    const [offset] = useQueryState('offset', {
        defaultValue: 0,
        parse: Number
    })

    const filters = useMemo(
        () => ({
            offset,
            limit,
            statuses,
            ordering,
            price,
            height,
            countries,
            categories,
            promotion,
            colors,
            is_visible: true,
            search
        }),
        [
            offset,
            limit,
            statuses,
            ordering,
            price,
            height,
            countries,
            categories,
            promotion,
            colors,
            search
        ]
    )

    const { data: shopProducts, isLoading } = useQuery({
        queryKey: ['shopProducts', filters],
        queryFn: () => getShopProducts(filters),
        staleTime: 300 * 1000,
        keepPreviousData: true
    })

    const { setFilters } = useFilters()
    const { setActiveStockId } = useActiveStockId()
    const { currentUser } = useAuth()

    const [showOnboarding, setShowOnboarding] = useState(
        localStorage.getItem('showOnboarding') === 'true'
    )

    useEffect(() => {
        const isShowOnboardingExists = localStorage.getItem('showOnboarding') !== null

        if (!isShowOnboardingExists) {
            localStorage.setItem('showOnboarding', 'true')
            setShowOnboarding(true)
        } else if (currentUser?.last_login === null) {
            localStorage.setItem('showOnboarding', 'true')
            setShowOnboarding(true)
        } else {
            localStorage.setItem('showOnboarding', 'false')
            setShowOnboarding(false)
        }
    }, [currentUser?.last_login])

    useEffect(() => {
        setFilters(filters)
    }, [filters])

    const firstStockId = useMemo(() => {
        return shopProducts?.results[0]?.stocks?.find(
            (stock) => stock.status.id === statuses
        )?.id
    }, [shopProducts?.results, isLoading])

    const driverObj = useMemo(() => {
        return driver({
            showProgress: true,
            nextBtnText: 'Далі',
            prevBtnText: 'Назад',
            doneBtnText: 'Завершити',
            overlayColor: '#0E0E66',
            overlayOpacity: 0.6,
            disableActiveInteraction: true,
            popoverClass: 'driverjs-theme',
            progressText: '{{current}}/{{total}}',
            steps: [
                {
                    popover: {
                        description:
                            'Вітаємо у веб-шопі Apex Flora, тут зібрані квіти, від кращих світових виробників, для вашого магазину чи івенту. Зараз ми швиденько покажемо, куди натискати, щоб успішно зробити ваше перше замовлення.'
                    }
                },
                {
                    element: '#catalogue',
                    popover: {
                        side: 'bottom',
                        description:
                            'Прямо перед вами каталог, всіх можливих і не можливих квітів.'
                    }
                },
                {
                    element: '#wish-list-button',
                    popover: {
                        description:
                            'Щоб не загубити важливий товар, додайте його у список збережених.'
                    }
                },
                {
                    element: '#wish-list',
                    popover: {
                        description:
                            'Перейдіть на сторінку “Збережені”, щоб переглянути список вподобаних товарів. '
                    }
                },
                {
                    element: '#statuses',
                    popover: {
                        description:
                            'Для зручності пошуку, використовуйте сортування. У нас в вебшопі,ви можете зробити замволення, згідно 3-х статусів.'
                    }
                },
                {
                    element: '#filters',
                    popover: {
                        description:
                            'Використовуйте фільтри, для детального пошуку потрібних вам квітів, за:'
                    }
                },
                {
                    element: '#quantity-cell',
                    popover: {
                        description:
                            'Щоб додати потрібні квіти у кошик, ви можете обрати потрібну к-ть квітів і вони автоматично додатуться у кошик'
                    }
                },
                {
                    element: '#details-button',
                    popover: {
                        description:
                            'Також ви можете натиснути "Детальніше", щоб побачити детальнішу інформацію про квітку',
                        onNextClick: () => {
                            setActiveStockId(firstStockId!)
                            setTimeout(() => {
                                driverObj.moveNext()
                            }, 50)
                        }
                    }
                },
                {
                    element: '#product-popup',
                    popover: {
                        description:
                            'Також ви можете натиснути "Детальніше", щоб побачити детальнішу інформацію про квітку'
                    },
                    onDeselected: () => {
                        localStorage.setItem('showOnboarding', 'false')
                        setActiveStockId(null)
                    }
                }
            ]
        })
    }, [firstStockId])

    useEffect(() => {
        if (showOnboarding) {
            driverObj.drive()
        }
    }, [showOnboarding])

    return (
        <>
            <MetaHead title='Каталог' />
            <div className='flex items-start gap-x-5 overflow-y-hidden'>
                <FiltersSidebar
                    className='hidden xl:block'
                    minMaxValues={shopProducts?.min_max_values!}
                />
                <Catalogue
                    filters={filters}
                    shopProducts={shopProducts!}
                    isLoading={isLoading}
                />
            </div>
        </>
    )
}
