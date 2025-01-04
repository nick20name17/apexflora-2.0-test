import { NuqsAdapter } from 'nuqs/adapters/react-router'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

import { AuthLayout } from '@/components/layout/auth-layout'
import { HomeLayout } from '@/components/layout/home-layout'
import { Layout } from '@/components/layout/layout'
import { routes } from '@/config/routes'
import { SignInPage } from '@/pages/auth/sign-in/sign-in-page'
import { SignUpPage } from '@/pages/auth/sign-up/sign-up-page'
import { CataloguePage } from '@/pages/catalogue/catalogue-page'
import { HomePage } from '@/pages/home/home-page'
import { NotFoundPage } from '@/pages/not-found/not-found-page'
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
