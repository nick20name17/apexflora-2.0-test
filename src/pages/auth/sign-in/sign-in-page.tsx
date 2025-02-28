import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { SignInForm } from './sign-in-form'
import { useAuth } from '@/providers/auth-provider'

const SignInPage = () => {
    const navigate = useNavigate()

    const { isAuth } = useAuth()

    useEffect(() => {
        if (isAuth) {
            navigate('/', { replace: true })
        }
    }, [isAuth, navigate])

    if (isAuth) {
        return null
    }

    return (
        <div className='w-72 sm:w-96'>
            <h1 className='text-center text-2xl font-bold text-primary md:text-4xl'>
                Вхід
            </h1>
            <SignInForm />
        </div>
    )
}

export default SignInPage
