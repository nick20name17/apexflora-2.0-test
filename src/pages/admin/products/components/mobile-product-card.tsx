import type { ShopProduct } from "@/api/shop-products/shop-products.types"
import { HeightInfo, WeighDiameterInfo } from "@/components/product-info"
import ImageWithSkeleton from "@/components/ui/image-with-skeleton"
import { EditShopProductModal } from "./modals/modals"
import { PriceCell } from "./table/price-cell"
import { PromoCell } from "./table/promo-cell"
import { StatusCell } from "./table/status-cell"

interface MobileProductCardProps {
    shopProduct: ShopProduct
}
export const MobileProductCard = ({ shopProduct }: MobileProductCardProps) => {
    return (
        <div className="border rounded-xs ">
            <div className="flex items-center justify-between gap-x-2 border-b p-2.5 pb-1.5">
                <div className="flex items-center gap-x-2">
                    <div className="h-[46px] w-[66px]">
                        <ImageWithSkeleton alt={shopProduct.product.ukr_name} src={shopProduct.image} className="h-full w-full object-cover rounded-[2px]" />
                    </div>
                    <div className='flex flex-col truncate max-w-32'>
                        <span className='truncate text-foreground'>
                            {shopProduct?.product?.ukr_name}
                        </span>
                        <div className='flex items-center gap-x-1'>
                            <img
                                src={shopProduct?.producer?.country?.flag}
                                alt={shopProduct?.producer?.name}
                                className='size-4'
                            />
                            <span className='truncate text-xs'>
                                {shopProduct?.producer?.name}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex itemc-center gap-x-2">
                    <PriceCell className="w-15" stocks={shopProduct?.stocks} />
                    <EditShopProductModal shopProduct={shopProduct} />
                </div>
            </div>
            <div className="flex items-center gap-x-2 p-2.5 justify-between border-b">
                <div className="flex items-center gap-x-1">
                    <span className="text-xs text-muted-foreground">Статус</span>
                    <StatusCell stocks={shopProduct?.stocks} />
                </div>
                <div className="flex items-center gap-x-1">
                    <span className="text-xs text-muted-foreground">Промоціна</span>
                    <PromoCell stocks={shopProduct?.stocks} />
                </div>


            </div>
            <div className="flex items-center gap-x-2 p-2.5 justify-between">
                <div className='flex flex-col items-start gap-y-0.5'>
                    <span className='text-xs text-muted-foreground'>Артикул</span>
                    <span className="text-sm">{shopProduct?.origin_id}</span>
                </div>
                <div className='flex flex-col items-start gap-y-0.5'>
                    <span className='text-xs text-muted-foreground'>Висота</span>
                    <HeightInfo height={shopProduct?.height} />
                </div>
                <div className='flex flex-col items-start gap-y-0.5'>
                    <span className='text-xs text-muted-foreground'>Ваг./діам.</span>
                    <WeighDiameterInfo weight={shopProduct?.weight_size} diameter={shopProduct?.diameter} />
                </div>
            </div>
        </div>
    )
}
