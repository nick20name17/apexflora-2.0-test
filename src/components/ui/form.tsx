import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { X } from 'lucide-react'
import * as React from 'react'
import {
    Controller,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
    FormProvider,
    useFormContext
} from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const Form = FormProvider

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
)

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    )
}

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext)
    const itemContext = React.useContext(FormItemContext)
    const { getFieldState, formState } = useFormContext()

    const fieldState = getFieldState(fieldContext.name, formState)

    if (!fieldContext) {
        throw new Error('useFormField should be used within <FormField>')
    }

    const { id } = itemContext

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState
    }
}

type FormItemContextValue = {
    id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
    {} as FormItemContextValue
)

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const id = React.useId()

        return (
            <FormItemContext.Provider value={{ id }}>
                <div
                    ref={ref}
                    className={cn('space-y-2', className)}
                    {...props}
                />
            </FormItemContext.Provider>
        )
    }
)
FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField()

    return (
        <Label
            ref={ref}
            className={cn(error && 'text-destructive', className)}
            htmlFor={formItemId}
            {...props}
        />
    )
})
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<
    React.ElementRef<typeof Slot>,
    React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return (
        <Slot
            ref={ref}
            id={formItemId}
            aria-describedby={
                !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            {...props}
        />
    )
})
FormControl.displayName = 'FormControl'

const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return (
        <p
            ref={ref}
            id={formDescriptionId}
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    )
})
FormDescription.displayName = 'FormDescription'

const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : children

    if (!body) {
        return null
    }

    return (
        <p
            ref={ref}
            id={formMessageId}
            className={cn('text-sm font-medium text-destructive', className)}
            {...props}
        >
            {body}
        </p>
    )
})
FormMessage.displayName = 'FormMessage'

const formSubmissionMessageVariants = cva('rounded-md p-3 text-center text-sm ', {
    variants: {
        variant: {
            success: 'bg-accent/10 text-accent',
            destructive: 'bg-destructive/10 text-destructive'
        }
    }
})

const VISIBLE_DELAY = 7000

const FormSubmissionMessage = ({
    message,
    variant,
    onClose
}: {
    message: string
    variant: 'success' | 'destructive'
    onClose?: () => void
}) => {
    const [isVisible, setIsVisible] = React.useState(true)

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
            onClose?.()
        }, VISIBLE_DELAY)

        return () => clearTimeout(timer)
    }, [onClose])

    if (!isVisible) return null

    return (
        <div className={cn('relative', formSubmissionMessageVariants({ variant }))}>
            {message}
            <button
                onClick={() => {
                    setIsVisible(false)
                    onClose?.()
                }}
                className='hover:bg-gray-200 absolute right-1 top-1 rounded-full p-1 transition-colors'
                aria-label='Закрити повідомлення'
            >
                <X className='size-4' />
            </button>
        </div>
    )
}
FormSubmissionMessage.displayName = 'FormSubmissionMessage'

export {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormSubmissionMessage,
    useFormField
}
