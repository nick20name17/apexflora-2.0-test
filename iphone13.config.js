// iphone13.config.js
import { devices } from '@playwright/test'

export default {
    projects: [
        {
            name: 'iPhone 12',
            use: {
                ...devices['iPhone 12'],
                browserName: 'webkit'
            }
        }
    ]
}
