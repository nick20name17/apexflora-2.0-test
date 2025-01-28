import { api } from '../api'

import type {
    Contact,
    ContactPayload,
    ContactsQueryParams,
    ContactsResponse
} from './contact.types'

export const getContacts = async (params: Partial<ContactsQueryParams>) => {
    const res = await api.get<ContactsResponse>('/contact-us/', {
        params
    })

    return res.data
}

export const postContact = async (data: Partial<ContactPayload>) => {
    const res = await api.post<Contact>('/contact-us/', data)

    return res.data
}

export const updateContact = async (id: number, data: Partial<ContactPayload>) => {
    const res = await api.patch<Contact>(`/contact-us/${id}/`, data)

    return res.data
}

export const removeContact = async (id: number) => {
    const res = await api.delete(`/contact-us/${id}/`)

    return res.data
}
