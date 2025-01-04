import { Link } from 'react-router-dom'

import { MetaHead } from '@/components/meta-head'
import { Button } from '@/components/ui/button'
import { routes } from '@/config/routes'

export const NotFoundPage = () => {
    return (
        <>
            <MetaHead
                title='404'
                desctiption='404 - Сторінку не знайдено'
            />
            <div className='flex min-h-full flex-col items-center justify-center gap-y-6'>
                <h1 className='text-5xl font-bold'>404 - Сторінку не знайдено</h1>
                <Link to={routes.home}>
                    <Button>На головну</Button>
                </Link>
            </div>
        </>
    )
}
