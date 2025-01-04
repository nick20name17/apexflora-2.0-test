import { type PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { type PublicRoute, publicRoutes, routes } from '@/config/routes'
import { useAuth } from '@/hooks/use-auth'

export const RequireAuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const location = useLocation()

    const { isAuth } = useAuth()

    const isProtectedRoute = !publicRoutes.includes(location.pathname as PublicRoute)

    if (isProtectedRoute && !isAuth) {
        return (
            <Navigate
                to={routes.signIn}
                state={{ from: location }}
                replace
            />
        )
    }

    return children
}
