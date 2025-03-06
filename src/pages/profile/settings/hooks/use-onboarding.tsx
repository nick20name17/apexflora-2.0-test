// hooks/useOnboarding.js
import { driver } from 'driver.js'
import { useEffect, useMemo, useState } from 'react'

import { useAuth } from '@/providers/auth-provider'

const ONBOARDING_KEY = 'showProfileOnboarding'

export const useProfileOnboarding = () => {
    const { currentUser } = useAuth()

    const [showOnboarding, setShowOnboarding] = useState(false)

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
                    element: '#manager',
                    popover: {
                        description:
                            'Вгорі закріплені контактні дані вашого персонального менеджера.'
                    }
                },
                {
                    element: '#settings',
                    popover: {
                        description:
                            'Нижче ви можете змінити особисті дані: додати або змінити отримувача замовлення чи адресу доставки, змінити пароль до вашого кабінету.'
                    }
                },
                {
                    element: '#orders',
                    popover: {
                        description:
                            'Переглядайте ваші замовлення та їхній статус (хід виконання) у вкладці “Мої замовлення”.'
                    }
                },
                {
                    element: '#wish-list-link',
                    popover: {
                        description: 'А тут ви можете переглянути збережені товари.'
                    }
                }
            ]
        })
    }, [])

    useEffect(() => {
        if (showOnboarding && driverObj) {
            driverObj.drive()
        }
    }, [showOnboarding, driverObj])

    return { showOnboarding, setShowOnboarding }
}
