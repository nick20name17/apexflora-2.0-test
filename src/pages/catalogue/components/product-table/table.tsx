import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table'

import type { ShopProduct } from '@/api/shop-products/shop-products.types'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { defaultLimit } from '@/constants/table'

interface DataTableProps {
    columns: ColumnDef<ShopProduct, ShopProduct>[]
    data: ShopProduct[]
    isLoading: boolean
}

export const ProductTable = ({ columns, data, isLoading }: DataTableProps) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <ScrollArea className='mt-3 pr-2.5'>
            <Table>
                <TableHeader className='sticky top-0 z-30 bg-secondary'>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        key={header.id}
                                        style={{
                                            maxWidth: header.getSize(),
                                            minWidth: header.getSize()
                                        }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableSkeleton columnsLength={columns.length} />
                    ) : table.getRowModel().rows?.length ? (
                        table.getRowModel()?.rows.map((row) => (
                            <TableRow
                                key={row.original.id}
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        style={{
                                            maxWidth: cell.column.getSize(),
                                            minWidth: cell.column.getSize()
                                        }}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns?.length}
                                className='h-24 text-center text-lg'
                            >
                                Товарів не знайдено
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <ScrollBar orientation='horizontal' />
        </ScrollArea>
    )
}

const TableSkeleton = ({ columnsLength }: { columnsLength: number }) => {
    return Array.from({ length: defaultLimit }).map((_, index) => (
        <TableRow key={index}>
            <TableCell
                className='p-0 pt-2'
                colSpan={columnsLength}
            >
                <Skeleton className='h-[72px] w-full' />
            </TableCell>
        </TableRow>
    ))
}
