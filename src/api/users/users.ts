import { api } from '../api'
import type { Response } from '../api.types'

import type { User, UserPayload, UsersQueryParams } from './users.types'

export const getUsers = async (params: Partial<UsersQueryParams>) => {
    const res = await api.get<Response<User>>('/users/', {
        params
    })

    return res.data
}

export const getDeletedUsers = async (params: Partial<UsersQueryParams>) => {
    const res = await api.get<Response<User>>('/users/deleted/', {
        params
    })

    return res.data
}

export const createUser = async (data: Partial<UserPayload>) => {
    const res = await api.post<User>('/users/', data)

    return res.data
}

export const updateUser = async (id: number, data: Partial<UserPayload>) => {
    const res = await api.patch<User>(`/users/${id}/`, data)

    return res.data
}

export const removeUser = async (id: number) => {
    const res = await api.delete(`/users/${id}/`)

    return res.data
}

export const getUser = async (id: number) => {
    const res = await api.get<User>(`/users/${id}/`)

    return res.data
}
