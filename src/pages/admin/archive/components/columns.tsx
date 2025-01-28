import { type ColumnDef } from '@tanstack/react-table'

import { usersColumns } from '../../users/components/columns'

import { RestoreUserCell } from './restore-user'
import type { User } from '@/api/users/users.types'

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'is_deleted',
        header: '',
        cell: ({ row }) => (
            <RestoreUserCell
                key={row.original.id + String(row.original.is_deleted)}
                user={row.original}
            />
        ),
        id: 'is_deleted',
        size: 80
    },
    ...usersColumns
]
