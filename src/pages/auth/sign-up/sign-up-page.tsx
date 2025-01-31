import { SignUpForm } from './sign-up-form'

const SignUpPage = () => {
    return (
        <div className='w-72 md:w-[500px] lg:w-[700px]'>
            <h1 className='text-center text-2xl font-bold text-primary md:text-4xl'>
                Реєстрація
            </h1>
            <SignUpForm />
        </div>
    )
}

export default SignUpPage
