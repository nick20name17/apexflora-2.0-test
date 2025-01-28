import { type ColumnDef } from '@tanstack/react-table'

import { EditCategoryModal, RemoveCategoryModal } from './modals'
import type { Category } from '@/api/categories/categories.types'

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: 'name',
        header: 'Назва',
        size: 160
    },

    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row }) => {
            return (
                <div className='flex items-center justify-end gap-x-2'>
                    <EditCategoryModal category={row.original} />
                    <RemoveCategoryModal category={row.original} />
                </div>
            )
        }
    }
]
