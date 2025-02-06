import { Check, Loader2, X } from 'lucide-react'
import type { UseMutationResult } from 'react-query'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ApproveCellProps<TData, TPayload> {
    isFocused: boolean
    handleCancel: () => void
    mutation: UseMutationResult<TData, unknown, TPayload>
    payload: TPayload
}

export const ApproveCell = <TData, TPayload>({
    isFocused,
    handleCancel,
    mutation,
    payload
}: ApproveCellProps<TData, TPayload>) => {
    return (
        <div
            className={cn(
                'absolute bottom-0 right-0 top-0 z-20 transform items-center gap-x-6 bg-background px-4 transition-all duration-300 ease-in-out',
                isFocused
                    ? 'flex translate-x-0 opacity-100'
                    : 'hidden translate-x-full opacity-0'
            )}
        >
            <span className='text-xs text-muted-foreground'>Зберегти зміни?</span>
            <div className='flex items-center gap-x-2'>
                <Button
                    onClick={() => mutation.mutate(payload)}
                    className='rounded-full'
                    size='icon'
                >
                    {mutation.isLoading ? (
                        <Loader2 className='animate-spin' />
                    ) : (
                        <Check />
                    )}
                </Button>
                <Button
                    variant='destructive'
                    className='rounded-full'
                    size='icon'
                    onClick={handleCancel}
                >
                    <X />
                </Button>
            </div>
        </div>
    )
}
