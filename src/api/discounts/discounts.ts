// export const discounts = api.injectEndpoints({
//     endpoints: (build) => ({
//         getAllDiscounts: build.query<Discount[], void>({
//             query: () => 'discounts/all/',
//             providesTags: ['Discounts']
//         }),
import { api } from '../api'

import type {
    Discount,
    DiscountPayload,
    DiscountsQueryParams,
    DiscountsResponse
} from './discounts.types'

//         getDiscounts: build.query<DiscountsResponse, Partial<DiscountsQueryParams>>({
//             query: (queryParams) => {
//                 const queryString = getQueryParamString(queryParams)
//                 return `discounts?${queryString}`
//             },
//             providesTags: ['Discounts']
//         }),
//         getDiscount: build.query<Discount, number>({
//             query: (id) => `discounts/${id}`,
//             providesTags: ['Discounts']
//         }),
//         addDiscount: build.mutation<void, DiscountsAddData>({
//             query: (data) => ({
//                 url: `discounts/`,
//                 method: 'POST',
//                 body: data
//             }),
//             invalidatesTags: ['Discounts']
//         }),
//         patchDiscount: build.mutation<void, DiscountsPatchData>({
//             query: ({ id, data }) => ({
//                 url: `discounts/${id}/`,
//                 method: 'PATCH',
//                 body: data
//             }),
//             invalidatesTags: ['Discounts']
//         }),
//         removeDiscount: build.mutation<void, number>({
//             query: (id) => ({
//                 url: `discounts/${id}/`,
//                 method: 'DELETE'
//             }),
//             invalidatesTags: ['Discounts']
//         })
//     })
// })

export const getDiscounts = async (params: Partial<DiscountsQueryParams>) => {
    const { data } = await api.get<DiscountsResponse>('/discounts/', {
        params
    })
    return data
}

export const addDiscount = async (data: DiscountPayload) => {
    const { data: response } = await api.post<Discount>('/discounts/', data)
    return response
}

export const patchDiscount = async (id: number, data: DiscountPayload) => {
    const { data: response } = await api.patch<Discount>(`/discounts/${id}/`, data)
    return response
}

export const removeDiscount = async (id: number) => {
    await api.delete(`/discounts/${id}/`)
}
