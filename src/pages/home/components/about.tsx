import { Link } from 'react-router-dom'

import { routes } from '@/config/routes'

export const About = () => {
    return (
        <section
            className='container mt-10 grid gap-10 lg:grid-cols-2 [&_p]:font-book [&_p]:text-foreground/60'
            id='about'
        >
            <div className='rounded-2xl bg-background/40 px-4 py-8 transition-colors hover:bg-background/70 md:p-10'>
                <h2 className='text-2xl font-medium'>Про нас</h2>
                <p className='mt-3'>
                    Ми молода та швидко прогресуюча команда, яка любить те що робить і
                    робить те, що любить ! Працюємо у гуртовому напрямку продажу квітів,
                    лише 3 роки, проте за цей час, розвинули наш сервіс, випереджаючи
                    власний досвід на декілька років вперед.
                </p>
                <p className='mt-5'>
                    Основинй напрямок нашої діяльності, це гуртовий продаж зрізаних
                    квітів. Ми купуємо їх на найбільшому аукціоні світу -Royal Flora
                    Holland, а також працюємо з виробниками Еквадору, Колумбії, Кенії та
                    інших країн світу, включаючи українськиї фермерів. Окрім зрізаних
                    квітів у нас можна замовити рослини та флористичну фурнітуру.
                </p>
                <p className='mt-5'>
                    Щодня ми намагаємося ставати кращими та розвиватися ще більше! Раніше
                    ми були відомі під назвою Flowers Opt, провівши ребрендинг та
                    ренеймінг тепер ми - Apex Flora, що в перекладі - вершина флористики.
                    Let's go досягати її разом ?
                </p>
            </div>
            <div className='rounded-2xl bg-background/40 p-10 transition-colors hover:bg-background/70'>
                <h2 className='text-2xl font-medium'>Про наш сервіс</h2>
                <p className='mt-3'>
                    Ми зібрали величезний асортимент квітів від краших виробників з усього
                    світу, в одному місці !
                </p>
                <p className='mt-5'>
                    Купуючи квіти з вебшопу Apex Flora, ви отримуєте доступ до найбільшого
                    асортименту квітів від садівників з Еквадору, Колумбії, Кенії,
                    Ефіопії, Нідерландів та інших країн світу, а також локальних
                    виробників квітів з України.
                </p>
                <p className='mt-5'>
                    Щодня ми намагаємося ставати кращими та розвиватися ще більше! Раніше
                    ми були відомі під назвою Flowers Opt, провівши ребрендинг та
                    ренеймінг тепер ми - Apex Flora, що в перекладі - вершина флористики.
                    Let's go досягати її разом ?
                </p>
                <p className='mt-5'>
                    Купувати квіти з Apex Flora - це зручно, професійно, сучасно, а саме
                    головне, вигідно ! Ми працюємо без посередників, тому можемо
                    сформувати найкращу ціну на ринку. Здійснюємо безкоштовну доставку
                    замволень, до дверей вашик квіткових магазинів.
                </p>
                <p className='mt-5'>
                    Краще один раз спробувати ніж 100 раз почути! <br />
                    <Link
                        className='text-primary transition-colors hover:text-accent'
                        to={routes.signUp}
                    >
                        Реєструйтесь та отримуйте знижку 10% на перше замволення.
                    </Link>
                </p>
            </div>
        </section>
    )
}
