export const Location = () => {
    return (
        <section className='container mt-15'>
            <div className='flex flex-col items-center gap-5 rounded-2xl bg-background/80 p-4 md:p-5 lg:flex-row'>
                <iframe
                    className='min-h-[420px] w-full rounded-2xl border-none'
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2531.9094227276896!2d26.2299645!3d50.61022059999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472f6d5f9611ea3d%3A0xd82c5983c0e84c83!2zQXBleCBGbG9yYSAtINCz0YPRgNGC0ZbQstC90Y8g0LrQstGW0YLRltCy!5e0!3m2!1suk!2sua!4v1734785016430!5m2!1suk!2sua'
                    allowFullScreen
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                ></iframe>
                <div className='w-full'>
                    <h2 className='text-2xl md:text-4xl'>Де нас знайти? </h2>
                    <p className='mt-3 text-muted'>
                        Ми знаходимося в місті Рівне, що дозволяє нам ефективно
                        обслуговувати наших клієнтів та доставляти квіти в будь-яку точку.
                        Зручне розміщення дає можливість нам швидко доставляти ваші
                        замовлення.
                    </p>
                    <p className='mt-3 text-muted'>
                        📍<span className='text-foreground'>Адреса</span> м. Рівне,
                        Дворецька 123а
                    </p>
                </div>
            </div>
        </section>
    )
}
