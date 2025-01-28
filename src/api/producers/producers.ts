import { api } from '../api'

import type {
    Producer,
    ProducerPayload,
    ProducerResponse,
    ProducersQueryParams
} from './producers.types'

export const getAllProducers = async (queryParams: Partial<ProducersQueryParams>) => {
    const res = await api.get<Producer[]>('/producers/all/', {
        params: queryParams
    })

    return res.data
}

export const getProducers = async (queryParams: Partial<ProducersQueryParams>) => {
    const res = await api.get<ProducerResponse>('/producers/', {
        params: queryParams
    })

    return res.data
}

export const addProducer = async (payload: ProducerPayload) => {
    const res = await api.post<Producer>('/producers/', payload)

    return res.data
}

export const patchProducer = async (id: number, payload: ProducerPayload) => {
    const res = await api.patch<Producer>(`/producers/${id}/`, payload)

    return res.data
}

export const deleteProducer = async (id: number) => {
    await api.delete<Producer>(`/producers/${id}/`)
}
