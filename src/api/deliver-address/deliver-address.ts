// export const deliverAddress = api.injectEndpoints({
//     endpoints: (build) => ({
//         getDeliverAddress: build.query<DeliverAddressResponse, DeliverAddressQueryParams>(
//             {
//                 query: (params) => {
//                     const queryString = getQueryParamString(params)
//                     return `deliver-addresses/?${queryString}`
//                 },
//                 providesTags: ['DeliverAddress']
//             }
//         ),
//         addDeliverAddress: build.mutation<void, Partial<DeliverAddressAddData>>({
//             query: (data) => ({
//                 url: `deliver-addresses/`,
//                 method: 'POST',
//                 body: data
//             }),
//             invalidatesTags: ['DeliverAddress']
//         }),
//         patchDeliverAddress: build.mutation<void, DeliverAddressPatchData>({
//             query: ({ data, id }) => ({
//                 url: `deliver-addresses/${id}/`,
//                 method: 'PATCH',
//                 body: data
//             }),
import { api } from '../api'

import type {
    DeliverAddress,
    DeliverAddressPayload,
    DeliverAddressQueryParams,
    DeliverAddressResponse
} from './deliver-address.types'

//             invalidatesTags: ['DeliverAddress']
//         }),
//         removeDeliverAddress: build.mutation<void, number>({
//             query: (id) => ({
//                 url: `deliver-addresses/${id}/`,
//                 method: 'DELETE'
//             }),
//             invalidatesTags: ['DeliverAddress']
//         })
//     })
// })

export const getDeliverAddress = async (
    queryParams: Partial<DeliverAddressQueryParams>
) => {
    const res = await api.get<DeliverAddressResponse>('/deliver-addresses/', {
        params: queryParams
    })

    return res.data
}

export const addDeliverAddress = async (data: DeliverAddressPayload) => {
    const res = await api.post<DeliverAddress>('/deliver-addresses/', data)

    return res.data
}

export const patchDeliverAddress = async (id: number, data: DeliverAddressPayload) => {
    const res = await api.patch<DeliverAddress>(`/deliver-addresses/${id}/`, data)

    return res.data
}

export const removeDeliverAddress = async (id: number) => {
    const res = await api.delete<DeliverAddress>(`/deliver-addresses/${id}/`)

    return res.data
}
