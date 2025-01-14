import type { BaseQueryParams, Response } from '../api.types'

export interface DeliverAddress {
    id: number
    creator: number
    street: string
    city: string
    title?: string
    description?: string
}

export interface DeliverAddressQueryParams extends BaseQueryParams {
    creator?: number
}

export type DeliverAddressPayload = Omit<DeliverAddress, 'id'>

export type DeliverAddressResponse = Response<DeliverAddress>
