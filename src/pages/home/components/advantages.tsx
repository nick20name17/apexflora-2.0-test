import { CoinIcon, FlowerIcon, LeafIcon, ShopIcon } from '@/components/icons'

export const Advantages = () => {
    return (
        <section className='container mt-15'>
            <h2 className='text-center text-2xl md:text-4xl'>Наші переваги</h2>
            <p className='mt-1 text-center font-book text-muted-foreground'>
                Кращий спосіб оцінити наші переваги, це оформити перше замовлення, нижче
                виділимо, чому це варто зробити вже зараз
            </p>

            <ul className='mt-5 grid grid-cols-1 gap-3 md:grid-cols-2'>
                <li className='rounded-lg bg-background/40 px-10 py-6 transition-colors hover:bg-background/70'>
                    <FlowerIcon className='size-14' />
                    <h3 className='mt-6 text-xl'>Більше 1000 позицій</h3>
                    <p className='mt-2 font-book text-muted'>
                        У нашому вебшопі зібрано більше 1000 позицій зрізаних квітів, від
                        провідних світових виробників. Обирай краще для свого бізнесу!
                    </p>
                </li>
                <li className='rounded-lg bg-background/40 px-10 py-6 transition-colors hover:bg-background/70'>
                    <ShopIcon className='size-14' />
                    <h3 className='mt-6 text-xl'>Доставка до магазину</h3>
                    <p className='mt-2 font-book text-muted'>
                        Ми доставляємо квіти у спеціальних рефрижираторах, з дотриманням
                        температурних вимог. Отримайте тільки свіжі квіти для своїх
                        вітрин!
                    </p>
                </li>
                <li className='rounded-lg bg-background/40 px-10 py-6 transition-colors hover:bg-background/70'>
                    <LeafIcon className='size-14' />
                    <h3 className='mt-6 text-xl'>Якісний сервіс</h3>
                    <p className='mt-2 font-book text-muted'>
                        Після реєстрації на сайті, ви отримуєте супровід персонального
                        менеджера, який допоможе вам у виборі квітів, під ваші потреби.
                    </p>
                </li>
                <li className='rounded-lg bg-background/40 px-10 py-6 transition-colors hover:bg-background/70'>
                    <CoinIcon className='size-14' />
                    <h3 className='mt-6 text-xl'>Вигідні ціни</h3>
                    <p className='mt-2 font-book text-muted'>
                        Купуй вигідно напряму у виробників квітів з усього світу. Економте
                        свій час та гроші, купуючи квіти для ваших магазинів, без
                        посередників!
                    </p>
                </li>
            </ul>
        </section>
    )
}
