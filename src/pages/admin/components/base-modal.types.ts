import type { DialogProps } from '@radix-ui/react-dialog'
import type { VariantProps } from 'class-variance-authority'
import { type UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { buttonVariants } from '@/components/ui/button'

// Generic types for entity and payload
export type Entity = {
    id: number | string
    [key: string]: any
}

// Base modal props
export interface BaseModalProps extends Omit<DialogProps, 'children'> {
    trigger: React.ReactNode
    title: string
    className?: string
    children: React.ReactNode
}

// Form modal props
export interface FormModalProps<_, TSchema extends z.ZodType> {
    defaultValues: z.infer<TSchema>
    schema: TSchema
    onSubmit: (data: z.infer<TSchema>) => void
    isLoading: boolean
    trigger: React.ReactNode
    title: string
    submitText: string
    renderFields: (form: UseFormReturn<z.infer<TSchema>>) => React.ReactNode
    open: boolean
    isSuccess: boolean
    onOpenChange: (open: boolean) => void
}

export interface CreateModalProps<TData extends Entity, TSchema extends z.ZodType> {
    title: string
    defaultValues: z.infer<TSchema>
    schema: TSchema
    mutation: (data: z.infer<TSchema>) => Promise<TData>
    queryKey: string | string[]
    renderFields: (form: UseFormReturn<z.infer<TSchema>>) => React.ReactNode
    size?: VariantProps<typeof buttonVariants>['size']
    buttonText?: string
}

export interface EditModalProps<TData extends Entity, TSchema extends z.ZodType> {
    title: string
    data: TData
    schema: TSchema
    mutation: (id: TData['id'], data: z.infer<TSchema>) => Promise<TData>
    queryKey: string | string[]
    renderFields: (form: UseFormReturn<z.infer<TSchema>>) => React.ReactNode
    transformDefaultValues?: (data: TData) => z.infer<TSchema>
    className?: string
}

export interface DeleteModalProps<TData extends Entity> {
    title: string
    data: TData
    mutation: (id: TData['id']) => Promise<void>
    queryKey: string | string[]
    className?: string
}
