import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'

const faqs = [
    {
        title: 'Чи є можливість доставки квітів на конкретну дату?',
        description:
            'Просто оберіть бажані квіти на нашому сайті, додайте їх до кошика і заповніть форму замовлення. Після підтвердження ми надамо вам усю необхідну інформацію щодо доставки.',
        value: 'item-1'
    },
    {
        title: 'Як оформити замовлення на квіти?',
        description:
            'Просто оберіть бажані квіти на нашому сайті, додайте їх до кошика і заповніть форму замовлення. Після підтвердження ми надамо вам усю необхідну інформацію щодо доставки.',
        value: 'item-2'
    },
    {
        title: 'Чи можу я отримати консультацію щодо вибору квітів?',
        description:
            'Просто оберіть бажані квіти на нашому сайті, додайте їх до кошика і заповніть форму замовлення. Після підтвердження ми надамо вам усю необхідну інформацію щодо доставки.',
        value: 'item-3'
    },
    {
        title: 'Чи можна змінити або скасувати замовлення після оформлення?',
        description:
            'Просто оберіть бажані квіти на нашому сайті, додайте їх до кошика і заповніть форму замовлення. Після підтвердження ми надамо вам усю необхідну інформацію щодо доставки.',
        value: 'item-4'
    }
]

export const FAQ = () => {
    return (
        <section className='container mt-10'>
            <div className='flex flex-col items-center justify-center'>
                <h2 className='text-center text-2xl font-medium md:text-4xl'>
                    Ми завжди раді відповісти на ваші запитання
                </h2>
                <p className='mt-1 max-w-2xl text-center text-muted'>
                    Ніхто не скаже про тебе краще, ніж задоволений клієнт. Нам довіряють і
                    для нас це найдорожче
                </p>
            </div>

            <div className='flex flex-col items-center gap-10 md:mt-5 lg:h-[520px] lg:flex-row'>
                <img
                    className='rounded-2xl object-cover object-top max-lg:h-96 max-lg:w-full max-md:hidden'
                    src='/img/home/faq-bg.jpg'
                    alt='Flowers'
                />
                <Accordion
                    className='w-full flex-1 py-5'
                    type='single'
                    collapsible
                >
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            className='border-muted/50'
                            value={faq.value}
                            key={faq.value}
                        >
                            <AccordionTrigger
                                className='space-x-3 text-left text-xl'
                                iconType='plus-minus'
                            >
                                <div className='flex items-start gap-x-5'>
                                    <div> {String(index + 1).padStart(2, '0')}</div>
                                    <div>{faq.title}</div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className='ml-12 text-muted'>
                                {faq.description}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
