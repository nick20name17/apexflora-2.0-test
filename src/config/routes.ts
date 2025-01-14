export const routes = {
    home: '/',
    signUp: '/sign-up',
    signIn: '/sign-in',
    catalogue: '/catalogue',
    cart: '/cart',
    settings: '/profile/settings',
    wishList: '/profile/wish-list',
    orders: '/profile/orders',
    loyalty: '/profile/loyalty',
    balance: '/profile/balance',
    adds: '/profile/adds',
    delivery: '/delivery'
} as const

export const adminRoutes = {
    orders: '/admin/orders'
}

export const publicRoutes = [
    routes.home,
    routes.signIn,
    routes.signUp,
    routes.catalogue,
    routes.delivery
] as const

export const DEFAULT_LOGIN_REDIRECT = routes.catalogue

export type PublicRoute = (typeof publicRoutes)[number]
