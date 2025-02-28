import {
    type ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react'
import { useQuery, useQueryClient } from 'react-query'

import { getUser } from '@/api/users/users'
import type { Roles, User } from '@/api/users/users.types'
import { routes } from '@/config/routes'

interface AuthState {
    user: User
    accessToken: string | null
    isAuth: boolean
}

interface AuthContextType {
    isAuth: boolean
    logOut: () => void
    currentUser: User | undefined
    isLoadingUser: boolean
    getCurrentUserRole: (role: Roles | Roles[]) => boolean
}

interface AuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const queryClient = useQueryClient()

    const [authState, setAuthState] = useState<AuthState>(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}') as User
            const accessToken = localStorage.getItem('accessToken')
            return {
                user,
                accessToken,
                isAuth: !!accessToken && !!user?.id
            }
        } catch (e) {
            return {
                user: {} as User,
                accessToken: null,
                isAuth: false
            }
        }
    })

    const { user, isAuth } = authState

    const { data: currentUser, isLoading } = useQuery({
        queryKey: ['currentUser', user?.id],
        queryFn: () => getUser(user?.id),
        enabled: isAuth,
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000
    })

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'user' || event.key === 'accessToken') {
                queryClient.invalidateQueries(['currentUser'])

                setAuthState(() => {
                    try {
                        const user = JSON.parse(
                            localStorage.getItem('user') || '{}'
                        ) as User
                        const accessToken = localStorage.getItem('accessToken')
                        return {
                            user,
                            accessToken,
                            isAuth: !!accessToken && !!user?.id
                        }
                    } catch (e) {
                        return {
                            user: {} as User,
                            accessToken: null,
                            isAuth: false
                        }
                    }
                })
            }
        }

        window.addEventListener('storage', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [])

    const getCurrentUserRole = useCallback(
        (role: Roles | Roles[]) => {
            const currentRole = currentUser?.role
            return Array.isArray(role)
                ? !!currentRole && role.includes(currentRole)
                : role === currentRole
        },
        [currentUser]
    )

    const logOut = useCallback(() => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        queryClient.removeQueries(['currentUser'])

        // Update local state
        setAuthState({
            user: {} as User,
            accessToken: null,
            isAuth: false
        })

        window.location.href = routes.signIn
    }, [queryClient])

    const authContextValue: AuthContextType = {
        isAuth,
        logOut,
        currentUser,
        isLoadingUser: isLoading,
        getCurrentUserRole
    }

    return (
        <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
