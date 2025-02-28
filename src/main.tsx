import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { createRoot } from 'react-dom/client'
import { scan } from 'react-scan'

import { App } from '@/app'
import '@/index.css'
import { Providers } from '@/providers'

if (process.env.NODE_ENV === 'production') {
    disableReactDevTools()
}

scan({
    enabled: true
})

createRoot(document.getElementById('root')!).render(
    <Providers>
        <App />
    </Providers>
)
