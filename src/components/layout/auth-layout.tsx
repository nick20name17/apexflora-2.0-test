import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import { AuthFooter } from '@/components/layout/auth-footer'
import { Logo } from '@/components/ui/logo'
import { ErrorPage } from '@/pages/error/error-page'

export const AuthLayout = () => {
    return (
        <div
            className='flex min-h-screen flex-col justify-between bg-background bg-cover bg-center'
            style={{ backgroundImage: 'url(/img/auth/auth-bg.webp)' }}
        >
            <main className='flex h-full items-center justify-center px-2 pt-16'>
                <div>
                    <Logo className='mx-auto h-[60px] w-[98px]' />
                    <div className='mt-10 flex flex-col gap-y-5 rounded-lg bg-background px-6 py-4 md:px-10 md:py-8'>
                        <ErrorBoundary
                            onReset={() => window.location.reload()}
                            FallbackComponent={ErrorPage}
                        >
                            <Outlet />
                        </ErrorBoundary>
                    </div>
                </div>
            </main>
            <AuthFooter />
        </div>
    )
}
