import type { BaseQueryParams } from '../api.types'
import type { Coworker } from '../coworkers/coworkers.types'

export type Roles = 'admin' | 'manager' | 'client'

export interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    phone_number: string
    company: string
    position: string
    role: Roles
    first_discount: number
    city: string
    service_manager: ServiceManager
    is_active: boolean
    code_1c: string
    bonus_program: BonusProgram
    coworkers: Coworker[]
    last_login: string
    is_deleted: boolean
}

interface BonusProgram {
    id: number
    title: string
    default: boolean
    limits: Limit[]
}

export interface Limit {
    id: number
    accumulation_limit: number
    discount: number
}

export type UserPayload = Omit<
    User,
    'id' | 'is_active' | 'last_login' | 'coworkers' | 'service_manager' | 'bonus_program'
> & {
    service_manager: number
    bonus_program: number
    password: string
}

export interface ServiceManager {
    id: number
    first_name: string
    last_name: string
    phone_number: string
    email: string
}

export interface UsersQueryParams extends BaseQueryParams {
    first_name: string
    last_name: string
    email: string
    is_active: boolean
    city: string
    phone_number: string
    role: string
    is_deleted: boolean
    search: string
    ordering: string
}
