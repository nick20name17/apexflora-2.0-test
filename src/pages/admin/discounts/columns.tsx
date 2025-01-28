import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { EditDiscountModal, RemoveDiscountModal } from './modals'
import type { Discount } from '@/api/discounts/discounts.types'
import { DATE_FORMATS } from '@/constants/app'

export const columns: ColumnDef<Discount>[] = [
    {
        accessorKey: 'name',
        header: 'Назва',
        size: 160
    },
    {
        accessorKey: 'percentage',
        header: 'Відсоток',
        cell: ({ row }) => {
            return <div>{row.original.percentage} %</div>
        },
        size: 96
    },
    {
        accessorKey: 'start_date',
        header: 'Початок',
        cell: ({ row }) => {
            return format(row.original.start_date, DATE_FORMATS.date)
        },
        size: 128
    },
    {
        accessorKey: 'end_date',
        header: 'Кінець',
        cell: ({ row }) => {
            return format(row.original.end_date, DATE_FORMATS.date)
        },
        size: 128
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row }) => {
            return (
                <div className='flex items-center justify-end gap-x-2'>
                    <EditDiscountModal discount={row.original} />
                    <RemoveDiscountModal discount={row.original} />
                </div>
            )
        }
    }
]
