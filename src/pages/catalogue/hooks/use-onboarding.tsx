// hooks/useOnboarding.js
import { driver } from 'driver.js'
import { useEffect, useMemo, useState } from 'react'

import { useActiveStockId } from '../store/active-stock'

import type { User } from '@/api/users/users.types'

export const useOnboarding = (
    currentUser: User | undefined,
    firstStockId: number | undefined
) => {
    const [showOnboarding, setShowOnboarding] = useState(false)
    const { setActiveStockId } = useActiveStockId()

    useEffect(() => {
        const storedValue = localStorage.getItem('showOnboarding')
        setShowOnboarding(storedValue === 'true')
    }, [])

    useEffect(() => {
        if (!currentUser) return

        const isFirstTimeUser = currentUser.last_login === null
        const hasExistingSetting = localStorage.getItem('showOnboarding') !== null

        const shouldShowOnboarding = isFirstTimeUser || !hasExistingSetting

        localStorage.setItem('showOnboarding', shouldShowOnboarding ? 'true' : 'false')
        setShowOnboarding(shouldShowOnboarding)
    }, [currentUser])

    const driverObj = useMemo(() => {
        if (!firstStockId) return null

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
                                driverObj?.moveNext()
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
    }, [firstStockId, setActiveStockId])

    useEffect(() => {
        if (showOnboarding && driverObj && firstStockId) {
            driverObj.drive()
        }
    }, [showOnboarding, driverObj, firstStockId])

    return { showOnboarding, setShowOnboarding }
}
