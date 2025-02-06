import { type ColumnDef } from '@tanstack/react-table'

import { EditBonusProgramModal, RemoveBonusProgramModal } from './modals'
import type { BonusProgram } from '@/api/bonuses/bonuses.types'

export const columns: ColumnDef<BonusProgram>[] = [
    {
        accessorKey: 'title',
        header: 'Бонусна програма',
        cell: ({ row }) => {
            return row.original.title
        },
        size: 160
    },
    {
        accessorKey: 'limits',
        header: 'Ліміти',
        cell: ({ row }) => {
            const concatenatedLimits = row.original.limits
                ?.map((limit) => limit.accumulation_limit + ' ₴')
                .join(' | ')
            return <div className='w-full truncate'>{concatenatedLimits}</div>
        },
        size: 240
    },
    {
        accessorKey: 'limits',
        header: 'Знижки',
        cell: ({ row }) => {
            const concatenatedDiscounts = row.original.limits
                ?.map((limit) => limit.discount + ' %')
                .join(' | ')
            return <div className='w-full truncate'>{concatenatedDiscounts}</div>
        },
        size: 240
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row }) => {
            return (
                <div className='flex items-center justify-end gap-x-2'>
                    <EditBonusProgramModal bonusProgram={row.original} />
                    <RemoveBonusProgramModal bonusProgram={row.original} />
                </div>
            )
        },
        size: 100
    }
]
