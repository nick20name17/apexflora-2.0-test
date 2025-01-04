export interface Contact {
    name: string
    email: string
    phone_number: string
    text?: string
    contacted: boolean
}

export type ContactPayload = Omit<Contact, 'contacted'>
