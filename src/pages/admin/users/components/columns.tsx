import { type ColumnDef } from '@tanstack/react-table'

import { EditUserModal, RemoveUserModal } from './modals'
import type { User } from '@/api/users/users.types'
import { getRoleBadgeInfo } from '@/constants/user'
import { cn } from '@/lib/utils'

export const usersColumns: ColumnDef<User>[] = [
    {
        accessorKey: 'first_name',
        header: 'Імя та прізвище',
        cell: ({ row }) => {
            return (
                <div className='max-w-full truncate'>
                    {row.original.first_name + ' ' + row.original.last_name}
                </div>
            )
        }
    },
    {
        accessorKey: 'email',
        header: 'Пошта',
        cell: ({ row }) => {
            return <div className='max-w-full truncate'>{row.original.email}</div>
        },
        size: 240
    },
    {
        accessorKey: 'phone_number',
        header: '>Номер телефон',
        cell: ({ row }) => {
            return <div className='max-w-full truncate'>{row.original.phone_number}</div>
        },
        size: 192
    },
    {
        accessorKey: 'company',
        header: 'Компанія',
        cell: ({ row }) => {
            return row.original.company || '-'
        },
        size: 96
    },
    {
        accessorKey: 'city',
        header: 'Місто',
        cell: ({ row }) => {
            return row.original.city || '-'
        },
        size: 144
    },
    {
        accessorKey: 'code_1c',
        header: 'Код 1C',
        cell: ({ row }) => {
            return row.original.code_1c || '-'
        },
        size: 66
    },
    {
        accessorKey: 'bonus_program',
        header: 'Бонус',
        cell: ({ row }) => {
            return row.original?.bonus_program?.title || '-'
        },
        size: 80
    },
    {
        accessorKey: 'role',
        header: 'Роль',
        cell: ({ row }) => {
            const { className, displayName } = getRoleBadgeInfo(row.original.role)
            return (
                <div
                    className={cn(
                        'rounded-full border px-2 py-1 text-center text-sm text-background',
                        className
                    )}
                >
                    {displayName}
                </div>
            )
        },
        size: 120
    },
    {
        accessorKey: 'bonus_program',
        header: 'Менеджер',
        cell: ({ row }) => {
            return row.original?.service_manager?.id
                ? row.original?.service_manager?.first_name +
                      ' ' +
                      row.original?.service_manager?.last_name
                : '-'
        },
        size: 128
    },

    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row }) => {
            return (
                <div className='flex items-center justify-end gap-x-2'>
                    <EditUserModal user={row.original} />
                    <RemoveUserModal user={row.original} />
                </div>
            )
        },
        size: 100
    }
]
