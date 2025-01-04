import { api } from '../api'

import type {
    StatusProductQueryParams,
    StatusProductResponse
} from './status-products.types'

export const getStatusProducts = async (params: Partial<StatusProductQueryParams>) => {
    const res = await api.get<StatusProductResponse>('/status-products/', {
        params
    })

    return res.data
}
