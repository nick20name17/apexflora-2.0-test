import { type ColumnDef } from '@tanstack/react-table'

import { EditBonusLimitModal, RemoveBonusLimitModal } from '../components/modals'

import type { BonusLimit } from '@/api/bonuses/bonuses.types'

export const columns: ColumnDef<BonusLimit>[] = [
    {
        accessorKey: 'name',
        header: () => <div className='w-40'>Ліміт</div>,
        cell: ({ row }) => {
            return <div className='w-40'>{row.original.accumulation_limit}</div>
        }
    },
    {
        accessorKey: 'hex',
        header: () => <div className='w-40'>Знижка</div>,
        cell: ({ row }) => {
            return <div className='w-40'>{row.original.discount}%</div>
        }
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
