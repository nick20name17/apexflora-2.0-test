import { api } from '../api'

import type { Contact, ContactPayload } from './contact.types'

export const postContact = async (data: ContactPayload) => {
    const res = await api.post<Contact>('/contact-us/', data)

    return res.data
}
