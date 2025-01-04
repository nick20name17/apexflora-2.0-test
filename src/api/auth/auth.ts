import { publicApi } from '../api'
import type { User } from '../users/users.types'

import type { LoginPayload, LoginResponse, SignUpPayload, Tokens } from './auth.types'

export const login = async (data: LoginPayload) => {
    const res = await publicApi.post<LoginResponse>('/token/', data)

    return res.data
}

export const signUp = async (data: SignUpPayload) => {
    const res = await publicApi.post<User>('/users/', data)

    return res.data
}

export const refresh = async (data: { refresh: Tokens['refresh'] }) => {
    const res = await publicApi.post<Tokens>('/token/refresh/', data)

    return res.data
}
