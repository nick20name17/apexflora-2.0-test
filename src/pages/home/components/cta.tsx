import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { routes } from '@/config/routes'

export const CTA = () => {
    return (
        <section className='container mt-10'>
            <div className='relative grid h-[480px] w-full place-items-center rounded-2xl bg-flower bg-cover bg-center bg-no-repeat px-4 py-8 md:p-24'>
                <div className='absolute inset-0 rounded-2xl bg-foreground/70'></div>
                <div className='relative z-10 max-w-xl text-center'>
                    <h2 className='text-3xl font-bold leading-tight text-background md:text-5xl'>
                        Величезний вибір квітів з усього світу!
                    </h2>
                    <p className='mt-3 text-muted'>
                        Реєструйтесь на Apex Flora та{' '}
                        <span className='text-accent'>
                            отримайте знижку 10% на перше замовлення
                        </span>
                        з найбільшого асортименту квітів від кращих виробників світу!
                    </p>
                    <Button
                        className='mt-10 w-40'
                        variant='secondary'
                        asChild
                    >
                        <Link to={routes.signUp}>Реєстрація</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
