import { NuqsAdapter } from 'nuqs/adapters/react-router'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

import { DeliveryPage } from './pages/delivery/delivery-page'
import { Layout } from '@/components/layout/Layout'
import { AuthLayout } from '@/components/layout/auth-layout'
import { HomeLayout } from '@/components/layout/home-layout'
import { ProfileLayout } from '@/components/layout/profile-layout'
import { routes } from '@/config/routes'
import { SignInPage } from '@/pages/auth/sign-in/sign-in-page'
import { SignUpPage } from '@/pages/auth/sign-up/sign-up-page'
import { CartPage } from '@/pages/cart/cart-page'
import { CataloguePage } from '@/pages/catalogue/catalogue-page'
import { HomePage } from '@/pages/home/home-page'
import { NotFoundPage } from '@/pages/not-found/not-found-page'
import { AddsPage } from '@/pages/profile/adds/adds-page'
import { BalancePage } from '@/pages/profile/balance/balance-page'
import { LoyaltyPage } from '@/pages/profile/loyalty/loyalty-page'
import { OrdersPage } from '@/pages/profile/orders/orders-page'
import { SettingsPage } from '@/pages/profile/settings/settings-page'
import { WishListPage } from '@/pages/profile/wish-list/wish-list'
import { RequireAuthProvider } from '@/providers/require-auth-provider'

const router = createBrowserRouter([
    {
        path: routes.home,
        errorElement: (
            <HomeLayout>
                <NotFoundPage />
            </HomeLayout>
        ),

        element: (
            <RequireAuthProvider>
                <HomeLayout />
            </RequireAuthProvider>
        ),
        children: [
            {
                index: true,
                element: <HomePage />
            }
        ]
    },
    {
        path: routes.home,
        errorElement: <NotFoundPage />,
        element: (
            <RequireAuthProvider>
                <Layout />
            </RequireAuthProvider>
        ),
        children: [
            {
                path: routes.catalogue,
                element: <CataloguePage />
            },
            {
                path: routes.delivery,
                element: <DeliveryPage />
            },
            {
                path: routes.cart,
                element: <CartPage />
            }
        ]
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: routes.signIn,
                element: <SignInPage />
            },
            {
                path: routes.signUp,
                element: <SignUpPage />
            }
        ]
    },
    {
        path: routes.home,
        element: (
            <RequireAuthProvider>
                <ProfileLayout />
            </RequireAuthProvider>
        ),
        children: [
            {
                path: routes.settings,
                element: <SettingsPage />
            },
            {
                path: routes.wishList,
                element: <WishListPage />
            },
            {
                path: routes.orders,
                element: <OrdersPage />
            },
            {
                path: routes.loyalty,
                element: <LoyaltyPage />
            },
            {
                path: routes.balance,
                element: <BalancePage />
            },
            {
                path: routes.adds,
                element: <AddsPage />
            }
        ]
    },

    {
        path: '*',
        element: (
            <HomeLayout>
                <NotFoundPage />
            </HomeLayout>
        )
    }
])

export const App = () => (
    <NuqsAdapter>
        <RouterProvider router={router} />
        <Toaster
            richColors
            closeButton
            duration={5000}
        />
    </NuqsAdapter>
)
