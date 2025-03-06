import { CoinIcon, FlowerIcon, LeafIcon, ShopIcon } from '@/components/icons'

export const Advantages = () => {
    return (
        <section className='container mt-15'>
            <h2 className='text-center text-2xl md:text-4xl'>Наші переваги</h2>
            <p className='mt-1 font-book text-muted-foreground'>
                Замовте свіжі квіти гуртом сьогодні, щоб вже завтра переконатися у наших
                перевагах та оцінити якість сервісу Apex Flora.
            </p>

            <ul className='mt-5 grid grid-cols-1 gap-3 md:grid-cols-2'>
                <li className='rounded-lg bg-background/40 px-10 py-6 transition-colors hover:bg-background/70'>
                    <FlowerIcon className='size-14' />
                    <h3 className='mt-6 text-xl'>Понад 1500 позицій квітів </h3>
                    <p className='mt-2 font-book text-muted'>
                        Ми співпрацюємо з сотнями провідних світових виробників у галузі
                        вирощування квітів, щоб запропонувати вам необмежений вибір
                        найнеймовірніших зрізаних квітів та вазонів. У каталозі нашого
                        веб-шопу кожного тижня наявно не менше трьохсот позицій товару, і
                        цей перелік постійно оновлюється та доповнюється. У нас завжди
                        великий асортимент квітів для вашого бізнесу.
                    </p>
                </li>
                <li className='rounded-lg bg-background/40 px-10 py-6 transition-colors hover:bg-background/70'>
                    <ShopIcon className='size-14' />
                    <h3 className='mt-6 text-xl'>
                        Безкоштовна доставка до дверей магазину{' '}
                    </h3>
                    <p className='mt-2 font-book text-muted'>
                        Ми доставляємо живі квіти власними сучасними спеціалізованими
                        рефрижераторами, які оснащені системами контролю та регуляції
                        температури, щоб забезпечити збереження свіжості товару під час
                        його транспортування до вашого магазину. Ваші квіткові вітрини
                        варті красивих, свіжих, якісних квітів.
                    </p>
                </li>
                <li className='rounded-lg bg-background/40 px-10 py-6 transition-colors hover:bg-background/70'>
                    <LeafIcon className='size-14' />
                    <h3 className='mt-6 text-xl'>Якісний сервіс</h3>
                    <p className='mt-2 font-book text-muted'>
                        Для вашої зручності наш веб-шоп працює цілодобово.
                        Зареєструвавшись на сайті, ви отримуєте знижку на замовлення та
                        професійний супровід персонального менеджера, який допоможе вам у
                        вирішенні всіх питань, пов’язаних із закупівлею квітів гуртом.
                        Наші клієнти заслуговують на найкращий сервіс.
                    </p>
                </li>
                <li className='rounded-lg bg-background/40 px-10 py-6 transition-colors hover:bg-background/70'>
                    <CoinIcon className='size-14' />
                    <h3 className='mt-6 text-xl'>Вигідні ціни на квіти </h3>
                    <p className='mt-2 font-book text-muted'>
                        Apex Flora є прямим постачальником квітів від виробників з усього
                        світу. Завдяки цьому ми можемо пропонувати вам найкращу ціну на
                        ринку. Розумна економія на замовленні квітів оптом – вибір
                        професіоналів і шлях до розвитку вашого бізнесу. Ми прагнемо, щоб
                        у співпраці з нами наші клієнти могли розширити свої можливості.
                    </p>
                </li>
            </ul>
        </section>
    )
}
