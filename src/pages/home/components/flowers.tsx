import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { routes } from '@/config/routes'

export const Flowers = () => {
    return (
        <section className='container relative mt-15 min-h-[650px]'>
            <div className='max-w-full rounded-2xl bg-background/80 px-4 py-5 md:p-10 lg:max-w-4xl'>
                <img
                    className='rounded-2xl max-xl:max-w-md max-lg:max-w-[330px] max-sm:w-full lg:absolute lg:right-4 lg:top-20'
                    src='/img/home/about-bg.jpg'
                    alt='Квіти'
                />
                <div className='mt-4 w-full md:mt-10 lg:mt-0 lg:max-w-md xl:max-w-xl'>
                    <h2 className='text-2xl font-medium md:text-4xl'>
                        Apex Flora — найкращі квіти без посередників з усього світу!
                    </h2>
                    <p className='mt-3 text-muted'>
                        Ми пропонуємо широкий асортимент квітів від провідних виробників з
                        усього світу, зокрема з Еквадору, Колумбії, Кенії, Нідерландів та
                        України. Купуючи у нас, ви отримуєте квіти без посередників за
                        найкращими цінами та з безкоштовною доставкою. Це зручно,
                        професійно та вигідно! Реєструйтесь і отримуйте знижку 10%.
                    </p>
                    <Button
                        className='mt-10 w-40'
                        asChild
                    >
                        <Link to={routes.catalogue}>Замовити</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
