import type { FallbackProps } from 'react-error-boundary'

import { MetaHead } from '@/components/meta-head'
import { Button } from '@/components/ui/button'

export const ErrorPage = ({ resetErrorBoundary }: FallbackProps) => {
    return (
        <>
            <MetaHead
                title='Помилка'
                desctiption='Сталась помилка'
            />
            <div className='flex min-h-full flex-col items-center justify-center gap-y-6'>
                <h1 className='text-4xl font-bold md:text-5xl'>Сталась помилка</h1>
                <Button onClick={resetErrorBoundary}>Спробувати ще раз</Button>
            </div>
        </>
    )
}
