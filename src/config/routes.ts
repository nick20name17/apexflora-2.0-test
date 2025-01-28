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
    colors: '/admin/colors',
    bonusLimits: '/admin/bonus-limits',
    bonusPrograms: '/admin/bonus-programs',
    users: '/admin/users',
    archive: '/admin/archive',
    orders: '/admin/orders',
    contacts: '/admin/contacts',
    categories: '/admin/categories',
    producers: '/admin/producers',
    discounts: '/admin/discounts',
    products: '/admin/products'
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
