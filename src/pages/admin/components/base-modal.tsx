import { zodResolver } from '@hookform/resolvers/zod'
import { CirclePlus, Loader2, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import type {
    BaseModalProps,
    CreateModalProps,
    DeleteModalProps,
    EditModalProps,
    Entity,
    FormModalProps
} from './base-modal.types'

const BaseModal = ({
    open,
    onOpenChange,
    trigger,
    title,
    children,
    className = 'mx-2 rounded-md'
}: BaseModalProps) => {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent
                onClick={(e) => e.stopPropagation()}
                className={className}
            >
                <DialogHeader className='text-left'>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}

const FormModal = <TData extends Entity, TSchema extends z.ZodType>({
    defaultValues,
    schema,
    onSubmit,
    isLoading,
    trigger,
    title,
    submitText,
    renderFields,
    isSuccess,
    open,
    onOpenChange
}: FormModalProps<TData, TSchema>) => {
    const form = useForm<z.infer<TSchema>>({
        values: defaultValues,
        resolver: zodResolver(schema)
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        if (event) {
            if (typeof event.preventDefault === 'function') {
                event.preventDefault()
            }
            if (typeof event.stopPropagation === 'function') {
                event.stopPropagation()
            }
        }

        return form.handleSubmit((data) => {
            onSubmit(data)
            isSuccess ? form.reset() : null
        })(event)
    }

    return (
        <BaseModal
            className='max-w-2xl'
            open={open}
            onOpenChange={onOpenChange}
            trigger={trigger}
            title={title}
        >
            <Form {...form}>
                <form
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    className='space-y-4 [&_input]:h-10'
                    onSubmit={handleSubmit}
                >
                    {renderFields(form)}
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                        disabled={isLoading}
                        type='submit'
                        size='sm'
                        className='w-28'
                    >
                        {isLoading ? <Loader2 className='animate-spin' /> : submitText}
                    </Button>
                </form>
            </Form>
        </BaseModal>
    )
}

export function CreateModal<TData extends Entity, TSchema extends z.ZodType>({
    title,
    defaultValues,
    schema,
    mutation,
    queryKey,
    renderFields,
    size = 'sm',
    buttonText
}: CreateModalProps<TData, TSchema>) {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: mutation,
        onSuccess: () => {
            Array.isArray(queryKey)
                ? queryKey.forEach((key) =>
                    queryClient.invalidateQueries({ queryKey: key })
                )
                : queryClient.invalidateQueries({ queryKey })

            toast.success(`${title} успішно додано`)
            setOpen(false)
        }
    })

    const trigger = (
        <Button
            onClick={(e) => {
                e.stopPropagation()
            }}
            className='flex-shrink-0 gap-x-2'
            size={size}
        >
            <CirclePlus />
            {size === 'icon' ? '' : buttonText || `Додати ${title.toLowerCase()}`}
        </Button>
    )

    return (
        <FormModal<TData, TSchema>
            open={open}
            onOpenChange={setOpen}
            trigger={trigger}
            title={`Додати ${title.toLowerCase()}`}
            defaultValues={defaultValues}
            schema={schema}
            onSubmit={createMutation.mutate}
            isLoading={createMutation.isLoading}
            submitText='Додати'
            renderFields={renderFields}
            isSuccess={createMutation.isSuccess}
        />
    )
}

export function EditModal<TData extends Entity, TSchema extends z.ZodType>({
    title,
    data,
    schema,
    mutation,
    queryKey,
    renderFields,
    transformDefaultValues
}: EditModalProps<TData, TSchema>) {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()

    const defaultValues = transformDefaultValues
        ? transformDefaultValues(data)
        : (data as z.infer<TSchema>)

    const editMutation = useMutation({
        mutationFn: (payload: z.infer<TSchema>) => mutation(data.id, payload),
        onSuccess: () => {
            Array.isArray(queryKey)
                ? queryKey.forEach((key) =>
                    queryClient.invalidateQueries({ queryKey: key })
                )
                : queryClient.invalidateQueries({ queryKey })
            toast.success(`${title} успішно відредаговано`)
            setOpen(false)
        }
    })

    const trigger = (
        <Button
            onClick={(e) => {
                e.stopPropagation()
            }}
            size='icon'
            variant='outline'
        >
            <Pencil />
        </Button>
    )

    return (
        <FormModal<TData, TSchema>
            open={open}
            onOpenChange={setOpen}
            trigger={trigger}
            title={`Редагувати ${title.toLowerCase()}`}
            defaultValues={defaultValues}
            schema={schema}
            onSubmit={editMutation.mutate}
            isLoading={editMutation.isLoading}
            submitText='Редагувати'
            renderFields={renderFields}
            isSuccess={editMutation.isSuccess}
        />
    )
}

export function DeleteModal<TData extends Entity>({
    title,
    data,
    mutation,
    queryKey
}: DeleteModalProps<TData>) {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: () => mutation(data.id),
        onSuccess: () => {
            Array.isArray(queryKey)
                ? queryKey.forEach((key) =>
                    queryClient.invalidateQueries({ queryKey: key })
                )
                : queryClient.invalidateQueries({ queryKey })
            toast.success(`${title} успішно видалено`)
            setOpen(false)
        }
    })

    const trigger = (
        <Button
            onClick={(e) => {
                e.stopPropagation()
            }}
            className='hover:bg-destructive hover:text-destructive-foreground hover:border-destructive'
            variant='outline'
            size='icon'
        >
            <Trash2 />
        </Button>
    )

    return (
        <BaseModal
            open={open}
            onOpenChange={setOpen}
            trigger={trigger}
            title={`Видалити ${title.toLowerCase()}`}
        >
            <div className='flex items-center justify-end gap-x-4'>
                <Button
                    onClick={(e) => {
                        setOpen(false)
                        e.stopPropagation()
                    }}
                    size='sm'
                    variant='secondary'
                >
                    Відмінити
                </Button>
                <Button
                    disabled={deleteMutation.isLoading}
                    onClick={(e) => {
                        deleteMutation.mutate()
                        e.stopPropagation()
                    }}
                    size='sm'
                    variant='destructive'
                    className='flex w-24 items-center gap-x-1.5'
                >
                    {deleteMutation.isLoading ? (
                        <Loader2 className='animate-spin' />
                    ) : (
                        'Видалити'
                    )}
                </Button>
            </div>
        </BaseModal>
    )
}