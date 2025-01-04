import type { BaseQueryParams } from '../api.types'

export interface Country {
    code: string
    flag: string
    name: string
}

export interface Producer {
    id: number
    name: string
    country: Country
}

export interface ProducerCountries {
    id: number
    name: string
    country: string
}

export type ProducerPayload = Omit<ProducerCountries, 'id'>

export interface ProducersQueryParams extends BaseQueryParams {
    name: string
    search: string
    ordering: string
    country: string
}
