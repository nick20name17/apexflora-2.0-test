import type { BaseQueryParams, Response } from '../api.types'

export interface BonusLimit {
    id: number
    accumulation_limit: number
    discount: number
}

export type BonusLimitPayload = Omit<BonusLimit, 'id'>

export type BonusLimitResponse = Response<BonusLimit>

export interface BonusLimitsQueryParams extends BaseQueryParams {
    search: string
}

export interface BonusProgram {
    id: number
    title: string
    default: boolean
    limits: BonusLimit[]
}

export type BonusProgramResponse = Response<BonusProgram>

export type BonusProgramPayload = Omit<BonusProgram, 'id' | 'limits'> & {
    limits: string[]
}

export interface BonusProgramsQueryParams extends BaseQueryParams {
    search: string
}
