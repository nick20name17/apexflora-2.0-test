import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'sonner'

import { addShopProductImage } from '@/api/shop-products/shop-products'
import type { ShopProduct } from '@/api/shop-products/shop-products.types'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {
    FilePicker,
    type UploadedFile,
    type UploadedUrl
} from '@/components/ui/file-picker'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import ImageWithSkeleton from '@/components/ui/image-with-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

interface ImageCellProps {
    shopProduct: ShopProduct
}

export const ImageCell = ({ shopProduct }: ImageCellProps) => {
    const [image, setImage] = useState<(UploadedFile | UploadedUrl)[]>([
        {
            url: shopProduct?.image
        }
    ])

    const queryClient = useQueryClient()

    const [open, setOpen] = useState(false)

    const patchShopProductMutation = useMutation({
        mutationFn: () => {
            return addShopProductImage(shopProduct.id, {
                payload: {
                    image: image[0] as any
                }
            })
        },
        onSuccess: () => {
            setOpen(false)
            toast.success(
                `Зображення продукту ${shopProduct?.product?.ukr_name} успішно відредаговано`
            )
            queryClient.invalidateQueries('shop-products')
        }
    })

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <div className='h-[32px] w-[46px]'>
                            {patchShopProductMutation?.isLoading ||
                            !shopProduct?.image ? (
                                <Skeleton className='size-full' />
                            ) : (
                                <ImageWithSkeleton
                                    src={shopProduct?.image}
                                    alt={shopProduct?.product.ukr_name}
                                    className='size-full object-cover'
                                />
                            )}
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent
                        align='start'
                        side='right'
                        className='h-80 w-[460px] shadow-md'
                    >
                        <ImageWithSkeleton
                            src={shopProduct?.image}
                            alt={shopProduct?.product.ukr_name}
                            className='size-full rounded-md object-cover'
                        />
                    </HoverCardContent>
                </HoverCard>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Зображення</DialogTitle>
                </DialogHeader>
                <FilePicker
                    value={image}
                    multiple={false}
                    onChange={setImage}
                />
                <div className='flex items-center justify-end gap-x-4'>
                    <Button
                        onClick={() => setOpen(false)}
                        size='sm'
                        variant='secondary'
                    >
                        Відмінити
                    </Button>
                    <Button
                        disabled={!image[0]}
                        size='sm'
                        onClick={() => patchShopProductMutation.mutate()}
                    >
                        Зберегти
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
