import { SearchNormal1 } from 'iconsax-react'
import { X } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useDebouncedCallback } from 'use-debounce'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

export const SearchBar = ({ className }: { className?: string }) => {
    const [search, setSearch] = useQueryState('search', {
        defaultValue: ''
    })

    const [, setOffset] = useQueryState('offset', { defaultValue: 0, parse: Number })

    const handleSearchChange = useDebouncedCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setOffset(0)
            setSearch(e.target.value)
        },
        250
    )

    return (
        <div className={cn('relative h-10 overflow-hidden', className)}>
            <SearchNormal1 className='absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
            <Input
                className='h-full bg-background pl-9 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0'
                placeholder='Пошук'
                defaultValue={search}
                onChange={handleSearchChange}
            />

            <Button
                tabIndex={-1}
                onClick={() => setSearch('')}
                className={cn(
                    'absolute top-1/2 size-8 -translate-y-1/2 transition-all',
                    search.length > 0 ? 'right-3.5' : '-right-10'
                )}
                variant='secondary'
            >
                <X className='size-4 flex-shrink-0' />
            </Button>
        </div>
    )
}
