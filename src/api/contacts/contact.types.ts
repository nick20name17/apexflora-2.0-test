import type { BaseQueryParams, Response } from '../api.types'

export interface Contact {
    id: number
    name: string
    email: string
    phone_number: string
    text?: string
    is_read?: boolean
    contacted: boolean
    created_at: string
    comment: string
}

export type ContactPayload = Omit<Contact, 'created_at' | 'id'>

export type ContactsResponse = Response<Contact>

export interface ContactsQueryParams extends BaseQueryParams {
    name: string
    search: string
}
