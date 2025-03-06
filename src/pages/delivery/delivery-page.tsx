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
                <ul className='mt-2 flex list-disc flex-col gap-y-2 text-muted'>
                    <li>
                        Доставка власним транспортом <br />
                        Кожного тижня ми доставляємо клієнтам квіти нашими
                        спеціалізованими рефрижераторами. Вартість доставки цим
                        транспортом для клієнтів безкоштовна. Можливість доставки гуртових
                        замовлень у ваше місто чи регіон уточнюйте у менеджера.
                    </li>
                    <li>
                        Доставка рейсовими автобусами або попутнім транспортом <br />У
                        Якщо ваше місто віддалене від маршруту наших автомобілів, ми
                        відправимо вам замовлення рейсовими автобусами або попутнім
                        транспортом. При цьому ми подбаємо про збереження свіжості ваших
                        квітів – обережно запакуємо їх у коробки, додатково додаючи
                        водовідштовхуючий папір та гідрогель для терморегуляції. Вартість
                        доставки – згідно з тарифами перевізника.
                    </li>
                    <li>
                        Доставка Новою поштою <br />У регіони, з якими немає зручного
                        транспортного сполучення, відправляємо квіти “Новою поштою”. Ваше
                        замовлення буде надійно запаковане, як і в попередньому випадку.
                        Квіти відправимо увечері, щоб вже наступного дня ви могли отримати
                        їх у відділенні. Вартість доставки – згідно з тарифами “Нової
                        пошти”.
                    </li>
                    <li>
                        Самовивіз <br />
                        Ви завжди можете забрати ваші квіти гуртом у Рівному, з нашого
                        складу за адресою: вул. Млинівська 23д. Ми працюємо щодня з 09:00
                        до 18:00 (у неділю з 09:00 до 17:00).
                    </li>
                </ul>

                <h2 className='mt-2 text-xl text-primary'>Способи оплати:</h2>
                <p className='text-muted'>
                    За замовлені у нашому веб-шопі квіти ви можете заплатити, обравши
                    зручний для вас варіант.{' '}
                </p>
                <ul className='mt-2 flex list-disc flex-col gap-y-2 text-muted'>
                    <li>Готівкою при отримані або на складі</li>
                    <li>На розрахунковий рахунок</li>
                    {/* <li>Приват 24/mono або іншим зручним банкінгом</li> */}
                </ul>

                <p className='mt-5 text-muted'>
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
