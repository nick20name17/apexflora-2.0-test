import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import { defaultLimit } from '@/constants/table'

interface TableSkeletonProps {
    columnsCount: number
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
    columnsCount: cellCount
}) => {
    return Array.from({ length: defaultLimit }).map((_, index) => (
        <TableRow
            className='p-0'
            key={index}
        >
            <TableCell
                colSpan={cellCount}
                className='h-14 px-1 py-1.5'
            >
                <Skeleton className='h-14 w-full' />
            </TableCell>
        </TableRow>
    ))
}
