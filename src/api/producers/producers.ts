import { api } from '../api'

import type { Producer, ProducersQueryParams } from './producers.types'

export const getAllProducers = async (queryParams: Partial<ProducersQueryParams>) => {
    const res = await api.get<Producer[]>('/producers/all/', {
        params: queryParams
    })

    return res.data
}
