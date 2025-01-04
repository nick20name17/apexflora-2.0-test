import { useQueryState } from 'nuqs'
import { useEffect, useMemo, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { useAuth } from './use-auth'
import { addToCart, removeFromCart, updateCart } from '@/api/baskets/baskets'
import type { Cart, CartsResponse } from '@/api/baskets/baskets.types'
import type { ShopProductsResponse, Stock } from '@/api/shop-products/shop-products.types'
import { deleteFromWishList, postWishList } from '@/api/wish-list/wish-list'
import { useFilters } from '@/pages/catalogue/store/filters'

type CartOperation = {
    amount: number
    stock_product: number
}
const formatPrice = (price: number) => {
    const formatter = new Intl.NumberFormat('uk-UA', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    })
    return formatter.format(price)
}

export const useCatalogueOperations = ({
    stocks,
    inWishList
}: {
    stocks: Stock[]
    inWishList?: boolean
}) => {
    const { filters } = useFilters()

    const queryClient = useQueryClient()
    const { currentUser } = useAuth()

    const [currentStockId] = useQueryState('status', {
        defaultValue: 2,
        parse: Number
    })

    const currentStock = useMemo(
        () => stocks.find((stock) => stock.status.id === currentStockId),
        [stocks, currentStockId]
    )
    const currentStockPrice = useMemo(
        () => +formatPrice(+currentStock?.retail_price!),
        [currentStock]
    )

    const currentStockMaxDiscountPercentage = currentStock?.discounts.reduce(
        (innerAcc, discount) => {
            const discountValue = parseFloat(discount.percentage) || 0
            return Math.max(innerAcc, discountValue)
        },
        0
    )

    const priceWithDiscount = currentStockMaxDiscountPercentage
        ? +formatPrice(
              currentStock?.retail_price! * (1 - currentStockMaxDiscountPercentage / 100)
          )
        : '-'

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
                            } else {
                                return shopProduct
                            }
                        })
                    }
                }
            )
        },
        onSettled: () => {
            queryClient.invalidateQueries('wishList')
            queryClient.invalidateQueries('shopProducts')
        }
    })

    const removeFromWishListMutation = useMutation(
        ({ shopProductId }: { shopProductId: number }) =>
            deleteFromWishList(shopProductId),
        {
            onMutate: async (newWishListItem) => {
                await queryClient.cancelQueries(['wishList'])
                await queryClient.cancelQueries(['shopProducts', filters])

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
                                } else {
                                    return shopProduct
                                }
                            })
                        }
                    }
                )
            }
            // onError: (_, __, context) => {
            //     if (context) {
            //         queryClient.setQueryData(['wishList'], context.wishList)
            //         queryClient.setQueryData(
            //             ['shopProducts', filters],
            //             context.shopProducts
            //         )
            //     }
            // }
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
        priceWithDiscount: +priceWithDiscount,
        inCart,
        totalPriceWithDiscount,
        totalPrice,
        addToCartMutation,
        removeFromCartMutation,
        updateCartMutation,
        handleValueChange,
        handleAddToWishList
    }
}
