import { type ColumnDef } from '@tanstack/react-table'

import { EditProducerModal, RemoveProducerModal } from './modals'
import type { Producer } from '@/api/producers/producers.types'

export const columns: ColumnDef<Producer>[] = [
    {
        accessorKey: 'name',
        header: 'Назва',

        size: 160
    },
    {
        accessorKey: 'hex',
        header: 'Країна',
        cell: ({ row }) => {
            return (
                <div className='flex items-center gap-x-2'>
                    <div>
                        <img
                            src={row.original.country.flag}
                            alt={row.original.country.name}
                            className='size-3.5'
                        />
                    </div>
                    {row.original.country.name}({row.original.country.code})
                </div>
            )
        },
        size: 160
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row }) => {
            return (
                <div className='flex items-center justify-end gap-x-2'>
                    <EditProducerModal producer={row.original} />
                    <RemoveProducerModal producer={row.original} />
                </div>
            )
        }
    }
]
