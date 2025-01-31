import { Link } from 'react-router-dom'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { routes } from '@/config/routes'

const DeliveryPage = () => {
    return (
        <section className='container mt-8 max-w-[800px] pb-10'>
            <Breadcrumb className='mx-auto max-w-[700px]'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to={routes.home}>Головна</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Оплата та доставка</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='mt-5'>
                <img
                    className='rounded-md'
                    src='/img/delivery/delivery-bg.jpg'
                    alt='Доставка та оплата'
                />
            </div>
            <div className='mx-auto mt-5 max-w-[700px]'>
                <h1 className='text-[32px] text-primary'>Оплата та доставка</h1>
                <h2 className='mt-2 text-xl text-primary'>Способи доставки:</h2>
                <ul className='mt-2 flex list-disc flex-col gap-y-2 text-foreground/50'>
                    <li>
                        Доставка власним транспортом <br />
                        Щотижня доставляємо квіти, нашими власними рефрижираторами, від
                        складу, до дверей вашого магазину. Вартість доставки для наших
                        клієнтів, безкоштовна. Стосовно регіонів доставки гуртових
                        замволень на квіти, звертайтеся до наших менеджерів
                    </li>
                    <li>
                        Доставка рейсовими автобусами або попутним транспортом <br />У
                        регіони в які ми не їздимо власними автомобілями, ми здійснюємо
                        доставку рейсовими автобусами або попутним транспортом. Бережно
                        пакуємо усі квіти в коробки, додатково додаючи до них
                        водовіштовхуючий папір та гідогель, для терморегуляції. Вартість
                        доставки, згідно тарифів перевізника.
                    </li>
                    <li>
                        Доставка Новою поштою <br />У дальні регіони, з якими не маємо
                        транспортного сполучення, відправляємо квіти новою поштою. Бережно
                        пакуємо усі квіти в коробки, додатково додаючи до них
                        водовіштовхуючий папір та гідогель, для терморегуляції. Відправку
                        здійснюємо ввечері, а вже зранку наступного дня ви отримуєте квіти
                        у відділені НП. Вартість доставки, згідно тарифів новою пошти.
                    </li>
                    <li>
                        Самовивіз <br />В будь який час ви можете забрати ваше замовлення,
                        у нас на складі в Рівному, за адресою: Дворецька 123а. Ми працюємо
                        щодня - з 09:00 до 18:00 (з 09:00 до 16:00 у неділю).
                    </li>
                </ul>

                <h2 className='mt-2 text-xl text-primary'>Способи оплати:</h2>
                <ul className='mt-2 flex list-disc flex-col gap-y-2 text-foreground/50'>
                    <li>Готівкою при отримані або на складі</li>
                    <li>На розрахунковий рахунок</li>
                    <li>Приват 24/mono або іншим зручним банкінгом</li>
                </ul>

                <p className='mt-5 text-foreground/50'>
                    Зробити передзамовлення або обрати квіти, які є в наявності у нашому
                    складі, можете через наш сайт, перейшовши у{' '}
                    <Link
                        className='text-primary transition-colors hover:text-accent'
                        to={routes.catalogue}
                    >
                        каталог
                    </Link>
                </p>
            </div>
        </section>
    )
}

export default DeliveryPage
