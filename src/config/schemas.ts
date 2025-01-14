import { z } from 'zod'

export const emailSchema = z.object({
    email: z.string().email({
        message: 'Введіть дійсну адресу електронної пошти'
    })
})

export const passwordShape = {
    password: z
        .string({
            required_error: "Це поле є обов'язковим"
        })
        .min(1, "Це поле є обов'язковим")
        .min(8, 'Пароль повинен містити не менше 8 символів')
        .regex(/[a-z]/, 'Пароль повинен містити не менше однієї малої літери')
        .regex(/[A-Z]/, 'Пароль повинен містити не менше однієї великої літери')
        .regex(/[0-9]/, 'Пароль повинен містити не менше однієї цифри')
        .regex(
            /[!@#$%^&*]/,
            'Пароль повинен містити не менше одного спеціального символу (!@#$%^&*)'
        )
}

export const newPasswordSchema = z.object({
    new_password1: passwordShape.password,
    new_password2: z.string().min(1, 'Підведження паролю необхідне')
})
