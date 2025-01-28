import { Separator } from '@radix-ui/react-separator'
import type { UseFormReturn } from 'react-hook-form'
import { useMutation } from 'react-query'
import { z } from 'zod'

import { CategorySelect } from '../controls/category-select'
import { ColorsSelect } from '../controls/colors-select'
import { DiscountsSelect } from '../controls/discount-select'
import { ProducerSelect } from '../controls/producer-select'
import { ProductSelect } from '../controls/product-select'

import { addProductSchema } from './add-product'
import { patchProduct } from '@/api/products/products'
import type { ProductPayload } from '@/api/products/products.types'
import {
    addShopProduct,
    addShopProductImage,
    patchShopProducts
} from '@/api/shop-products/shop-products'
import type { ShopProduct } from '@/api/shop-products/shop-products.types'
import { patchStock } from '@/api/stock/stock'
import type { StocksPayload } from '@/api/stock/stock.types'
import { FilePicker } from '@/components/ui/file-picker'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCatalogueOperations } from '@/hooks/use-catalogue-operations'
import { CreateModal, EditModal } from '@/pages/admin/components/base-modal'

const addShopProductSchema = z.object({
    height: z
        .string({
            required_error: "Це поле є обов'яковим"
        })
        .min(1, "Це поле є обов'яковим"),
    origin_id: z
        .string({
            required_error: "Це поле є обов'яковим"
        })
        .min(1, "Це поле є обов'яковим"),
    stage: z
        .string({
            required_error: "Це поле є обов'яковим"
        })
        .min(1, "Це поле є обов'яковим"),
    weight_size: z
        .string({
            required_error: "Це поле є обов'яковим"
        })
        .min(1, "Це поле є обов'яковим"),
    diameter: z
        .string({
            required_error: "Це поле є обов'яковим"
        })
        .min(1, "Це поле є обов'яковим"),
    packaging_of: z
        .string({
            required_error: "Це поле є обов'яковим"
        })
        .min(1, "Це поле є обов'яковим"),
    quality: z
        .string({
            required_error: "Це поле є обов'яковим"
        })
        .min(1, "Це поле є обов'яковим")
        .max(3, 'Максимальна кількість символів - 3'),
    producer: z
        .string({
            required_error: "Це поле є обов'яковим"
        })
        .min(1, "Це поле є обов'яковим"),
    product: z
        .string({
            required_error: "Це поле є обов'яковим"
        })
        .min(1, "Це поле є обов'яковим"),
    colors: z.array(z.coerce.number()).min(1, 'Оберіть хоча б один колір'),
    image: z.array(z.instanceof(File)).min(1, 'Необхідно додати файл')
})

const editShopProductSchema = z.object({
    ...addShopProductSchema.omit({
        image: true
    }).shape,
    image: z
        .array(
            z.object({
                url: z.string()
            })
        )
        .min(1, 'Необхідно додати зображення'),
    discounts: z.array(z.string()).optional(),
    ...addProductSchema.shape
})

const productFormFields = (
    form: UseFormReturn<z.infer<typeof addShopProductSchema>>,
    shopProduct?: ShopProduct
) => (
    <>
        <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Зображення</FormLabel>
                    <FormControl>
                        <FilePicker
                            caption
                            multiple={false}
                            onChange={field.onChange}
                            value={field.value}
                        />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
        <div className='flex items-center gap-4'>
            <FormField
                control={form.control}
                name='height'
                render={({ field }) => (
                    <FormItem className='min-w-40 flex-1'>
                        <FormLabel>Висота</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='10'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='weight_size'
                render={({ field }) => (
                    <FormItem className='min-w-40 flex-1'>
                        <FormLabel>Вага</FormLabel>
                        <FormControl>
                            <Input
                                type='number'
                                inputMode='numeric'
                                placeholder='10'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='packaging_of'
                render={({ field }) => (
                    <FormItem className='min-w-40 flex-1'>
                        <FormLabel>Пакування</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='10'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <div className='flex items-center gap-4'>
            <FormField
                control={form.control}
                name='stage'
                render={({ field }) => (
                    <FormItem className='min-w-40 flex-1'>
                        <FormLabel>Зрілість</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='1'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='origin_id'
                render={({ field }) => (
                    <FormItem className='min-w-40 flex-1'>
                        <FormLabel>Артикул</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='707'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='quality'
                render={({ field }) => (
                    <FormItem className='min-w-40 flex-1'>
                        <FormLabel>Якість</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='A1'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <div className='flex items-center gap-2'>
            <FormField
                control={form.control}
                name='producer'
                render={({ field }) => (
                    <FormItem className='min-w-40 flex-1'>
                        <FormLabel>Виробник</FormLabel>
                        <FormControl>
                            <ProducerSelect
                                producerName={shopProduct?.producer?.name || ''}
                                producer={field.value?.toString()}
                                setProducer={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='product'
                render={({ field }) => (
                    <FormItem className='min-w-40 flex-1'>
                        <FormLabel>Продукт</FormLabel>
                        <FormControl>
                            <ProductSelect
                                productName={shopProduct?.product?.ukr_name || ''}
                                product={field.value?.toString()}
                                setProduct={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <div className='flex items-center gap-2'>
            <FormField
                control={form.control}
                name='diameter'
                render={({ field }) => (
                    <FormItem className='min-w-40 flex-1'>
                        <FormLabel>Діаметр</FormLabel>
                        <FormControl>
                            <Input
                                type='text'
                                placeholder='10'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='colors'
                render={({ field }) => (
                    <FormItem className='min-w-40 flex-1'>
                        <FormLabel>Кольори</FormLabel>
                        <FormControl>
                            <ColorsSelect
                                colors={field.value?.map((color) => color.toString())}
                                setColors={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    </>
)

const editProductFormFields = (
    form: UseFormReturn<z.infer<typeof editShopProductSchema>>,
    shopProduct?: ShopProduct
) => (
    <>
        <div className='grid grid-cols-3 gap-4'>
            <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Назва англійською</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='Rose'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Категорія</FormLabel>
                        <FormControl>
                            <CategorySelect
                                category={field.value?.toString()}
                                setCategory={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='origin_id'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Артикул</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='707'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <div className='mt-4 grid grid-cols-2 gap-4'>
            <div className='flex h-full flex-col justify-between'>
                <FormField
                    control={form.control}
                    name='ukr_name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Назва українською</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Троянда'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Опис</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Квітка червоного кольору'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Зображення</FormLabel>
                        <FormControl>
                            <FilePicker
                                accept={['.png', '.jpg', '.jpeg', '.webp']}
                                multiple={false}
                                onChange={field.onChange}
                                value={field.value}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <Separator className='my-4' />

        <div className='grid grid-cols-6 gap-4'>
            <FormField
                control={form.control}
                name='height'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Висота</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='10'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='weight_size'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Вага</FormLabel>
                        <FormControl>
                            <Input
                                type='number'
                                inputMode='numeric'
                                placeholder='10'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='diameter'
                render={({ field }) => (
                    <FormItem className='w-full'>
                        <FormLabel>Діаметр</FormLabel>
                        <FormControl>
                            <Input
                                type='text'
                                placeholder='10'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='quality'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Якість</FormLabel>
                        <FormControl>
                            <Input
                                type='text'
                                maxLength={3}
                                placeholder='A1'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='stage'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Зрілість</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='1'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name='packaging_of'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Пакування</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='10'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <div className='mt-4 grid grid-cols-2 gap-4'>
            <FormField
                control={form.control}
                name='producer'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Виробник</FormLabel>
                        <FormControl>
                            <ProducerSelect
                                producerName={shopProduct?.producer?.name || ''}
                                producer={field.value?.toString()}
                                setProducer={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='product'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Продукт</FormLabel>
                        <FormControl>
                            <ProductSelect
                                productName={shopProduct?.product?.ukr_name || ''}
                                product={field.value?.toString()}
                                setProduct={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <div className='mt-4 flex items-center gap-2'>
            <FormField
                control={form.control}
                name='discounts'
                render={({ field }) => (
                    <FormItem className='w-full'>
                        <FormLabel>Знижки</FormLabel>
                        <FormControl>
                            <DiscountsSelect
                                setDiscounts={field.onChange}
                                discounts={field.value || []}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='colors'
                render={({ field }) => (
                    <FormItem className='w-full'>
                        <FormLabel>Кольори</FormLabel>
                        <FormControl>
                            <ColorsSelect
                                colors={field.value?.map((color) => color.toString())}
                                setColors={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    </>
)

export const AddShopProductModal = ({
    size = 'sm',
    shopProduct
}: {
    size?: 'sm' | 'icon'
    shopProduct?: ShopProduct
}) => {
    const addShopProductImageMutation = useMutation({
        mutationFn: ({ id, image }: { image: FormData; id: number }) => {
            return addShopProductImage(id, {
                payload: {
                    image
                }
            })
        }
    })
    return (
        <CreateModal
            title='Товар'
            defaultValues={{
                colors: [],
                image: [],
                height: '',
                origin_id: '',
                stage: '',
                weight_size: '',
                packaging_of: '',
                quality: '',
                producer: '',
                product: '',
                diameter: ''
            }}
            schema={addShopProductSchema}
            mutation={(payload) => {
                return addShopProduct({
                    ...payload,
                    colors: payload.colors,
                    producer: +payload.producer,
                    product: +payload.product,
                    height: +payload.height,
                    weight_size: +payload.weight_size,
                    packaging_of: +payload.packaging_of,
                    stage: +payload.stage,
                    image: null
                }).then((res) => {
                    addShopProductImageMutation.mutate({
                        id: res.id,
                        image: payload.image[0] as any
                    })
                }) as any
            }}
            queryKey='shop-products'
            renderFields={(form) => productFormFields(form, shopProduct)}
            size={size}
        />
    )
}

export const EditShopProductModal = ({ shopProduct }: { shopProduct: ShopProduct }) => {
    const editProductMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: ProductPayload }) =>
            patchProduct(id, payload)
    })

    const editStockMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: Partial<StocksPayload> }) =>
            patchStock(id, payload)
    })

    const addShopProductImageMutation = useMutation({
        mutationFn: ({ id, image }: { image: FormData; id: number }) => {
            return addShopProductImage(id, {
                payload: {
                    image
                }
            })
        }
    })

    return (
        <EditModal
            title='Товар'
            data={shopProduct}
            schema={editShopProductSchema}
            transformDefaultValues={(values) => {
                const { currentStock } = useCatalogueOperations({
                    stocks: shopProduct?.stocks
                })
                return {
                    image: [
                        {
                            url: values.image || ''
                        }
                    ],
                    discounts:
                        currentStock?.discounts?.map((discount) =>
                            discount.id?.toString()
                        ) ?? [],
                    category: shopProduct?.product.category?.id,
                    name: shopProduct?.product.name,
                    description: shopProduct?.product.description || '',
                    ukr_name: shopProduct?.product.ukr_name,
                    colors: shopProduct?.colors.map((color) => color.id),
                    producer: shopProduct?.producer?.id?.toString(),
                    product: shopProduct?.product?.id?.toString(),
                    height: shopProduct?.height?.toString(),
                    stage: shopProduct?.stage?.toString(),
                    weight_size: shopProduct?.weight_size?.toString(),
                    packaging_of: shopProduct?.packaging_of?.toString(),
                    quality: shopProduct?.quality?.toString(),
                    origin_id: shopProduct?.origin_id,
                    diameter: shopProduct?.diameter?.toString()
                }
            }}
            mutation={(_, payload) => {
                editProductMutation.mutate({
                    id: shopProduct?.product?.id!,
                    payload: {
                        category: payload.category,
                        name: payload.name,
                        description: payload.description,
                        ukr_name: payload.ukr_name
                    }
                })

                editStockMutation.mutate({
                    id: shopProduct?.id!,
                    payload: {
                        discounts: payload.discounts?.map(parseInt)
                    }
                })

                return patchShopProducts(shopProduct?.id!, {
                    image: null,
                    producer: +payload.producer,
                    product: +payload.product,
                    colors: payload.colors,
                    height: +payload.height,
                    origin_id: payload.origin_id,
                    stage: +payload.stage,
                    weight_size: +payload.weight_size,
                    packaging_of: +payload.packaging_of,
                    quality: payload.quality
                }).then((res) => {
                    addShopProductImageMutation.mutate({
                        id: res.id,
                        image: payload.image[0] as any
                    })
                }) as any
            }}
            queryKey='products'
            renderFields={(form) => editProductFormFields(form, shopProduct)}
        />
    )
}
