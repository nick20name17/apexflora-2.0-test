import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useDebouncedCallback } from 'use-debounce'

import { AddProductModal } from '../modals/add-product'

import { getProducts } from '@/api/products/products'
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

interface ProductSelectProps extends React.HTMLAttributes<HTMLButtonElement> {
    product: string | null
    setProduct: (product: string | null) => void
    productName: string
}

export const ProductSelect = ({
    product,
    setProduct,
    className,
    productName
}: ProductSelectProps) => {
    const [open, setOpen] = useState(false)

    const [search, setSearch] = useState(productName)

    const handleSearch = useDebouncedCallback((search: string) => {
        setSearch(search)
    }, 250)

    const {
        data: products,
        isLoading,
        isFetching
    } = useQuery({
        queryKey: ['products', search, defaultComboboxLimit],
        queryFn: async () => {
            const res = await getProducts({
                limit: defaultComboboxLimit,
                search
            })
            return res
        }
    })

    const options = useMemo(() => {
        return products?.results?.map((product) => ({
            id: product.id.toString(),
            name: product?.ukr_name
        }))
    }, [products])

    return (
        <div className='flex items-center gap-x-2'>
            <Popover
                modal
                open={open}
                onOpenChange={setOpen}
            >
                <PopoverTrigger asChild>
                    <Button
                        className={cn('h-10 w-full justify-between truncate', className)}
                        variant='outline'
                        role='combobox'
                        aria-expanded={open}
                    >
                        <span className='truncate'>
                            {product
                                ? products?.results?.find((p) => p.id === +product)
                                      ?.ukr_name
                                : 'Оберіть продукт'}
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
                                placeholder='Введіть назву продукт'
                            />
                        </div>

                        {isFetching || isLoading ? (
                            <div className='py-6 text-center text-sm'>
                                Завантаження...
                            </div>
                        ) : options && options?.length > 0 ? (
                            <CommandList>
                                <CommandGroup>
                                    {options.map((option) => (
                                        <CommandItem
                                            key={option?.id}
                                            value={option?.id}
                                            onSelect={(selectedName) => {
                                                const selectedProduct = options.find(
                                                    (opt) => opt?.id === selectedName
                                                )

                                                setProduct(
                                                    selectedProduct &&
                                                        selectedProduct?.id === product
                                                        ? null
                                                        : selectedProduct?.id || null
                                                )

                                                setOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-2 size-4',
                                                    product === option?.id
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
                            <CommandEmpty>Продуктів не знайдено</CommandEmpty>
                        )}
                    </Command>
                </PopoverContent>
            </Popover>
            <AddProductModal size='icon' />
        </div>
    )
}
