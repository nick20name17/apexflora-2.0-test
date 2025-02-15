import type { PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import { ErrorPage } from '@/pages/error/error-page'
import { Footer } from './footer'
import { HomeHeader } from './home-header'

export const HomeLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className='bg-home-backgroud'>
            <HomeHeader />
            <main>
                <ErrorBoundary
                    onReset={() => window.location.reload()}
                    FallbackComponent={ErrorPage}
                >
                    {children ?? <Outlet />}
                </ErrorBoundary>
            </main>
            <Footer />
        </div>
    )
}
