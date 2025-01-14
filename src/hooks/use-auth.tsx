import { useCallback, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

// Assuming this function exists
import { getUser } from '@/api/users/users'
import type { Roles, User } from '@/api/users/users.types'
import { routes } from '@/config/routes'

export const useAuth = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const user = JSON.parse(localStorage.getItem('user') || '{}') as User
    const accessToken = localStorage.getItem('accessToken')

    const { data: currentUser, isLoading } = useQuery({
        queryKey: ['currentUser', user?.id],
        queryFn: () => getUser(user?.id),
        enabled: !!user?.id && !!accessToken,
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000
    })

    const isAuth = !!accessToken && !!user?.id

    useEffect(() => {
        const handleStorageChange = () => {
            queryClient.invalidateQueries(['currentUser'])
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [queryClient])

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
        localStorage.removeItem('userId')
        queryClient.removeQueries(['currentUser'])
        navigate(routes.signIn)
    }, [navigate, queryClient])

    return {
        isAuth,
        logOut,
        currentUser,
        isLoadingUser: isLoading,
        getCurrentUserRole
    }
}
