// export const stocks = api.injectEndpoints({
//     endpoints: (build) => ({
//         getStocks: build.query<StocksResponse, Partial<StocksQueryParams>>({
//             query: (queryParams) => {
//                 const queryString = getQueryParamString(queryParams)
//                 return `stock?${queryString}`
//             },
//             providesTags: ['Stocks']
//         }),
//         getStockFullData: build.query<StocksFullData, number>({
//             query: (id) => {
//                 return `stock/${id}/full-data/`
//             },
//             providesTags: ['Stocks']
//         }),
//         getPreorderStocks: build.query<
//             PreorderStocksResponse,
//             Partial<StocksQueryParams>
//         >({
//             query: (queryParams) => {
//                 const queryString = getQueryParamString(queryParams)
//                 return `stock/preorder-orders/?${queryString}`
//             },
//             providesTags: ['Stocks', 'PreorderStocks']
//         }),
//         addStock: build.mutation<void, StocksPayload>({
//             query: (data) => ({
//                 url: `stock/`,
//                 method: 'POST',
//                 body: data
//             }),
//             invalidatesTags: ['Stocks']
//         }),
//         patchStock: build.mutation<void, Partial<StocksPatchData>>({
//             query: ({ id, data }) => ({
//                 url: `stock/${id}/`,
//                 method: 'PATCH',
//                 body: data
//             }),
//             invalidatesTags: ['Stocks']
//         }),
//         removeStock: build.mutation<void, number>({
//             query: (id) => ({
//                 url: `stock/${id}/`,
//                 method: 'DELETE'
//             }),
//             invalidatesTags: ['Stocks']
//         })
//     })
// })
import { api } from '../api'

import type {
    PreorderStocksResponse,
    Stock,
    StocksFullData,
    StocksPayload,
    StocksQueryParams,
    StocksResponse
} from './stock.types'

export const getStocks = async (params: Partial<StocksQueryParams>) => {
    const res = await api.get<StocksResponse>('/stock/', {
        params
    })

    return res.data
}

export const getStockFullData = async (id: number) => {
    const res = await api.get<StocksFullData>(`/stock/${id}/full-data/`)

    return res.data
}

export const getPreorderStocks = async (params: Partial<StocksQueryParams>) => {
    const res = await api.get<PreorderStocksResponse>('/stock/preorder-orders/', {
        params
    })

    return res.data
}

export const addStock = async (data: Partial<StocksPayload>) => {
    const res = await api.post<Stock>('/stock/', data)

    return res.data
}

export const patchStock = async (id: number, data: Partial<StocksPayload>) => {
    const res = await api.patch<Stock>(`/stock/${id}/`, data)

    return res.data
}

export const removeStock = async (id: number) => {
    const res = await api.delete(`/stock/${id}/`)

    return res.data
}
