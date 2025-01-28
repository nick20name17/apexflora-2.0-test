export interface Response<T> {
    count: number
    next: string | null
    previous: string | null
    results: T[]
}

export interface BaseQueryParams {
    offset?: number
    limit?: number
}
