import { type ColumnDef } from '@tanstack/react-table'

import { useProductStatus } from '../context/product-status'

import { DiscountCell } from './cells//discount-cell'
import { OrderCell } from './cells//order-cell'
import { PriceCell } from './cells/price-cell'
import { QuantityCell } from './cells/quantity-cell'
import type { ShopProduct } from '@/api/shop-products/shop-products.types'
import { DiametrIcon, WeightIcon } from '@/components/icons'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import ImageWithSkeleton from '@/components/ui/image-with-skeleton'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'

export const columns: ColumnDef<ShopProduct>[] = [
    {
        accessorKey: 'image',
        header: '',
        cell: ({ row }) => (
            <HoverCard>
                <HoverCardTrigger asChild>
                    <div className='h-[32px] w-[46px]'>
                        <ImageWithSkeleton
                            src={row.original?.image}
                            alt={row.original?.product.ukr_name}
                            className='size-full object-cover'
                        />
                    </div>
                </HoverCardTrigger>
                <HoverCardContent
                    align='start'
                    side='right'
                    className='h-80 w-[460px] shadow-md'
                >
                    <ImageWithSkeleton
                        src={row.original?.image}
                        alt={row.original?.product.ukr_name}
                        className='size-full rounded-md object-cover'
                    />
                </HoverCardContent>
            </HoverCard>
        ),
        size: 56
    },
    {
        accessorFn: (row) => row.product?.ukr_name,
        header: 'Назва',
        cell: ({ row }) => (
            <div className='flex flex-col'>
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
        accessorFn: (row) => row.origin_id,
        header: 'Артикул',
        size: 70
    },
    {
        accessorKey: 'height',
        header: 'Висота',
        cell: ({ row }) => <>{row.original?.height}см</>,
        size: 60
    },
    {
        accessorKey: 'diameter',
        header: 'Ваг./діам.',
        cell: ({ row }) => (
            <div className='flex items-center gap-x-1'>
                <div className='flex items-center gap-x-0.5'>
                    <WeightIcon className='size-5' />
                    {row.original?.weight_size ?? '-'}
                </div>
                <div className='flex items-center gap-x-0.5'>
                    <DiametrIcon className='size-5' />
                    {row.original?.diameter ?? '-'}
                </div>
            </div>
        ),
        size: 110
    },
    {
        header: 'Ціна',
        accessorKey: 'price',
        cell: ({ row }) => <PriceCell stocks={row.original?.stocks} />,
        size: 65
    },
    {
        accessorKey: 'promotion',
        header: '',
        size: 20,
        cell: ({ row }) => {
            const { productStatus } = useProductStatus()
            const { currentStock } = useCatalogueOperations({
                stocks: row.original.stocks,
                initialCurrentStockId: productStatus
            })

            return currentStock?.promotion ? (
                <svg
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <g clip-path='url(#clip0_1471_56919)'>
                        <path
                            d='M8.73462 1.00012C8.92467 0.981907 9.01289 1.02964 9.16528 1.14074C9.19515 1.16237 9.19515 1.16237 9.22563 1.18443C9.2851 1.22785 9.34392 1.27202 9.40259 1.31652C9.43327 1.33963 9.46395 1.36275 9.49556 1.38656C9.73436 1.57251 9.95601 1.77703 10.176 1.98449C10.2174 2.02297 10.2174 2.02297 10.2595 2.06222C10.6316 2.4197 10.9328 2.84285 11.1956 3.28527C11.2077 3.30578 11.2199 3.32629 11.2325 3.34741C12.0209 4.69687 12.0417 6.17407 11.7455 7.66422C11.6591 8.12643 11.6292 8.58784 11.8774 9.00421C12.1119 9.34432 12.4071 9.63124 12.8152 9.73741C13.2903 9.81405 13.7127 9.74752 14.109 9.46398C14.3983 9.22613 14.5971 8.92797 14.676 8.55871C14.6807 8.5008 14.6838 8.44277 14.6859 8.38471C14.6872 8.35202 14.6885 8.31932 14.6899 8.28563C14.6924 8.21678 14.6949 8.14794 14.6973 8.07909C14.6986 8.04653 14.6999 8.01397 14.7013 7.98042C14.7024 7.95057 14.7034 7.92072 14.7045 7.88996C14.7112 7.82043 14.7112 7.82043 14.7463 7.78527C14.8425 7.76907 14.8425 7.76907 14.9573 7.78527C15.0315 7.85974 15.0839 7.92347 15.1418 8.00939C15.1584 8.03312 15.175 8.05684 15.192 8.08128C16.2618 9.64634 16.746 11.6971 16.4178 13.5723C16.1959 14.7476 15.6795 15.851 14.887 16.7501C14.857 16.7843 14.8271 16.8185 14.7963 16.8537C13.7295 18.0546 12.2372 18.8406 10.6331 19.0001C10.536 19.0056 10.439 19.0075 10.3418 19.0085C10.3147 19.0088 10.2876 19.0092 10.2597 19.0095C9.65713 19.0156 9.07619 19.0098 8.48852 18.8595C8.44364 18.8482 8.44364 18.8482 8.39785 18.8367C6.75535 18.4104 5.30631 17.3725 4.43196 15.9091C4.35084 15.7695 4.27409 15.6277 4.19946 15.4845C4.18836 15.4633 4.17727 15.442 4.16583 15.4202C3.34799 13.829 3.29904 11.8898 3.82834 10.2002C4.22796 8.99131 4.92643 7.95038 5.783 7.01664C5.8446 6.94939 5.90443 6.88105 5.96386 6.81188C6.10519 6.64957 6.25291 6.49326 6.4 6.33619C6.59383 6.1292 6.78571 5.92057 6.9768 5.71105C7.00341 5.68237 7.03001 5.65368 7.05742 5.62412C8.00345 4.59437 8.78424 3.37342 8.77582 1.92997C8.76564 1.72582 8.74373 1.52264 8.72139 1.31949C8.7181 1.28838 8.7148 1.25726 8.71141 1.2252C8.70828 1.1971 8.70515 1.169 8.70192 1.14005C8.69946 1.07043 8.69946 1.07043 8.73462 1.00012ZM9.00881 9.94751C8.97057 9.98708 8.97057 9.98708 8.93155 10.0274C8.90309 10.0564 8.87463 10.0854 8.8453 10.1153C8.80139 10.1616 8.80139 10.1616 8.75659 10.2089C8.72759 10.2385 8.69858 10.2682 8.6687 10.2987C7.55066 11.4496 6.74011 12.7606 6.75344 14.409C6.77375 15.1841 7.05351 15.925 7.57446 16.504C7.59709 16.5292 7.59709 16.5292 7.62017 16.555C8.18061 17.1706 8.94464 17.5639 9.78299 17.6073C10.7071 17.6344 11.5154 17.3726 12.1998 16.7287C12.2281 16.701 12.2563 16.6732 12.2854 16.6446C12.3147 16.6162 12.344 16.5877 12.3742 16.5584C12.9639 15.9515 13.2542 15.1182 13.2471 14.2797C13.2363 13.9111 13.1982 13.4404 12.9885 13.129C12.9273 13.0868 12.9273 13.0868 12.8479 13.0939C12.7722 13.1395 12.7064 13.1852 12.637 13.2389C12.1223 13.6137 11.5737 13.7058 10.9495 13.6212C10.4051 13.5089 9.96832 13.2297 9.65967 12.7687C9.26522 12.1128 9.24613 11.4449 9.25537 10.701C9.2559 10.6259 9.25638 10.5507 9.25681 10.4755C9.25796 10.2936 9.25977 10.1117 9.26196 9.9298C9.15081 9.89303 9.10803 9.87972 9.00881 9.94751Z'
                            fill='#FD7301'
                        />
                    </g>
                    <defs>
                        <clipPath id='clip0_1471_56919'>
                            <rect
                                width='18'
                                height='18'
                                fill='white'
                                transform='translate(1 1)'
                            />
                        </clipPath>
                    </defs>
                </svg>
            ) : null
        }
    },
    {
        accessorKey: 'discounts',
        header: '',
        size: 60,
        cell: ({ row }) => <DiscountCell stocks={row.original?.stocks} />
    },
    {
        header: 'Кількість',
        accessorKey: 'quantity',
        cell: ({ row }) => <QuantityCell stocks={row.original?.stocks} />,
        size: 165
    },
    {
        header: 'Замовлення',
        accessorKey: 'order',
        cell: ({ row }) => <OrderCell stocks={row.original?.stocks} />,
        size: 105
    }
]
