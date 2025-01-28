import type { PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import { ScrollArea } from '../ui/scroll-area'
import { SidebarProvider } from '../ui/sidebar'

import { AdminSidebar } from './admin-sidebar'
import { ErrorPage } from '@/pages/error/error-page'

export const AdminLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className='flex min-h-screen flex-col'>
            <ErrorBoundary
                onReset={() => window.location.reload()}
                FallbackComponent={ErrorPage}
            >
                <SidebarProvider>
                    <AdminSidebar />
                    <main className='flex-1'>
                        <div className='flex p-4'>
                            <ScrollArea className='flex-1'>
                                {children ?? <Outlet />}
                            </ScrollArea>
                        </div>
                    </main>
                </SidebarProvider>
            </ErrorBoundary>
        </div>
    )
}
