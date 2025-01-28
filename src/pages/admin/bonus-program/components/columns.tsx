import { type ColumnDef } from '@tanstack/react-table'

import { EditBonusProgramModal, RemoveBonusProgramModal } from './modals'
import type { BonusProgram } from '@/api/bonuses/bonuses.types'

export const columns: ColumnDef<BonusProgram>[] = [
    {
        accessorKey: 'title',
        header: () => <div className='w-40'>Бонусна програма</div>,
        cell: ({ row }) => {
            return <div className='w-40'>{row.original.title}</div>
        }
    },
    {
        accessorKey: 'limits',
        header: () => <div className='w-60'>Ліміти</div>,
        cell: ({ row }) => {
            const concatenatedLimits = row.original.limits
                ?.map((limit) => limit.accumulation_limit + ' ₴')
                .join(' | ')
            return <div className='w-60'>{concatenatedLimits}</div>
        }
    },
    {
        accessorKey: 'limits',
        header: () => <div className='w-60'>Знижки</div>,
        cell: ({ row }) => {
            const concatenatedDiscounts = row.original.limits
                ?.map((limit) => limit.discount + ' %')
                .join(' | ')
            return <div className='w-60'>{concatenatedDiscounts}</div>
        }
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
