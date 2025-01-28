import { Check, Loader2 } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import type { Contact } from '@/api/contacts/contact.types'
import { updateContact } from '@/api/contacts/contacts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface NoteCellProps {
    contact: Contact
}

export const NoteCell = ({ contact }: NoteCellProps) => {
    const queryClient = useQueryClient()
    const [note, setNote] = useState(contact?.comment || '')
    const [isEditing, setIsEditing] = useState(false)

    const patchContactMutation = useMutation({
        mutationFn: () => updateContact(contact.id, { comment: note }),
        onSuccess: () => {
            setIsEditing(false)
            queryClient.invalidateQueries('contacts')
        }
    })

    const inputRef = useRef<HTMLInputElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const handleBlur = useCallback((e: React.FocusEvent) => {
        if (!buttonRef.current?.contains(e.relatedTarget as Node)) {
            setIsEditing(false)
        }
    }, [])

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
                patchContactMutation.mutate()
            }
        },
        [patchContactMutation]
    )

    const showButton = isEditing && note !== contact.comment

    return (
        <div className='relative w-72'>
            <Input
                ref={inputRef}
                placeholder='Додайте коментар'
                className={`h-9 w-full transition-all duration-200 ${
                    showButton ? 'pr-8' : ''
                }`}
                maxLength={100}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onFocus={() => setIsEditing(true)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                disabled={patchContactMutation.isLoading}
            />
            <div
                className={`absolute right-1 top-1/2 -translate-y-1/2 transform transition-all duration-200 ${
                    showButton ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                }`}
            >
                <Button
                    className='h-7 w-7 rounded-full p-0'
                    ref={buttonRef}
                    disabled={patchContactMutation.isLoading || note === contact.comment}
                    onClick={() => patchContactMutation.mutate()}
                    variant='ghost'
                    size='icon'
                >
                    {patchContactMutation.isLoading ? (
                        <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                        <Check className='h-4 w-4' />
                    )}
                </Button>
            </div>
        </div>
    )
}

export default NoteCell
