import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import type { Contact } from '@/api/contacts/contact.types'
import { updateContact } from '@/api/contacts/contacts'
import { Checkbox } from '@/components/ui/checkbox'

interface IsReadCellProps {
    contact: Contact
}

export const IsReadCell = ({ contact }: IsReadCellProps) => {
    const queryClient = useQueryClient()
    const [isRead, setIsRead] = useState(contact?.is_read ?? false)

    const patchContactMutation = useMutation({
        mutationFn: ({ isRead }: { isRead: boolean }) =>
            updateContact(contact.id, { is_read: isRead }),
        onSuccess: () => {
            setIsRead(!isRead)
            queryClient.invalidateQueries('contacts')
        }
    })

    return (
        <Checkbox
            disabled={patchContactMutation.isLoading}
            className='size-5'
            onCheckedChange={() => {
                setIsRead((prev) => !prev)
                patchContactMutation.mutate({ isRead: !isRead })
            }}
            checked={isRead}
        />
    )
}
