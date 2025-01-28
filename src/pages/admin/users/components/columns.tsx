import { type ColumnDef } from '@tanstack/react-table'

import { EditUserModal, RemoveUserModal } from './modals'
import type { User } from '@/api/users/users.types'
import { getRoleBadgeInfo } from '@/constants/user'
import { cn } from '@/lib/utils'

export const usersColumns: ColumnDef<User>[] = [
    {
        accessorKey: 'first_name',
        header: () => <div className='w-40'>Імя та прізвище</div>,
        cell: ({ row }) => {
            return (
                <div className='w-40'>
                    {row.original.first_name + ' ' + row.original.last_name}
                </div>
            )
        }
    },
    {
        accessorKey: 'email',
        header: () => <div className='w-60'>Пошта</div>,
        cell: ({ row }) => {
            return <div className='w-60'>{row.original.email}</div>
        }
    },
    {
        accessorKey: 'phone_number',
        header: () => <div className='w-48'>Номер телефон</div>,
        cell: ({ row }) => {
            return <div className='w-48'>{row.original.phone_number}</div>
        }
    },
    {
        accessorKey: 'company',
        header: () => <div className='w-24'>Компанія</div>,
        cell: ({ row }) => {
            return <div className='w-24'>{row.original.company || '-'}</div>
        }
    },
    {
        accessorKey: 'city',
        header: () => <div className='w-36'>Місто</div>,
        cell: ({ row }) => {
            return <div className='w-36'>{row.original.city || '-'}</div>
        }
    },
    {
        accessorKey: 'city',
        header: () => <div className='w-14'>Код 1C</div>,
        cell: ({ row }) => {
            return <div className='w-14'>{row.original.code_1c || '-'}</div>
        }
    },
    {
        accessorKey: 'bonus_program',
        header: () => <div className='w-20'>Бонус</div>,
        cell: ({ row }) => {
            return <div className='w-20'>{row.original?.bonus_program?.title || '-'}</div>
        }
    },
    {
        accessorKey: 'role',
        header: () => <div className='w-24'>Роль</div>,
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
        }
    },
    {
        accessorKey: 'bonus_program',
        header: () => <div className='w-32'>Менеджер</div>,
        cell: ({ row }) => {
            return (
                <div className='w-32'>
                    {row.original?.service_manager?.id
                        ? row.original?.service_manager?.first_name +
                          ' ' +
                          row.original?.service_manager?.last_name
                        : '-'}
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
                    <EditUserModal user={row.original} />
                    <RemoveUserModal user={row.original} />
                </div>
            )
        },
        size: 100
    }
]
