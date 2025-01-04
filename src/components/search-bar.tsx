import { Search, X } from 'lucide-react'
import { useQueryState } from 'nuqs'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

export const SearchBar = ({ className }: { className?: string }) => {
    const [search, setSearch] = useQueryState('search', {
        defaultValue: ''
    })

    const [, setOffset] = useQueryState('offset', { defaultValue: 0, parse: Number })

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOffset(0)
        setSearch(e.target.value)
    }

    return (
        <div className={cn('relative overflow-hidden', className)}>
            <Search className='absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
            <Input
                className='bg-background pl-9 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0'
                placeholder='Пошук'
                value={search}
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
