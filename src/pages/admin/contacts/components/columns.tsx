import { type ColumnDef } from '@tanstack/react-table'

import { IsReadCell } from './is-read'
import { NoteCell } from './note-cell'
import type { Contact } from '@/api/contacts/contact.types'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'

export const columns: ColumnDef<Contact>[] = [
    {
        accessorKey: 'is_read',
        header: 'Прочитано',
        cell: ({ row }) => <IsReadCell contact={row.original} />,
        size: 96
    },
    {
        accessorKey: 'name',
        header: 'Ім’я ',
        size: 192
    },
    {
        accessorKey: 'email',
        header: 'Пошта',
        size: 240
    },
    {
        accessorKey: 'phone_number',
        header: 'Номер телефон',
        size: 192
    },
    {
        accessorKey: 'text',
        header: 'Повідомлення',
        cell: ({ row }) => {
            return row?.original?.text?.length && row?.original?.text?.length >= 100 ? (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className='truncate pr-2'>
                            {row.original.text}
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{row.original.text}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                <div className='pr-2'>{row.original.text}</div>
            )
        },
        size: 240
    },
    {
        accessorKey: 'comment',
        header: 'Коментар',
        cell: ({ row }) => (
            <NoteCell
                key={row?.original?.comment + row.original.id}
                contact={row.original}
            />
        ),
        size: 288
    }
]
