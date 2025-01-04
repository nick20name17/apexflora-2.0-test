export const routes = {
    home: '/',
    signUp: '/sign-up',
    signIn: '/sign-in',
    catalogue: '/catalogue',
    cart: '/cart',
    settings: '/settings',
    favorites: '/favorites',
    delivery: '/delivery'
} as const

export const publicRoutes = [
    routes.home,
    routes.signIn,
    routes.signUp,
    routes.catalogue
] as const

export const DEFAULT_LOGIN_REDIRECT = routes.catalogue

export type PublicRoute = (typeof publicRoutes)[number]
