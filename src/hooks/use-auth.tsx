import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { Roles, User } from '@/api/users/users.types'
import { routes } from '@/config/routes'

export const useAuth = () => {
    const [isAuth, setIsAuth] = useState<boolean>(
        () => !!localStorage.getItem('accessToken')
    )
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        const userString = localStorage.getItem('user')
        return userString ? JSON.parse(userString) : null
    })

    const navigate = useNavigate()

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuth(!!localStorage.getItem('accessToken'))
            const userString = localStorage.getItem('user')
            setCurrentUser(userString ? JSON.parse(userString) : null)
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [])

    const getCurrentUserRole = useCallback(
        (role: Roles | Roles[]) => {
            const currentRole = currentUser?.role
            return Array.isArray(role)
                ? currentRole && role.includes(currentRole)
                : role === currentRole
        },
        [currentUser]
    )

    const logOut = useCallback(() => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        setIsAuth(false)
        setCurrentUser(null)
        navigate(routes.signIn)
    }, [navigate])

    return {
        isAuth,
        logOut,
        currentUser,
        getCurrentUserRole
    }
}
