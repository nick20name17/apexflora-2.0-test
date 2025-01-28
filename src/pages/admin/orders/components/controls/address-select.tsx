import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useDebouncedCallback } from 'use-debounce'

import { getDeliverAddress } from '@/api/deliver-address/deliver-address'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { defaultComboboxLimit } from '@/constants/table'
import { cn } from '@/lib/utils'

interface AddressSelectProps extends React.HTMLAttributes<HTMLButtonElement> {
    address: string | null
    cityName: string
    setAddress: (address: string | null) => void
    disabled?: boolean
    // recepientId: number | undefined
}

export const AddressSelect = ({
    address,
    setAddress,
    className,
    disabled = false,
    cityName
    // recepientId
}: AddressSelectProps) => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState(cityName)

    const handleSearch = useDebouncedCallback((search: string) => {
        setSearch(search)
    }, 250)

    const { data, isLoading, isFetching } = useQuery({
        queryFn: () =>
            getDeliverAddress({
                limit: defaultComboboxLimit,
                search
            }),
        queryKey: ['deliver-address', search]
    })

    const addresss = data?.results || []

    const options = useMemo(() => {
        return [{ id: 'self-pick', name: 'Самовивіз' }].concat(
            addresss.map((address) => ({
                id: address.id.toString(),
                name: address?.city + ', ' + address?.street
            }))
        )
    }, [addresss])

    const currentAddress = addresss.find((addr) => addr.id === +address!)

    if (isLoading) {
        return <Skeleton className='h-10 w-full' />
    }

    return (
        <div className='flex w-full items-center gap-x-2'>
            <Popover
                modal
                open={open}
                onOpenChange={setOpen}
            >
                <PopoverTrigger asChild>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                        disabled={disabled || isLoading || isFetching}
                        className={cn('h-10 w-full justify-between', className)}
                        variant='outline'
                        size='sm'
                        role='combobox'
                        aria-expanded={open}
                    >
                        <span className='max-w-48 truncate'>
                            {address === 'self-pick'
                                ? 'Самовивіз'
                                : address
                                  ? currentAddress?.city + ', ' + currentAddress?.street
                                  : 'Оберіть адресу'}
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
                                placeholder='Введіть назву адресу'
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
                                                const selectedAddress = options.find(
                                                    (opt) => opt?.id === selectedName
                                                )

                                                setAddress(
                                                    selectedAddress &&
                                                        selectedAddress?.id === address
                                                        ? null
                                                        : selectedAddress?.id || null
                                                )

                                                setOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-2 size-4',
                                                    address === option?.id
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
                            <CommandEmpty>Адрес не знайдено</CommandEmpty>
                        )}
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
