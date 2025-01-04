import { createRoot } from 'react-dom/client'

import { App } from '@/app'
import '@/index.css'
import { Providers } from '@/providers'

createRoot(document.getElementById('root')!).render(
    <Providers>
        <App />
    </Providers>
)
