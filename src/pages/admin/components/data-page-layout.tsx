import React from 'react'

import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

interface DataPageLayoutProps {
    title: string
    count?: number
    isLoading: boolean
    actionComponent?: React.ReactNode
    filterComponent?: React.ReactNode
    searchBar?: React.ReactNode
    children: React.ReactNode
}

export const DataPageLayout = ({
    title,
    count,
    isLoading,
    actionComponent,
    searchBar,
    filterComponent,
    children
}: DataPageLayoutProps) => {
    const { state } = useSidebar()

    return (
        <div
            className={cn(
                'flex flex-col gap-2 p-2 md:gap-4',
                state === 'collapsed'
                    ? 'w-[calc(100vw-32px)] xl:w-[calc(100vw-3rem-32px)]'
                    : 'xl:w-[calc(100vw-14rem-32px)]'
            )}
        >
            <div className='flex gap-4 max-sm:flex-col sm:items-center sm:justify-between'>
                <div className='flex items-center gap-2'>
                    <SidebarTrigger />
                    <h1 className='text-2xl font-semibold'>{title}</h1>
                    {!isLoading &&
                        (count !== undefined ? (
                            <span className='text-muted-foreground'>({count})</span>
                        ) : null)}
                </div>
                {actionComponent}
            </div>

            <div className='w-full'>{searchBar}</div>

            {filterComponent}

            {children}
        </div>
    )
}

export default DataPageLayout
