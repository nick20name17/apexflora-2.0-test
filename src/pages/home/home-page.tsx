import { About } from './components/about'
import { Advantages } from './components/advantages'
import { Catalogue } from './components/catalogue'
import { Contact } from './components/contact'
import { CTA } from './components/cta'
import { FAQ } from './components/faq'
import { Feedback } from './components/feedback'
import { Flowers } from './components/flowers'
import { Hero } from './components/hero'
import { Location } from './components/location'
import { SignUpSuccess } from './components/sign-up-success'
import { MetaHead } from '@/components/meta-head'

export const HomePage = () => {
    return (
        <>
            <MetaHead
                title='Головна'
                desctiption='Головна сторінка Apexflora'
            />
            <Hero />
            <Catalogue />
            <Advantages />
            <Flowers />
            <Feedback />
            <FAQ />
            <Contact />
            <Location />
            <About />
            <CTA />
            <SignUpSuccess />
        </>
    )
}
