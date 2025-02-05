import { type ColumnDef } from '@tanstack/react-table'

import { EditBonusLimitModal, RemoveBonusLimitModal } from '../components/modals'

import type { BonusLimit } from '@/api/bonuses/bonuses.types'

export const columns: ColumnDef<BonusLimit>[] = [
    {
        accessorKey: 'name',
        header: 'Ліміт',
        cell: ({ row }) => {
            return row?.original?.accumulation_limit
        },
        size: 140
    },
    {
        accessorKey: 'hex',
        header: 'Знижка',
        cell: ({ row }) => {
            return <> {row.original.discount} %</>
        },
        size: 120
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row }) => {
            return (
                <div className='flex items-center justify-end gap-x-2'>
                    <EditBonusLimitModal bonusLimit={row.original} />
                    <RemoveBonusLimitModal bonusLimit={row.original} />
                </div>
            )
        },
        size: 100
    }
]
