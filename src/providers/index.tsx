import { type PropsWithChildren } from 'react'

import { AuthProvider } from './auth-provider'
import { QueryClientProviders } from './query-client-provider'
import { ThemeProvider } from './theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProviders>
            <AuthProvider>
                <TooltipProvider>
                    <ThemeProvider defaultTheme='light'>{children}</ThemeProvider>
                </TooltipProvider>
            </AuthProvider>
        </QueryClientProviders>
    )
}
