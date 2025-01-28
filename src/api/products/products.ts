// export const statusProducts = api.injectEndpoints({
//     endpoints: (build) => ({
//         getProducts: build.query<ProductResponse, Partial<ProductQueryParams>>({
//             query: (params) => {
//                 const queryString = getQueryParamString(params)
//                 return `products/?${queryString}`
//             },
//             providesTags: ['Products']
//         }),
//         addProduct: build.mutation<void, Partial<ProductAddData>>({
//             query: (data) => ({
//                 url: `products/`,
//                 method: 'POST',
//                 body: data
//             }),
//             invalidatesTags: ['Products']
//         }),
//         patchProduct: build.mutation<void, ProductPatchData>({
//             query: (data) => ({
//                 url: `products/`,
//                 method: 'PATCH',
//                 body: data
//             }),
//             invalidatesTags: ['Products']
//         })
//     })
// })
import { api } from '../api'

import type {
    Product,
    ProductPayload,
    ProductQueryParams,
    ProductResponse
} from './products.types'

export const getProducts = async (params: Partial<ProductQueryParams>) => {
    const res = await api.get<ProductResponse>('/products/', { params })
    return res.data
}

export const addProduct = async (data: Partial<ProductPayload>) => {
    const res = await api.post<Product>('/products/', data)
    return res.data
}

export const patchProduct = async (id: number, data: Partial<ProductPayload>) => {
    const res = await api.patch<Product>(`/products/${id}/`, data)
    return res.data
}

export const removeProduct = async (id: number) => {
    api.delete(`/products/${id}/`)
}
