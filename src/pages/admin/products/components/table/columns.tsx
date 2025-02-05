import { type ColumnDef } from '@tanstack/react-table'

import { EditShopProductModal } from '../modals/modals'
import { RemoveStockModal } from '../modals/remove-stock'

import type { ShopProduct } from '@/api/shop-products/shop-products.types'
import { WeighDiameterInfo } from '@/components/product-info'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'
import { DiscountCell } from '@/pages/catalogue/components/product-table/cell/discount-cell'
import { HeightCell } from './height-cell'
import { ImageCell } from './image-cell'
import { OriginIdCell } from './origin-id-cell'
import { PriceCell } from './price-cell'
import { PromoCell } from './promo-cell'
import { QuantityCell } from './quantity-cell'
import { StatusCell } from './status-cell'

export const columns: ColumnDef<ShopProduct>[] = [
    {
        accessorKey: 'image',
        header: '',
        cell: ({ row }) => <ImageCell shopProduct={row?.original} />,
        size: 56
    },
    {
        accessorFn: (row) => row.product?.ukr_name,
        header: 'Назва',
        cell: ({ row }) => (
            <div className='flex flex-col truncate'>
                <span className='truncate text-foreground'>
                    {row.original?.product?.ukr_name}
                </span>
                <div className='flex items-center gap-x-1'>
                    <img
                        src={row.original?.producer?.country?.flag}
                        alt={row.original?.producer?.name}
                        className='size-4'
                    />
                    <span className='truncate text-xs'>
                        {row.original?.producer?.name}
                    </span>
                </div>
            </div>
        ),
        size: 180
    },
    {
        accessorKey: 'origin_id',
        header: 'Артикул',
        cell: ({ row }) => <OriginIdCell shopProduct={row.original} />,
        size: 76
    },
    {
        accessorKey: 'color',
        header: 'Колір',
        cell: ({ row }) => (
            <div className='truncate'>
                {row.original.colors.map((color) => color.name).join(', ')}
            </div>
        ),
        size: 72
    },
    {
        accessorKey: 'height',
        header: 'Висота',
        cell: ({ row }) => <HeightCell shopProduct={row.original} />,
        size: 82
    },
    {
        accessorKey: 'diameter',
        header: 'Ваг./діам.',
        cell: ({ row }) => (
            <WeighDiameterInfo weight={row.original?.weight_size} diameter={row.original?.diameter} />
        ),
        size: 100
    },
    {
        header: 'Ціна',
        accessorKey: 'price',
        cell: ({ row }) => <PriceCell stocks={row.original?.stocks} />,
        size: 70
    },
    {
        accessorKey: 'discounts',
        header: '',
        size: 60,
        cell: ({ row }) => <DiscountCell stocks={row.original?.stocks} />
    },
    {
        accessorKey: 'promo',
        header: 'Промо',
        size: 70,
        cell: ({ row }) => <PromoCell stocks={row.original?.stocks} />
    },
    {
        accessorKey: 'is_visible',
        header: 'Видимість',
        size: 92,
        cell: ({ row }) => <StatusCell stocks={row.original?.stocks} />
    },
    {
        accessorKey: 'quantity',
        header: 'Кількість',
        size: 92,
        cell: ({ row }) => <QuantityCell stocks={row.original?.stocks} />
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row }) => {
            const { currentStock } = useCatalogueOperations({
                stocks: row.original?.stocks
            })
            return (
                <div className='flex items-center justify-end gap-x-2'>
                    <EditShopProductModal shopProduct={row.original} />
                    <RemoveStockModal stock={currentStock!} />
                </div>
            )
        }
    }
]
