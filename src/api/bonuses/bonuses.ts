// export const bonusLimits = api.injectEndpoints({
//     endpoints: (build) => ({
//         getBonusLimits: build.query<BonusLimitResponse, Partial<BonusLimitsQueryParams>>({
//             query: (queryParams) => {
//                 const queryString = getQueryParamString(queryParams)
//                 return `/bonuses-limits?${queryString}`
//             },
//             providesTags: ['BonusLimits']
//         }),
//         addBonusLimit: build.mutation<void, BonusLimitAddData>({
//             query: (data) => ({
//                 url: `/bonuses-limits/`,
//                 method: 'POST',
//                 body: data
//             }),
//             invalidatesTags: ['BonusLimits']
//         }),
//         patchBonusLimit: build.mutation<void, BonusLimitPatchData>({
//             query: ({ id, data }) => ({
//                 url: `/bonuses-limits/${id}/`,
//                 method: 'PATCH',
//                 body: data
//             }),
//             invalidatesTags: ['BonusLimits']
//         }),
//         removeBonusLimit: build.mutation<void, number>({
//             query: (id) => ({
//                 url: `/bonuses-limits/${id}/`,
//                 method: 'DELETE'
//             }),
//             invalidatesTags: ['BonusLimits']
//         }),
//         getBonusPrograms: build.query<
//             BonusProgramResponse,
//             Partial<BonusProgramsQueryParams>
//         >({
//             query: (queryParams) => {
//                 const queryString = getQueryParamString(queryParams)
//                 return `bonuses-programs?${queryString}`
//             },
//             providesTags: ['BonusPrograms']
//         }),
//         addBonusProgram: build.mutation<void, BonusProgramAddData>({
//             query: (data) => ({
//                 url: `bonuses-programs/`,
//                 method: 'POST',
//                 body: data
//             }),
//             invalidatesTags: ['BonusPrograms']
//         }),
//         patchBonusProgram: build.mutation<void, BonusProgramPatchData>({
//             query: ({ id, data }) => ({
//                 url: `bonuses-programs/${id}/`,
//                 method: 'PATCH',
//                 body: data
//             }),
//             invalidatesTags: ['BonusPrograms']
//         }),
//         removeBonusProgram: build.mutation<void, number>({
//             query: (id) => ({
//                 url: `bonuses-programs/${id}/`,
//                 method: 'DELETE'
//             }),
//             invalidatesTags: ['BonusPrograms']
//         })
//     })
// })
import { api } from '../api'

import type {
    BonusLimit,
    BonusLimitPayload,
    BonusLimitResponse,
    BonusLimitsQueryParams,
    BonusProgram,
    BonusProgramPayload,
    BonusProgramResponse,
    BonusProgramsQueryParams
} from './bonuses.types'

export const getBonusLimits = async (params: Partial<BonusLimitsQueryParams>) => {
    const { data } = await api.get<BonusLimitResponse>('/bonuses-limits/', {
        params
    })
    return data
}

export const addBonusLimit = async (data: BonusLimitPayload) => {
    const { data: response } = await api.post<BonusLimit>('/bonuses-limits/', data)
    return response
}

export const patchBonusLimit = async (id: number, data: BonusLimitPayload) => {
    const { data: response } = await api.patch<BonusLimit>(`/bonuses-limits/${id}/`, data)
    return response
}

export const removeBonusLimit = async (id: number) => {
    await api.delete(`/bonuses-limits/${id}/`)
}

export const getBonusPrograms = async (params: Partial<BonusProgramsQueryParams>) => {
    const { data } = await api.get<BonusProgramResponse>('/bonuses-programs/', {
        params
    })
    return data
}

export const addBonusProgram = async (data: BonusProgramPayload) => {
    const { data: response } = await api.post<BonusProgram>('/bonuses-programs/', data)
    return response
}

export const patchBonusProgram = async (id: number, data: BonusProgramPayload) => {
    const { data: response } = await api.patch<BonusProgram>(
        `/bonuses-programs/${id}/`,
        data
    )
    return response
}

export const removeBonusProgram = async (id: number) => {
    await api.delete(`/bonuses-programs/${id}/`)
}
