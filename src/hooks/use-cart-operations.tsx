import { useMutation, useQuery, useQueryClient } from 'react-query'

import { addToCart, getCarts, removeFromCart, updateCart } from '@/api/carts/carts'
import type { Cart, CartsResponse } from '@/api/carts/carts.types'
import type { ShopProductsResponse } from '@/api/shop-products/shop-products.types'
import { useAuth } from './use-auth'
import { formatPrice } from './use-catalogue-operations'

type CartOperation = {
    amount: number
    stock_product: number
}

export const useCartOperations = () => {
    const queryClient = useQueryClient()
    const { currentUser } = useAuth()

    const { data: cart, isLoading } = useQuery({
        queryKey: ['cart'],
        queryFn: () =>
            getCarts({
                limit: 1000
            }),
        staleTime: 1000
    })

    const isCartEmpty = cart?.count === 0

    const statusProducts = {
        delivery: cart?.results?.filter((item) => item.stock_product.status?.id === 1),
        available: cart?.results?.filter((item) => item.stock_product.status?.id === 2),
        preOrder: cart?.results?.filter((item) => item.stock_product.status?.id === 3)
    }

    const statusTotalPrices = {
        available:
            statusProducts.available?.reduce((acc, item) => {
                return acc + item.amount * +item.stock_product.retail_price
            }, 0) || 0,
        delivery:
            statusProducts.delivery?.reduce((acc, item) => {
                return acc + item.amount * +item.stock_product.retail_price
            }, 0) || 0,
        preOrder:
            statusProducts.preOrder?.reduce((acc, item) => {
                return acc + item.amount * +item.stock_product.retail_price
            }, 0) || 0
    }

    const totalPrice =
        statusTotalPrices.available +
        statusTotalPrices.delivery +
        statusTotalPrices.preOrder

    const totalDiscounts = {
        available:
            statusProducts.available?.reduce((acc, item) => {
                return acc + item.discount
            }, 0) || 0,
        delivery:
            statusProducts.delivery?.reduce((acc, item) => {
                return acc + item.discount
            }, 0) || 0,
        preOrder:
            statusProducts.preOrder?.reduce((acc, item) => {
                return acc + item.discount
            }, 0) || 0
    }

    const totalDiscount =
        totalDiscounts.available + totalDiscounts.delivery + totalDiscounts.preOrder

    const calculateItemPrices = (cart: Cart) => {
        const stockMaxDiscountPercentage = cart.visible_discount

        const priceWithDiscount = stockMaxDiscountPercentage
            ? +formatPrice(
                // @ts-ignore
                cart.stock_product.retail_price * (1 - stockMaxDiscountPercentage / 100)
            )
            : null

        const totalPrice = formatPrice(+cart.stock_product.retail_price * cart.amount)

        const totalPriceWithDiscount = priceWithDiscount
            ? formatPrice(priceWithDiscount * cart.amount)
            : null

        return {
            stockMaxDiscountPercentage,
            priceWithDiscount,
            totalPrice,
            totalPriceWithDiscount,
            hasDiscount: Boolean(
                stockMaxDiscountPercentage && +totalPriceWithDiscount! > 0
            )
        }
    }

    const calculateDiscount = (
        amount: number,
        retailPrice: number,
        visibleDiscount: number
    ) => {
        if (!visibleDiscount) return 0
        const fullPrice = amount * retailPrice
        const discountedPrice = fullPrice * (1 - visibleDiscount / 100)
        return fullPrice - discountedPrice
    }

    const updateOptimisticData = (newAmount: number, stockId: number) => {
        queryClient.cancelQueries(['cart'])
        queryClient.cancelQueries(['shopProducts'])

        queryClient.setQueryData<CartsResponse>(['cart'], (oldData): CartsResponse => {
            if (!oldData) {
                return {
                    results: [],
                    count: 0,
                    next: null,
                    previous: null
                }
            }

            if (newAmount === 0) {
                return {
                    ...oldData,
                    count: oldData.count - 1,
                    results: oldData?.results?.filter(
                        (cart) => cart?.stock_product?.id !== stockId
                    )
                }
            }

            const existingCartItem = oldData.results.find(
                (cart) => cart.stock_product.id === stockId
            )

            if (existingCartItem) {
                return {
                    ...oldData,
                    results: oldData.results.map((cart) => {
                        if (cart.stock_product.id === stockId) {
                            const newDiscount = calculateDiscount(
                                newAmount,
                                +cart.stock_product.retail_price,
                                cart.visible_discount || 0
                            )
                            return {
                                ...cart,
                                discount: newDiscount,
                                amount: newAmount,
                                stock_product: {
                                    ...cart.stock_product,
                                    in_basket: newAmount
                                }
                            }
                        }
                        return cart
                    })
                }
            }

            const stockData = queryClient.getQueryData<ShopProductsResponse>([
                'shopProducts'
            ])
            const stockProduct = stockData?.results
                .flatMap((product) => product.stocks)
                .find((stock) => stock.id === stockId)

            if (!stockProduct) return oldData

            const newDiscount = calculateDiscount(
                newAmount,
                +stockProduct.retail_price,
                stockProduct.visible_discount || 0
            )

            return {
                ...oldData,
                count: oldData.count + 1,
                results: [
                    ...oldData.results,
                    {
                        id: Date.now(),
                        amount: newAmount,
                        stock_product: {
                            ...stockProduct,
                            // @ts-ignore
                            in_basket: newAmount
                        },
                        in_wish_list: stockProduct.shop_product.in_wish_list,
                        created_at: new Date().toISOString(),
                        creator: currentUser?.id?.toString()!,
                        discount: newDiscount,
                        visible_discount: stockProduct.visible_discount
                    }
                ]
            }
        })

        queryClient.setQueryData<ShopProductsResponse>(
            ['shopProducts'],
            (oldData): ShopProductsResponse => {
                if (!oldData) return oldData!

                return {
                    ...oldData,
                    results: oldData.results.map((product) => ({
                        ...product,
                        stocks: product.stocks.map((stock) =>
                            stock.id === stockId
                                ? { ...stock, in_basket: newAmount }
                                : stock
                        )
                    }))
                }
            }
        )
    }

    const removeFromCartMutation = useMutation((id: number) => removeFromCart(id), {
        onMutate: async (id) => {
            const previousCart = queryClient.getQueryData<CartsResponse>(['cart'])
            const previousProducts = queryClient.getQueryData<ShopProductsResponse>([
                'shopProducts'
            ])

            updateOptimisticData(0, id)

            return { previousCart, previousProducts }
        },
        onError: (_, __, context) => {
            if (context) {
                queryClient.setQueryData(['cart'], context.previousCart)
                queryClient.setQueryData(['shopProducts'], context.previousProducts)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries(['cart'])
            queryClient.invalidateQueries(['shopProducts'])
        }
    })

    const addToCartMutation = useMutation(
        (vars: CartOperation) => addToCart({ ...vars, creator: currentUser?.id! }),
        {
            onMutate: async (newCart) => {
                const previousCart = queryClient.getQueryData<CartsResponse>(['cart'])
                const previousProducts = queryClient.getQueryData<ShopProductsResponse>([
                    'shopProducts'
                ])

                updateOptimisticData(newCart.amount, newCart.stock_product)

                return { previousCart, previousProducts }
            },
            onError: (_, __, context) => {
                if (context) {
                    queryClient.setQueryData(['cart'], context.previousCart)
                    queryClient.setQueryData(['shopProducts'], context.previousProducts)
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries(['cart'])
                queryClient.invalidateQueries(['shopProducts'])
            }
        }
    )

    const updateCartMutation = useMutation(
        (vars: CartOperation) =>
            updateCart(vars.stock_product, { ...vars, creator: currentUser?.id! }),
        {
            onMutate: async (newCart) => {
                const previousCart = queryClient.getQueryData<CartsResponse>(['cart'])
                const previousProducts = queryClient.getQueryData<ShopProductsResponse>([
                    'shopProducts'
                ])

                updateOptimisticData(newCart.amount, newCart.stock_product)

                return { previousCart, previousProducts }
            },
            onError: (_, __, context) => {
                if (context) {
                    queryClient.setQueryData(['cart'], context.previousCart)
                    queryClient.setQueryData(['shopProducts'], context.previousProducts)
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries(['cart'])
                queryClient.invalidateQueries(['shopProducts'])
            }
        }
    )

    const handleCartOperation = (stockId: number, newAmount: number) => {
        if (newAmount === 0) {
            removeFromCartMutation.mutate(stockId)
        } else {
            const existingCartItem = cart?.results.find(
                (item) => item.stock_product.id === stockId
            )

            if (existingCartItem) {
                updateCartMutation.mutate({ amount: newAmount, stock_product: stockId })
            } else {
                addToCartMutation.mutate({ amount: newAmount, stock_product: stockId })
            }
        }
    }

    return {
        isCartEmpty,
        totalDiscount,
        totalPrice,
        isLoading,
        statusProducts,
        statusTotalPrices,
        totalDiscounts,
        cartCount: cart?.count ?? 0,
        cartData: cart?.results ?? [],
        calculateItemPrices,
        addToCartMutation,
        updateCartMutation,
        removeFromCartMutation,
        handleCartOperation
    }
}
