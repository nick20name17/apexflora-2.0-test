import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table'

import { TableSkeleton } from '@/components/table-skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { TablePagination } from '@/pages/catalogue/components/product-table/table-pagination'

interface DataTableProps<TData extends { id: number }, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    dataCount?: number
    isLoading: boolean
}

export const DataTable = <TData, TValue>({
    columns,
    data,
    dataCount,
    isLoading
}: DataTableProps<TData & { id: number }, TValue>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <>
            <div className='rounded-md border'>
                <Table containerClassname='h-[calc(100vh-215px)] overflow-y-auto'>
                    <TableHeader className='sticky top-0 z-40 bg-secondary'>
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
                            <TableSkeleton columnsCount={columns.length} />
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    className='relative'
                                    key={
                                        // @ts-ignore
                                        row.original.stocks
                                            ? // @ts-ignore
                                            row.original.stocks[0].id
                                            : row.original?.id
                                    }
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
                                    colSpan={columns.length}
                                    className='h-24 text-center'
                                >
                                    Нічого не знайдено
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {dataCount ? (
                <TablePagination
                    className='border-none pt-0'
                    count={dataCount ?? 0}
                    isLoading={isLoading}
                />
            ) : null}
        </>
    )
}
