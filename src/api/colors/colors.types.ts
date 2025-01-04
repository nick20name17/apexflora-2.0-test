import type { BaseQueryParams, Response } from '../api.types'

export interface Color {
    id: number
    name: string
    hex: string
}

export type ColorPayload = Omit<Color, 'id'>

export type ColorsResponse = Response<Color>

export interface ColorsQueryParams extends BaseQueryParams {
    name: string
    search: string
    ordering: string
}
