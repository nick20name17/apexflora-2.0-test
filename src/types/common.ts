export type StringAndNumberKeys<T> = {
    [K in keyof T]: T[K] extends string | number ? K : never
}[keyof T]
