import { LayoutGrid, StretchHorizontal } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useLayoutEffect } from 'react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

export type View = 'tiles' | 'lines'

interface ViewFilterProps {
    className?: string
}

export const ViewFilter = ({ className }: ViewFilterProps) => {
    const [view, setView] = useQueryState('view', {
        defaultValue: 'lines'
    })

    const isLg = useMediaQuery('(max-width: 1280px)')

    useLayoutEffect(() => {
        if (isLg) {
            setView('tiles')
        }
    }, [isLg])

    return (
        <Tabs
            className={cn(className)}
            value={view}
            onValueChange={setView}
        >
            <TabsList className='w-[86px] rounded-full bg-secondary'>
                <TabsTrigger
                    className='size-9 rounded-full text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='tiles'
                >
                    <LayoutGrid className='size-4' />
                </TabsTrigger>
                <TabsTrigger
                    className='size-9 rounded-full text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='lines'
                >
                    <StretchHorizontal className='size-4' />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
