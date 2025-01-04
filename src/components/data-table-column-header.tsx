import { type Column } from '@tanstack/react-table'
import { ArrowDown, ArrowUp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}

export const DataTableColumnHeader = <TData, TValue>({
    column,
    title,
    className
}: DataTableColumnHeaderProps<TData, TValue>) => {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>
    }

    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <Button
                variant='ghost'
                size='sm'
                className='-ml-3 h-8 text-xs font-normal data-[state=open]:bg-accent'
            >
                {column.getIsSorted() === 'desc' ? (
                    <ArrowDown />
                ) : column.getIsSorted() === 'asc' ? (
                    <ArrowUp />
                ) : (
                    <svg
                        width='14'
                        height='14'
                        viewBox='0 0 14 14'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M7.00016 2.33325L9.52607 5.39575H4.47426L7.00016 2.33325Z'
                            fill='#0E0E66'
                        />
                        <path
                            d='M7.00033 11.6666L4.47442 8.60413L9.52623 8.60413L7.00033 11.6666Z'
                            fill='#0E0E66'
                        />
                    </svg>
                )}
                <span>{title}</span>
            </Button>
        </div>
    )
}
