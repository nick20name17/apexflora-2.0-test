import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    Pagination as PaginationWrapper
} from '@/components/ui/pagination'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { defaultLimit, limitOptions } from '@/constants/table'
import { cn } from '@/lib/utils'

interface TablePaginationProps {
    count: number
    className?: string
    isLoading: boolean
}

// TODO: Fix responsivness  with go to last page and go to first page buttons
export const TablePagination = ({
    count,
    className,
    isLoading
}: TablePaginationProps) => {
    const [limit, setLimit] = useQueryState('limit', {
        defaultValue: defaultLimit,
        parse: Number
    })

    const [offset, setOffset] = useQueryState('offset', {
        defaultValue: 0,
        parse: Number
    })

    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 0
    )

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const totalPages = Math.ceil(count / limit) || 1
    const currentPage = Math.floor(offset / limit) + 1

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setOffset(currentPage * limit)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setOffset((currentPage - 2) * limit)
        }
    }

    const handleGoToPage = (page: number) => {
        setOffset((page - 1) * limit)
    }

    const renderPageNumbers = () => {
        const pageNumbers: (number | string)[] = []
        const maxVisiblePages = windowWidth < 640 ? 3 : 5 // Adjust based on screen size
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        if (startPage > 1) {
            pageNumbers.push(1)
            if (startPage > 2) pageNumbers.push('...')
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i)
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pageNumbers.push('...')
            pageNumbers.push(totalPages)
        }

        // If there are too many pages, simplify the display
        if (totalPages > 1000) {
            return [1, '...', currentPage, '...', totalPages]
        }

        return pageNumbers
    }

    return (
        <div
            className={cn(
                'flex items-center justify-between gap-2.5 border-t py-2.5 max-sm:flex-col max-sm:justify-center',
                className
            )}
        >
            <div className='flex w-full items-center space-x-2'>
                <p className='text-sm'>На сторінці:</p>
                <Select
                    value={limit.toString()}
                    onValueChange={(value) => {
                        setOffset(0)
                        setLimit(+value)
                    }}
                >
                    <SelectTrigger className='h-9 w-[75px]'>
                        <SelectValue placeholder={defaultLimit.toString()} />
                    </SelectTrigger>
                    <SelectContent side='top'>
                        {limitOptions.map((pageSize) => (
                            <SelectItem
                                key={pageSize}
                                value={`${pageSize}`}
                            >
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {isLoading ? (
                <Skeleton className='h-9 w-1/2' />
            ) : (
                <PaginationWrapper className='justify-center overflow-x-auto sm:justify-end'>
                    <PaginationContent>
                        {/* <PaginationItem>
                            <Button
                                className='size-8 md:size-9'
                                variant='ghost'
                                size='icon'
                                onClick={handleGoToPage.bind(null, 1)}
                                disabled={currentPage === 1}
                            >
                                <ChevronsLeft className='h-4 w-4' />
                                <span className='sr-only'>Go to first page</span>
                            </Button>
                        </PaginationItem> */}
                        <PaginationItem>
                            <Button
                                className='size-8 md:size-9'
                                variant='ghost'
                                size='icon'
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className='h-4 w-4' />
                                <span className='sr-only'>Go to previous page</span>
                            </Button>
                        </PaginationItem>

                        {renderPageNumbers().map((page, index) => (
                            <PaginationItem key={index}>
                                {typeof page === 'number' ? (
                                    <Button
                                        className='size-8 md:size-9'
                                        variant={
                                            currentPage === page ? 'default' : 'ghost'
                                        }
                                        size='icon'
                                        onClick={() => handleGoToPage(page)}
                                    >
                                        {page}
                                    </Button>
                                ) : (
                                    <PaginationEllipsis />
                                )}
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <Button
                                className='size-8 md:size-9'
                                variant='ghost'
                                size='icon'
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className='h-4 w-4' />
                                <span className='sr-only'>Go to next page</span>
                            </Button>
                        </PaginationItem>
                        {/* <PaginationItem>
                            <Button
                                className='size-8 md:size-9'
                                variant='ghost'
                                size='icon'
                                onClick={handleGoToPage.bind(null, totalPages)}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronsRight className='h-4 w-4' />
                                <span className='sr-only'>Go to last page</span>
                            </Button>
                        </PaginationItem> */}
                    </PaginationContent>
                </PaginationWrapper>
            )}
        </div>
    )
}
