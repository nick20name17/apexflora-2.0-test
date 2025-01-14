import { api } from '../api'

import type { User, UserPayload } from './users.types'

export const updateUser = async (id: number, data: Partial<UserPayload>) => {
    const res = await api.patch<User>(`/users/${id}/`, data)

    return res.data
}

export const getUser = async (id: number) => {
    const res = await api.get<User>(`/users/${id}/`)

    return res.data
}
