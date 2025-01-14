import type { BaseQueryParams, Response } from '../api.types'

export interface Coworker {
    id: number
    creator: number
    first_name: string
    last_name: string
    phone_number: string
    email: string
}

export interface CoworkersQueryParams extends BaseQueryParams {
    creator: number
}

export type CoworkerPayload = Omit<Coworker, 'id'> & {
    creator: number
}

export type CoworkersResponse = Response<Coworker>
