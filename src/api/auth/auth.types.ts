import type { User } from '../users/users.types'

export interface LoginPayload {
    email: string
    password: string
}

export interface SignUpPayload {
    email: string
    first_name: string
    last_name: string
    phone_number: string
    city: string
    password: string
}

export interface Tokens {
    access: string
    refresh: string
}

export interface LoginResponse extends Tokens {
    user: User
}
