import { type ColumnDef } from '@tanstack/react-table'

import type { Color } from '@/api/colors/colors.types'
import { EditColorModal, RemoveColorModal } from './modals'

export const columns: ColumnDef<Color>[] = [
    {
        accessorKey: 'name',
        header: 'Назва',
        cell: ({ row }) => {
            return <div className='w-full truncate'>{row.original.name}</div>
        },
        size: 160
    },
    {
        accessorKey: 'hex',
        header: 'Код кольору',
        cell: ({ row }) => {
            return (
                <div className='flex w-full items-center gap-x-2'>
                    <div
                        style={{ backgroundColor: row.original.hex }}
                        className='size-5 rounded-full border'
                    />
                    <div className='text-xs'>{row.original.hex}</div>
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
                    <EditColorModal color={row.original} />
                    <RemoveColorModal color={row.original} />
                </div>
            )
        },
        size: 100
    }
]
