import { type ColumnDef } from '@tanstack/react-table'

import { EditColorModal, RemoveColorModal } from './modals'
import type { Color } from '@/api/colors/colors.types'

export const columns: ColumnDef<Color>[] = [
    {
        accessorKey: 'name',
        header: () => <div className='w-40'>Назва кольору</div>,
        cell: ({ row }) => {
            return <div className='w-40'>{row.original.name}</div>
        }
    },
    {
        accessorKey: 'hex',
        header: () => <div className='w-40'>Код кольору</div>,
        cell: ({ row }) => {
            return (
                <div className='flex w-40 items-center gap-x-2'>
                    <div
                        style={{ backgroundColor: row.original.hex }}
                        className='size-5 rounded-full border'
                    />
                    <div className='text-xs'>{row.original.hex}</div>
                </div>
            )
        }
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
        }
    }
]
