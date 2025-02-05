import { useQueryState } from 'nuqs'
import { useEffect, useMemo, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { addToCart, removeFromCart, updateCart } from '@/api/carts/carts'
import type { Cart, CartsResponse } from '@/api/carts/carts.types'
import type { ShopProductsResponse } from '@/api/shop-products/shop-products.types'
import type { Stock } from '@/api/stock/stock.types'
import { deleteFromWishList, postWishList } from '@/api/wish-list/wish-list'
import { useFilters } from '@/pages/catalogue/store/filters'
import { useAuth } from './use-auth'

type CartOperation = {
    amount: number
    stock_product: number
}

export const formatPrice = (price: number): number => {
    const formatter = new Intl.NumberFormat('uk-UA', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    })

    const formattedString = formatter.format(price)

    return Number(formattedString.replace(/\s/g, '').replace(',', '.'))
}

export const useCatalogueOperations = ({
    stocks,
    inWishList,
    initialCurrentStock,
    initialCurrentStockId
}: {
    stocks?: Stock[]
    initialCurrentStock?: Stock
    inWishList?: boolean
    initialCurrentStockId?: string
}) => {
    const { filters } = useFilters()

    const queryClient = useQueryClient()
    const { currentUser } = useAuth()

    const [currentStockStatus] = useQueryState('status', {
        defaultValue: initialCurrentStockId || '2'
    })

    const currentStockId = initialCurrentStockId ?? currentStockStatus

    const currentStock =
        initialCurrentStock ||
        useMemo(
            () => stocks?.find((stock) => stock.status.id === +currentStockId),
            [stocks, currentStockId]
        )
    const currentStockPrice = useMemo(
        () => formatPrice(+currentStock?.retail_price!),
        [currentStock]
    )

    const currentStockMaxDiscountPercentage = currentStock?.visible_discount

    const priceWithDiscount = currentStockMaxDiscountPercentage
        ? formatPrice(
            currentStock?.retail_price! * (1 - currentStockMaxDiscountPercentage / 100)
        )
        : 0

    const [amount, setAmount] = useState(currentStock?.in_basket || 0)

    const totalPrice = formatPrice(currentStockPrice * amount)
    const totalPriceWithDiscount = formatPrice(+priceWithDiscount * amount)

    const inCart = currentStock?.in_basket

    useEffect(() => {
        setAmount(currentStock?.in_basket || 0)
    }, [currentStock, currentStock?.in_basket])

    const updateOptimisticData = (newAmount: number, stockId: number) => {
        queryClient.setQueryData<ShopProductsResponse>(
            ['shopProducts', filters],
            (oldData): ShopProductsResponse => {
                if (!oldData) return oldData!

                return {
                    ...oldData,
                    results: oldData.results.map((shopProduct) => ({
                        ...shopProduct,
                        stocks: shopProduct.stocks.map((stock) =>
                            stock.id === stockId
                                ? { ...stock, in_basket: newAmount }
                                : stock
                        )
                    }))
                }
            }
        )

        queryClient.setQueryData<CartsResponse>(['cart'], (oldData): CartsResponse => {
            if (!oldData) {
                return {
                    results: [],
                    count: 0,
                    next: null,
                    previous: null
                }
            }

            const existingCartItem = oldData.results.find(
                (cart) => cart.stock_product.id === stockId
            )

            let newResults: Cart[]
            let newCount = oldData.count

            if (existingCartItem) {
                if (newAmount === 0) {
                    newResults = oldData.results.filter(
                        (cart) => cart.stock_product.id !== stockId
                    )
                    newCount--
                } else {
                    newResults = oldData.results.map((cart) =>
                        cart.stock_product.id === stockId
                            ? {
                                ...cart,
                                amount: newAmount,
                                stock_product: {
                                    ...cart.stock_product,
                                    in_basket: newAmount
                                }
                            }
                            : cart
                    )
                }
            } else {
                if (newAmount > 0) {
                    newResults = [
                        ...oldData.results,
                        // @ts-ignore
                        {
                            id: Date.now(),
                            amount: newAmount,
                            stock_product: {
                                ...currentStock!,
                                in_basket: newAmount
                            }
                        } as Cart
                    ]
                    newCount++
                } else {
                    newResults = oldData.results
                }
            }

            return {
                ...oldData,
                count: newCount,
                results: newResults
            }
        })
    }

    const addToCartMutation = useMutation(
        (vars: CartOperation) => addToCart({ ...vars, creator: currentUser?.id! }),
        {
            onMutate: async (newCart) => {
                await queryClient.cancelQueries(['cart'])
                await queryClient.cancelQueries(['shopProducts', filters])

                const previousState = {
                    cart: queryClient.getQueryData<CartsResponse>(['cart']),
                    shopProducts: queryClient.getQueryData<ShopProductsResponse>([
                        'shopProducts',
                        filters
                    ])
                }

                updateOptimisticData(newCart.amount, newCart.stock_product)

                return previousState
            },
            onError: (_, __, context) => {
                if (context) {
                    queryClient.setQueryData(['cart'], context.cart)
                    queryClient.setQueryData(
                        ['shopProducts', filters],
                        context.shopProducts
                    )
                }
            }
        }
    )

    const updateCartMutation = useMutation(
        (vars: CartOperation) =>
            updateCart(vars.stock_product, { ...vars, creator: currentUser?.id! }),
        {
            onMutate: async (newCart) => {
                await queryClient.cancelQueries(['cart'])
                await queryClient.cancelQueries(['shopProducts', filters])

                const previousState = {
                    cart: queryClient.getQueryData<CartsResponse>(['cart']),
                    shopProducts: queryClient.getQueryData<ShopProductsResponse>([
                        'shopProducts',
                        filters
                    ])
                }

                updateOptimisticData(newCart.amount, newCart.stock_product)

                return previousState
            },
            onError: (_, __, context) => {
                if (context) {
                    queryClient.setQueryData(['cart'], context.cart)
                    queryClient.setQueryData(
                        ['shopProducts', filters],
                        context.shopProducts
                    )
                }
            }
        }
    )

    const removeFromCartMutation = useMutation(() => removeFromCart(currentStock?.id!), {
        onMutate: async () => {
            await queryClient.cancelQueries(['cart'])
            await queryClient.cancelQueries(['shopProducts', filters])

            const previousState = {
                cart: queryClient.getQueryData<CartsResponse>(['cart']),
                shopProducts: queryClient.getQueryData<ShopProductsResponse>([
                    'shopProducts',
                    filters
                ])
            }

            updateOptimisticData(0, currentStock?.id!)

            return previousState
        },
        onError: (_, __, context) => {
            if (context) {
                queryClient.setQueryData(['cart'], context.cart)
                queryClient.setQueryData(['shopProducts', filters], context.shopProducts)
            }
        }
    })

    const handleValueChange = (value: number) => {
        if (!currentStock) return

        setAmount(value)

        if (value === 0) {
            removeFromCartMutation.mutate()
        } else if (currentStock.in_basket) {
            updateCartMutation.mutate({ amount: value, stock_product: currentStock.id })
        } else {
            addToCartMutation.mutate({ amount: value, stock_product: currentStock.id })
        }
    }

    const addToWishListMutation = useMutation({
        mutationFn: postWishList,
        onMutate: async (newWishListItem) => {
            await queryClient.cancelQueries(['wishList'])
            await queryClient.cancelQueries(['shopProducts', filters])
            await queryClient.cancelQueries(['cart'])

            const previousState = {
                wishList: queryClient.getQueryData(['wishList']),
                shopProducts: queryClient.getQueryData<ShopProductsResponse>([
                    'shopProducts',
                    filters
                ]),
                cart: queryClient.getQueryData<CartsResponse>(['cart'])
            }

            queryClient.setQueryData<ShopProductsResponse>(
                ['shopProducts'],
                (oldData): ShopProductsResponse => {
                    if (!oldData) return oldData!

                    return {
                        ...oldData,
                        results: oldData.results.map((shopProduct) => {
                            if (shopProduct.id === newWishListItem.shop_product) {
                                return {
                                    ...shopProduct,
                                    in_wish_list: true
                                }
                            }
                            return shopProduct
                        })
                    }
                }
            )

            queryClient.setQueryData<ShopProductsResponse>(
                ['shopProducts', filters],
                (oldData): ShopProductsResponse => {
                    if (!oldData) return oldData!

                    return {
                        ...oldData,
                        results: oldData.results.map((shopProduct) => {
                            if (shopProduct.id === newWishListItem.shop_product) {
                                return {
                                    ...shopProduct,
                                    in_wish_list: true
                                }
                            }
                            return shopProduct
                        })
                    }
                }
            )

            queryClient.setQueryData<ShopProductsResponse>(
                ['wishList'],
                (oldData): ShopProductsResponse => {
                    if (!oldData) return oldData!

                    return {
                        ...oldData,
                        count: oldData.count + 1
                    }
                }
            )

            queryClient.setQueryData<CartsResponse>(
                ['cart'],
                (oldData): CartsResponse => {
                    if (!oldData) return oldData!

                    return {
                        ...oldData,
                        results: oldData.results.map((cartItem) => {
                            return {
                                ...cartItem,
                                in_wish_list:
                                    cartItem.stock_product.shop_product.id ===
                                        newWishListItem.shop_product
                                        ? true
                                        : cartItem.in_wish_list
                            }
                        })
                    }
                }
            )

            return previousState
        },
        onError: (_, __, context) => {
            if (context) {
                queryClient.setQueryData(['wishList'], context.wishList)
                queryClient.setQueryData(['shopProducts', filters], context.shopProducts)
                queryClient.setQueryData(['cart'], context.cart)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries('wishList')
            queryClient.invalidateQueries('shopProducts')
            queryClient.invalidateQueries('cart')
        }
    })

    const removeFromWishListMutation = useMutation(
        ({ shopProductId }: { shopProductId: number }) =>
            deleteFromWishList(shopProductId),
        {
            onMutate: async (newWishListItem) => {
                await queryClient.cancelQueries(['wishList'])
                await queryClient.cancelQueries(['shopProducts', filters])
                await queryClient.cancelQueries(['cart'])

                const previousState = {
                    wishList: queryClient.getQueryData(['wishList']),
                    shopProducts: queryClient.getQueryData<ShopProductsResponse>([
                        'shopProducts',
                        filters
                    ]),
                    cart: queryClient.getQueryData<CartsResponse>(['cart'])
                }

                queryClient.setQueryData<ShopProductsResponse>(
                    ['shopProducts'],
                    (oldData): ShopProductsResponse => {
                        if (!oldData) return oldData!

                        return {
                            ...oldData,
                            results: oldData.results.map((shopProduct) => {
                                if (shopProduct.id === newWishListItem.shopProductId) {
                                    return {
                                        ...shopProduct,
                                        in_wish_list: false
                                    }
                                }
                                return shopProduct
                            })
                        }
                    }
                )

                queryClient.setQueryData<ShopProductsResponse>(
                    ['shopProducts', filters],
                    (oldData): ShopProductsResponse => {
                        if (!oldData) return oldData!

                        return {
                            ...oldData,
                            results: oldData.results.map((shopProduct) => {
                                if (shopProduct.id === newWishListItem.shopProductId) {
                                    return {
                                        ...shopProduct,
                                        in_wish_list: false
                                    }
                                }
                                return shopProduct
                            })
                        }
                    }
                )

                queryClient.setQueryData<ShopProductsResponse>(
                    ['wishList'],
                    (oldData): ShopProductsResponse => {
                        if (!oldData) return oldData!

                        return {
                            ...oldData,
                            count: oldData.count - 1
                        }
                    }
                )

                queryClient.setQueryData<CartsResponse>(
                    ['cart'],
                    (oldData): CartsResponse => {
                        if (!oldData) return oldData!

                        return {
                            ...oldData,
                            results: oldData.results.map((cartItem) => ({
                                ...cartItem,
                                in_wish_list:
                                    cartItem.stock_product.shop_product.id ===
                                        newWishListItem.shopProductId
                                        ? false
                                        : cartItem.in_wish_list
                            }))
                        }
                    }
                )

                return previousState
            },
            onError: (_, __, context) => {
                if (context) {
                    queryClient.setQueryData(['wishList'], context.wishList)
                    queryClient.setQueryData(
                        ['shopProducts', filters],
                        context.shopProducts
                    )
                    queryClient.setQueryData(['cart'], context.cart)
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries('wishList')
                queryClient.invalidateQueries('shopProducts')
                queryClient.invalidateQueries('cart')
            }
        }
    )

    const handleAddToWishList = () => {
        if (inWishList) {
            removeFromWishListMutation.mutate({
                shopProductId: currentStock?.shop_product?.id!
            })
        } else {
            addToWishListMutation.mutate({
                shop_product: currentStock?.shop_product?.id!,
                creator: currentUser?.id!
            })
        }
    }

    return {
        amount,
        currentStock,
        currentStockMaxDiscountPercentage,
        currentStockPrice,
        priceWithDiscount,
        inCart,
        totalPriceWithDiscount,
        removeFromWishListMutation,
        totalPrice,
        addToCartMutation,
        removeFromCartMutation,
        updateCartMutation,
        handleValueChange,
        handleAddToWishList
    }
}
