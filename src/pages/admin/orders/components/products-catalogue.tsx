import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useDebouncedCallback } from 'use-debounce'

import { ColorsSelect } from '../../products/components/controls/colors-select'
import { ProducerSelect } from '../../products/components/controls/producer-select'
import { useProductStatus } from '../context/product-status'

import { AdminCatagloue } from './admin-catalogue'
import { AdminStatusTabs } from './controls/admin-status-tabs'
import { CategoryFilter } from './filters/category-filter'
import { AdminOrderingFilter } from './filters/ordering-filter'
import { AdminPromoFilter } from './filters/promo-filters'
import type { OrderItem } from '@/api/order-items/order-items.types'
import { getShopProducts } from '@/api/shop-products/shop-products'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { defaultLimit } from '@/constants/table'
import { OrdersPagination } from '@/pages/profile/orders/components/orders-pagination'

export const ProductsCatalogue = () => {
    const { productStatus, setProductStatus } = useProductStatus()

    const form = useFormContext()

    const orderItems = form.watch('order_items') as OrderItem[]

    const [open, setOpen] = useState(false)

    const [promo, setPromo] = useState(false)

    const [categories, setCategories] = useState('')
    const [producer, setProducer] = useState<string | null>(null)

    const [colors, setColors] = useState<string[]>([])

    const [offset, setOffset] = useState(0)

    const [limit, setLimit] = useState(defaultLimit)
    const [search, setSearch] = useState('')
    const [ordering, setOrdering] = useState('name')

    const { data: shopProducts, isLoading } = useQuery({
        queryKey: [
            'shop-products',
            search,
            productStatus,
            offset,
            promo,
            ordering,
            categories,
            producer,
            colors,
            limit
        ],
        queryFn: () =>
            getShopProducts({
                search,
                statuses: productStatus,
                promotion: promo,
                ordering: ordering,
                categories,
                limit,
                producer: producer,
                colors: colors.join(',')
            })
    })
    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    className='h-10 w-full justify-between'
                    size='sm'
                    variant='secondary'
                >
                    Каталог <Badge>{orderItems?.length}</Badge>
                </Button>
            </DialogTrigger>
            <DialogContent className='max-h-[96vh] max-w-[96%] overflow-y-auto'>
                <DialogHeader className='flex flex-row items-center justify-between gap-4 pt-2'>
                    <DialogTitle className='flex items-center gap-x-2'>
                        <h1 className='text-2xl xl:text-4xl'>Квіти</h1>
                        <div className='flex items-center gap-x-1 text-sm leading-none text-muted-foreground'>
                            {isLoading ? (
                                <Loader2 className='size-3 animate-spin' />
                            ) : (
                                shopProducts?.count
                            )}
                            <span>товари</span>
                        </div>
                    </DialogTitle>
                    <Button
                        variant='accent'
                        onClick={() => setOpen(false)}
                        size='sm'
                    >
                        Зберегти
                    </Button>
                </DialogHeader>
                <div className='grid gap-2 md:grid-cols-3 lg:grid-cols-5'>
                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                        setOffset={setOffset}
                    />
                    <CategoryFilter
                        categories={categories}
                        setCategories={setCategories}
                    />
                    <AdminOrderingFilter
                        className='h-10 w-full'
                        setOrdering={setOrdering}
                        ordering={ordering}
                    />
                    <ColorsSelect
                        setColors={setColors}
                        colors={colors}
                        setOffset={setOffset}
                        withAdd={false}
                    />
                    <ProducerSelect
                        producerName=''
                        producer={producer}
                        setProducer={setProducer}
                        setOffset={setOffset}
                        withAdd={false}
                    />
                    <AdminPromoFilter
                        className='lg:hidden'
                        promo={promo}
                        setPromo={setPromo}
                    />
                </div>
                <div className='flex items-center gap-x-2'>
                    <AdminStatusTabs
                        className='w-full'
                        setOffset={setOffset}
                        status={productStatus}
                        setStatus={setProductStatus}
                    />
                    <AdminPromoFilter
                        className='max-lg:hidden'
                        promo={promo}
                        setPromo={setPromo}
                    />
                </div>
                <ScrollArea className='h-[calc(100vh-265px)]'>
                    <>
                        <AdminCatagloue
                            isLoading={isLoading}
                            shopProducts={shopProducts}
                        />
                        <OrdersPagination
                            count={shopProducts?.count ?? 0}
                            isLoading={isLoading}
                            limit={limit}
                            offset={offset}
                            setOffset={setOffset}
                            setLimit={setLimit}
                        />
                    </>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

interface SearchBarProps {
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
    setOffset: React.Dispatch<React.SetStateAction<number>>
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch, setOffset }) => {
    const debouncedSetSearch = useDebouncedCallback((searchTerm: string) => {
        setSearch(searchTerm)
    }, 300)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value
        debouncedSetSearch(searchTerm)
        setOffset(0)
    }

    return (
        <Input
            className='h-10'
            defaultValue={search || ''}
            onChange={handleSearch}
            placeholder='Пошук товару'
        />
    )
}
