// export const coworkers = api.injectEndpoints({
//     endpoints: (build) => ({
//         getCoworkers: build.query<CoworkersResponse, CoworkerQueryParams>({
//             query: (params) => {
//                 const queryString = getQueryParamString(params)
//                 return `users-coworkers/?${queryString}`
//             },
//             providesTags: ['Coworkers']
//         }),
import { api } from '../api'

import type {
    Coworker,
    CoworkerPayload,
    CoworkersQueryParams,
    CoworkersResponse
} from './coworkers.types'

//         addCoworker: build.mutation<void, Partial<CoworkersAddData>>({
//             query: (data) => ({
//                 url: `users-coworkers/`,
//                 method: 'POST',
//                 body: data
//             }),
//             invalidatesTags: ['Coworkers']
//         }),
//         patchCoworker: build.mutation<void, CoworkersPatchData>({
//             query: ({ data, id }) => ({
//                 url: `users-coworkers/${id}/`,
//                 method: 'PATCH',
//                 body: data
//             }),

//             invalidatesTags: ['Coworkers']
//         }),
//         removeCoworker: build.mutation<void, number>({
//             query: (id) => ({
//                 url: `users-coworkers/${id}/`,
//                 method: 'DELETE'
//             }),
//             invalidatesTags: ['Coworkers']
//         })
//     })
// })

export const getCoworkers = async (queryParams: Partial<CoworkersQueryParams>) => {
    const res = await api.get<CoworkersResponse>('/users-coworkers/', {
        params: queryParams
    })

    return res.data
}

export const addCoworker = async (data: CoworkerPayload) => {
    const res = await api.post<Coworker>('/users-coworkers/', data)

    return res.data
}

export const patchCoworker = async (id: number, data: CoworkerPayload) => {
    const res = await api.patch<Coworker>(`/users-coworkers/${id}/`, data)

    return res.data
}

export const removeCoworker = async (id: number) => {
    const res = await api.delete<Coworker>(`/users-coworkers/${id}/`)

    return res.data
}
