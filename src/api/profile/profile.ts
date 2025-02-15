import { api } from "../api"
import type { ProfilesQueryParams, ProfilesResponse } from "./profile.types"

export const getProfiles = async (params: ProfilesQueryParams) => {
    const { data } = await api.get<ProfilesResponse>('/profiles-pages/', {
        params
    })

    return data
}

export const addProfile = async (payload: FormData) => {
    const { data } = await api.post('/profiles-pages/', payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return data
}

export const updateProfile = async (id: number, payload: FormData) => {
    const { data } = await api.patch(`/profiles-pages/${id}/`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return data
}

export const deleteProfile = async (id: number) => {
    const { data } = await api.delete(`/profiles-pages/${id}/`)

    return data
}