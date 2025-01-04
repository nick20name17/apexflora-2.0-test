// import { api } from '..'
import { api } from '../api'

import type { Color, ColorsQueryParams } from './colors.types'

// import type {
//     ColorsAddData,
//     ColorsData,
//     ColorsPatchData,
//     ColorsQueryParams,
//     ColorsResponse
// } from './colors.types'
// import { getQueryParamString } from '@/utils'

// export const colors = api.injectEndpoints({
//     endpoints: (build) => ({
//         getAllColors: build.query<ColorsData[], Partial<ColorsQueryParams>>({
//             query: (queryParams) => {
//                 const queryString = getQueryParamString(queryParams)
//                 return `colors/all?${queryString}`
//             },
//             providesTags: ['Colors']
//         }),
//         getResponseColors: build.query<ColorsResponse, Partial<ColorsQueryParams>>({
//             query: (queryParams) => {
//                 const queryString = getQueryParamString(queryParams)
//                 return `colors?${queryString}`
//             },
//             providesTags: ['Colors']
//         }),
//         getColor: build.query<ColorsData, number>({
//             query: (id) => `colors/${id}`,
//             providesTags: ['Colors']
//         }),
//         addColor: build.mutation<void, ColorsAddData>({
//             query: (data) => ({
//                 url: `colors/`,
//                 method: 'POST',
//                 body: data
//             }),
//             invalidatesTags: ['Colors']
//         }),
//         patchColor: build.mutation<void, ColorsPatchData>({
//             query: ({ id, data }) => ({
//                 url: `colors/${id}/`,
//                 method: 'PATCH',
//                 body: data
//             }),
//             invalidatesTags: ['Colors']
//         }),
//         removeColor: build.mutation<void, number>({
//             query: (id) => ({
//                 url: `colors/${id}/`,
//                 method: 'DELETE'
//             }),
//             invalidatesTags: ['Colors']
//         })
//     })
// })

// export const {
//     useGetAllColorsQuery,
//     useAddColorMutation,
//     useGetColorQuery,
//     useGetResponseColorsQuery,
//     useRemoveColorMutation,
//     usePatchColorMutation
// } = colors

export const getAllColors = async (queryParams: Partial<ColorsQueryParams>) => {
    const res = await api.get<Color[]>(`/colors/all/`, {
        params: queryParams
    })

    return res.data
}
