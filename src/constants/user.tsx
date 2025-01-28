import type { Roles } from '@/api/users/users.types'

export const roles = [
    {
        label: 'Клієнт',
        value: 'client'
    },
    {
        label: 'Менеджер',
        value: 'manager'
    },
    {
        label: 'Адміністратор',
        value: 'admin'
    }
] as const

export const getRoleBadgeInfo = (role: Roles) => {
    switch (role) {
        case 'admin':
            return {
                className: 'border-highlight text-highlight',
                displayName: 'Адмін'
            }
        case 'manager':
            return {
                className: 'border-primary text-primary',
                displayName: 'Менеджер'
            }
        case 'client':
            return {
                className: 'border-foreground/90 text-foreground/90',
                displayName: 'Клієнт'
            }
        default:
            return {
                className: 'border-foreground/90 text-foreground/90',
                displayName: 'Клієнт'
            }
    }
}
