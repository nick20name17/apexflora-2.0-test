import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import { Header } from './header'
import { ErrorPage } from '@/pages/error/error-page'

export const Layout = () => {
    return (
        <>
            <Header />
            <main className='bg-secondary'>
                <ErrorBoundary
                    onReset={() => window.location.reload()}
                    FallbackComponent={ErrorPage}
                >
                    <Outlet />
                </ErrorBoundary>
            </main>
        </>
    )
}
