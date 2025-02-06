import { type PropsWithChildren } from 'react'

import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClientProviders } from './query-client-provider'
import { ThemeProvider } from './theme-provider'

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProviders>
            <TooltipProvider>
                <ThemeProvider defaultTheme='light'>{children}</ThemeProvider>
            </TooltipProvider>
        </QueryClientProviders>
    )
}
