import { type ColumnDef } from '@tanstack/react-table'

import type { Producer } from '@/api/producers/producers.types'
import ImageWithSkeleton from '@/components/ui/image-with-skeleton'
import { EditProducerModal, RemoveProducerModal } from './modals'

export const columns: ColumnDef<Producer>[] = [
    {
        accessorKey: 'name',
        header: 'Назва',
        cell: ({ row }) => {
            return <div className='w-full truncate'>{row.original.name}</div>
        },
        size: 160
    },
    {
        accessorKey: 'country',
        header: 'Країна',
        cell: ({ row }) => {
            return (
                <div className='flex items-center gap-x-2 truncate'>
                    <div>
                        <ImageWithSkeleton
                            src={row.original.country.flag}
                            alt={row.original.country.name}
                            className='size-3.5'
                        />
                    </div>
                    <span className='truncate'>   {row.original.country.name}({row.original.country.code})</span>
                </div>
            )
        },
        size: 80
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
