import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useDebouncedCallback } from 'use-debounce'

import { AddProducerModal } from '../../../producers/modals'

import { getProducers } from '@/api/producers/producers'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { defaultComboboxLimit } from '@/constants/table'
import { cn } from '@/lib/utils'

interface ProducerSelectProps extends React.HTMLAttributes<HTMLButtonElement> {
    producer: string | null
    setProducer: (producer: string | null) => void
    producerName: string
    setOffset?: React.Dispatch<React.SetStateAction<number>>
    withAdd?: boolean
}

export const ProducerSelect = ({
    producer,
    setProducer,
    className,
    producerName,
    setOffset,
    withAdd = true
}: ProducerSelectProps) => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState(producerName ?? '')

    const handleSearch = useDebouncedCallback((search: string) => {
        setSearch(search)
    }, 250)

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['producers', search, defaultComboboxLimit],
        queryFn: async () => {
            const res = await getProducers({ limit: defaultComboboxLimit, search })
            return res
        },
        keepPreviousData: true
    })

    const producers = data?.results || []

    const options = useMemo(() => {
        return producers.map((producer) => ({
            id: producer.id.toString(),
            name: producer?.name
        }))
    }, [producers])

    return (
        <div className='flex items-center gap-x-2'>
            <Popover
                modal
                open={open}
                onOpenChange={setOpen}
            >
                <PopoverTrigger asChild>
                    <Button
                        className={cn(
                            'h-10 w-full justify-between truncate border-border',
                            className
                        )}
                        variant='outline'
                        role='combobox'
                        aria-expanded={open}
                    >
                        <span className='truncate'>
                            {producer
                                ? producers?.find((p) => p.id === +producer)?.name
                                : 'Оберіть виробника'}
                        </span>
                        <ChevronsUpDown className='ml-2 size-4 shrink-0 opacity-50' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-96 p-0'>
                    <Command>
                        <div
                            className='flex items-center border-b px-3'
                            cmdk-input-wrapper=''
                        >
                            <Search className='mr-2 size-4 shrink-0 opacity-50' />
                            <input
                                defaultValue={search}
                                className='flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
                                onChange={(e) => handleSearch(e.currentTarget.value)}
                                placeholder='Введіть назву виробника'
                            />
                        </div>

                        {isFetching || isLoading ? (
                            <div className='py-6 text-center text-sm'>
                                Завантаження...
                            </div>
                        ) : options.length > 0 ? (
                            <CommandList>
                                <CommandGroup>
                                    {options.map((option) => (
                                        <CommandItem
                                            key={option?.id}
                                            value={option?.id}
                                            onSelect={(selectedName) => {
                                                const selectedProducer = options.find(
                                                    (opt) => opt?.id === selectedName
                                                )

                                                setOffset?.(0)

                                                setProducer(
                                                    selectedProducer &&
                                                        selectedProducer?.id === producer
                                                        ? null
                                                        : selectedProducer?.id || null
                                                )

                                                setOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-2 size-4',
                                                    producer === option?.id
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                )}
                                            />
                                            {option?.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        ) : (
                            <CommandEmpty>Виробників не знайдено</CommandEmpty>
                        )}
                    </Command>
                </PopoverContent>
            </Popover>
            {withAdd ? <AddProducerModal size='icon' /> : null}
        </div>
    )
}
