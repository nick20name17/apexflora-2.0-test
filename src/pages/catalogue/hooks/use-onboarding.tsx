// hooks/useOnboarding.js
import { driver } from 'driver.js'
import { useQueryState } from 'nuqs'
import { useEffect, useMemo, useState } from 'react'

import { useActiveStockId } from '../store/active-stock'

import { useAuth } from '@/providers/auth-provider'

const ONBOARDING_KEY = 'showCatalogueOnboarding'

export const useCatalogueOnboarding = (firstStockId: number | undefined) => {
    const { currentUser } = useAuth()

    const [showOnboarding, setShowOnboarding] = useState(false)
    const { setActiveStockId } = useActiveStockId()

    const [_, setView] = useQueryState('view', {
        defaultValue: 'lines'
    })

    useEffect(() => {
        const storedValue = localStorage.getItem(ONBOARDING_KEY)
        setShowOnboarding(storedValue === 'true')
    }, [])

    useEffect(() => {
        if (!currentUser) return

        const isFirstTimeUser = currentUser.last_login === null
        const hasExistingSetting = localStorage.getItem(ONBOARDING_KEY) !== null

        const shouldShowOnboarding = isFirstTimeUser || !hasExistingSetting

        localStorage.setItem(ONBOARDING_KEY, shouldShowOnboarding ? 'true' : 'false')
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
                    onHighlighted: () => {
                        setView('lines')
                    },
                    popover: {
                        description:
                            'Вітаємо у веб-шопі Apex Flora! Тут ми зібрали квіти від кращих світових виробників для вашого магазину чи заходу. Щоб успішно зробити ваше перше замовлення, повторіть прості дії, як це показано на ілюстраціях.'
                    }
                },
                {
                    element: '#catalogue',
                    popover: {
                        side: 'bottom',
                        description:
                            'Перед вами каталог найнеймовірніших квітів з різних куточків світу.'
                    }
                },
                {
                    element: '#wish-list-button',
                    popover: {
                        description:
                            'Щоб не загубити важливий товар, додайте його у список збережених. '
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
                            'Використовуйте сортування, щоб обрати бажаний варіант замовлення. Для вас доступні три варіанти замовлень: передзамовлення; замовити квіти, які вже в дорозі; обрати з наявного товару. '
                    }
                },
                {
                    element: '#filters',
                    popover: {
                        description:
                            'Використовуйте фільтри для зручності пошуку потрібних вам квітів. Фільтрувати можна за “Категоріями”, “Країною”, “Кольором”, “Ціною”, “Висотою”.  '
                    }
                },
                {
                    element: '#quantity-cell',
                    popover: {
                        description: 'Щоб додати товар у Кошик, натисніть вказану кнопку.'
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
                        localStorage.setItem(ONBOARDING_KEY, 'false')
                        setActiveStockId(null)
                    }
                },
                {
                    element: '#cart',
                    popover: {
                        description:
                            'Для остаточного оформлення замовлення перейдіть у “Кошик”.'
                    }
                },
                {
                    popover: {
                        description: 'Тепер ви готові зробити ваше перше замовлення.'
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
