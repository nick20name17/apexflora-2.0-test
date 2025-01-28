import {
    ClipPath,
    Defs,
    Document,
    Font,
    G,
    Page,
    Path,
    Rect,
    StyleSheet,
    Svg,
    Text,
    View,
    pdf
} from '@react-pdf/renderer'
import { format } from 'date-fns'
import { saveAs } from 'file-saver'
import { DownloadIcon, Loader2 } from 'lucide-react'
import { useMutation } from 'react-query'

import type { OrderItem } from '@/api/order-items/order-items.types'
import type { Order, Statuses } from '@/api/orders/orders.types'
import { Button } from '@/components/ui/button'
import { DATE_FORMATS } from '@/constants/app'
import { formatPrice } from '@/hooks/use-catalogue-operations'
import { cn } from '@/lib/utils'

interface DownloadOrdersPdfProps {
    order: Order
}

export const DownloadOrdersPdfBtn = ({ order }: DownloadOrdersPdfProps) => {
    const downloadPdf = async () => {
        const fileName = `Замовлення №${order.id}.pdf`
        const blob = await pdf(<OrderPDF order={order} />).toBlob()
        saveAs(blob, fileName)
    }

    const downloadPdfMutation = useMutation({
        mutationFn: downloadPdf
    })

    return (
        <Button
            onClick={(e) => {
                e.stopPropagation()
                downloadPdfMutation.mutate()
            }}
            className={cn(
                'text-muted-foreground',
                downloadPdfMutation.isLoading && 'pointer-events-none'
            )}
            variant='outline'
            size='icon'
        >
            {downloadPdfMutation.isLoading ? (
                <Loader2 className='animate-spin' />
            ) : (
                <DownloadIcon />
            )}
        </Button>
    )
}

const getStatusName = (statusName: Statuses) => {
    const statuses = {
        pending: {
            displayName: 'Очікує підтвердження',
            style: {
                backgroundColor: '#FF7300',
                color: '#000000'
            }
        },
        approval: {
            displayName: 'Підтверджено',
            style: {
                backgroundColor: '#0E0E66',
                color: '#fff'
            }
        },
        shipped: {
            displayName: 'Відправлено',
            style: {
                backgroundColor: '#56CCF2',
                color: '#fff'
            }
        },
        delivered: {
            displayName: 'Виконано',
            style: {
                backgroundColor: '#C4DD00',
                color: '#000000'
            }
        },
        canceled: {
            displayName: 'Скасовано',
            style: {
                backgroundColor: '#dc2626',
                color: '#ffffff'
            }
        }
    }
    return statuses[statusName]
}

Font.register({
    family: 'Roboto',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf'
})

const FIRST_PAGE_ITEMS = 12
const OTHER_PAGES_ITEMS = 14

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Roboto'
    },
    section: {
        margin: 10,
        padding: 10
    },
    orderInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginTop: 25
    },
    label: {
        fontSize: 10,
        color: '#666'
    },
    value: {
        fontSize: 10,
        marginTop: 2
    },
    status: {
        padding: '4 8',
        borderRadius: 4,
        fontSize: '10px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: '100%'
    },
    itemContainer: {
        marginTop: 15,
        borderTop: '1 solid #eee'
    },
    item: {
        flexDirection: 'row',
        padding: 10,
        borderBottom: '1 solid #eee'
    },
    itemDetails: {
        flex: 1
    },
    priceInfo: {
        width: 100,
        textAlign: 'right'
    },
    discountPrice: {
        textDecoration: 'line-through',
        color: '#666',
        fontSize: '10px'
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'space-between',
        gap: 12
    },
    detailsItem: {
        fontSize: '10px'
    },
    promotions: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    orderNumber: {
        position: 'absolute',
        top: 30,
        right: 30,
        fontSize: 9,
        color: '#666666'
    },
    pageNumber: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        fontSize: 9,
        color: '#666666'
    }
})

const splitOrderItems = (items: Order['order_items']) => {
    if (!items?.length) return []

    const pages: Order['order_items'][] = []
    let remainingItems = [...items]

    const firstPageItems = remainingItems.slice(0, FIRST_PAGE_ITEMS)
    if (firstPageItems.length > 0) {
        pages.push(firstPageItems)
        remainingItems = remainingItems.slice(FIRST_PAGE_ITEMS)
    }

    while (remainingItems.length > 0) {
        const pageItems = remainingItems.slice(0, OTHER_PAGES_ITEMS)
        if (pageItems.length > 0) {
            pages.push(pageItems)
            remainingItems = remainingItems.slice(OTHER_PAGES_ITEMS)
        }
    }

    return pages
}

const OrderItem = ({ item }: { item: OrderItem }) => {
    const itemTotal = item.amount * +item.stock_product.retail_price
    const itemTotalWithDiscount = itemTotal - +item.discount

    return (
        <View style={styles.item}>
            <View style={styles.itemDetails}>
                <Text style={styles.value}>
                    {item.stock_product.shop_product.product?.ukr_name}
                </Text>
                <Text style={styles.label}>Всього: {item.amount}шт.</Text>
            </View>
            <View style={styles.details}>
                <Text style={styles.detailsItem}>
                    {item.stock_product.shop_product.origin_id}
                </Text>

                <View
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        flexDirection: 'row'
                    }}
                >
                    <HeightIcon />
                    <Text style={styles.detailsItem}>
                        {item.stock_product.shop_product.height ?? '-'}см.
                    </Text>
                </View>

                <View
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px',
                            flexDirection: 'row'
                        }}
                    >
                        <DiameterIcon />
                        <Text style={styles.detailsItem}>
                            {item.stock_product.shop_product.diameter ?? '-'}
                        </Text>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px',
                            flexDirection: 'row'
                        }}
                    >
                        <WeightIcon />
                        <Text style={styles.detailsItem}>
                            {item.stock_product.shop_product.weight_size ?? '-'}
                        </Text>
                    </View>
                </View>

                <View style={styles.promotions}>
                    {item?.stock_product?.promotion ? <FireIcon /> : null}
                    {item?.percentage ? `-${item?.percentage}%` : null}
                </View>

                <View style={styles.promotions}>
                    <View style={styles.promotions}>
                        {item?.stock_product.shop_product.weight_size ?? '-'}
                    </View>
                    <View style={styles.promotions}>
                        {item?.stock_product.shop_product.diameter ?? '-'}
                    </View>
                </View>
            </View>

            <View style={styles.priceInfo}>
                {+item.discount > 0 && (
                    <Text style={styles.discountPrice}>{formatPrice(itemTotal)}грн</Text>
                )}
                <Text style={styles.value}>{formatPrice(itemTotalWithDiscount)}грн</Text>
            </View>
        </View>
    )
}

const OrderPage = ({
    order,
    items,
    pageNumber,
    showHeader = true
}: {
    order: Order
    items: OrderItem[]
    pageNumber: number
    showHeader?: boolean
}) => {
    if (!items?.length) return null

    const totalPrice = order.order_items.reduce(
        (acc, item) => acc + item.amount * +item.stock_product.retail_price,
        0
    )
    const totalPriceWithDiscount = totalPrice - +order.discount
    const status = getStatusName(order.status)

    return (
        <Page
            size='A4'
            style={styles.page}
        >
            <Text
                style={styles.orderNumber}
                fixed
            >
                № Замовлення {order.id}
            </Text>
            <View style={styles.section}>
                {showHeader && (
                    <>
                        <Text>№ Замовлення {order.id}</Text>
                        <View style={styles.orderInfo}>
                            <View>
                                <Text style={styles.label}>Дата оформлення</Text>
                                <Text style={styles.value}>
                                    {format(order.created_at, DATE_FORMATS.date)}
                                </Text>
                            </View>

                            <View>
                                <Text style={styles.label}>Спосіб доставки</Text>
                                <Text style={styles.value}>Самовивіз</Text>
                            </View>

                            <View style={[styles.status, status.style]}>
                                <Text style={{ color: status.style.color }}>
                                    {status.displayName}
                                </Text>
                            </View>

                            <View>
                                <Text style={styles.label}>Сума</Text>
                                {+order.discount > 0 && (
                                    <Text style={styles.discountPrice}>
                                        {formatPrice(totalPrice)}грн
                                    </Text>
                                )}
                                <Text style={styles.value}>
                                    {formatPrice(totalPriceWithDiscount)}грн
                                </Text>
                            </View>
                        </View>
                    </>
                )}

                <View style={styles.itemContainer}>
                    {items.map((item, index) => (
                        <OrderItem
                            key={index}
                            item={item}
                        />
                    ))}
                </View>
            </View>
            <Text
                style={styles.pageNumber}
                fixed
            >
                {pageNumber}
            </Text>
        </Page>
    )
}

const OrderPDF = ({ order }: { order: Order }) => {
    const pageItems = splitOrderItems(order.order_items)

    if (!pageItems?.length) return null

    return (
        <Document>
            {pageItems.map((items, index) =>
                items?.length > 0 ? (
                    <OrderPage
                        key={index}
                        order={order}
                        items={items}
                        pageNumber={index + 1}
                        showHeader={index === 0}
                    />
                ) : null
            )}
        </Document>
    )
}

const HeightIcon = () => {
    return (
        <Svg
            width='12'
            height='11'
            viewBox='0 0 17 16'
            fill='none'
        >
            <Path
                d='M1.21499 9.26613C1.31398 9.23997 1.40667 9.23326 1.50529 9.26613C1.69328 9.41363 1.67457 9.45582 1.71264 9.7223C1.71264 9.98232 1.71264 10.2423 1.71264 10.5102C4.5318 7.69108 7.35097 4.87191 10.2556 1.96732C9.80395 1.96732 9.80395 1.96732 9.34321 1.96732C9.18667 1.92818 9.09816 1.89413 9.01145 1.75997C8.98529 1.66098 8.97858 1.56829 9.01145 1.46967C9.10119 1.35529 9.1592 1.2969 9.30524 1.27834C9.48439 1.25712 9.663 1.25598 9.84321 1.25608C9.87825 1.25599 9.9133 1.2559 9.94941 1.25581C10.023 1.25569 10.0967 1.25568 10.1703 1.25577C10.2828 1.25584 10.3953 1.25535 10.5078 1.25483C10.5796 1.25478 10.6514 1.25477 10.7232 1.25479C10.7567 1.2546 10.7902 1.2544 10.8247 1.25421C11.0182 1.255 11.182 1.25777 11.3429 1.37766C11.4834 1.56624 11.4431 1.8413 11.4423 2.06443C11.4422 2.10397 11.4422 2.1435 11.4422 2.18304C11.4422 2.26549 11.442 2.34794 11.4417 2.43039C11.4414 2.53614 11.4413 2.64189 11.4413 2.74764C11.4413 2.82909 11.4412 2.91054 11.4411 2.99199C11.441 3.04997 11.4409 3.10794 11.4409 3.16591C11.4408 3.20094 11.4406 3.23597 11.4405 3.27205C11.4404 3.30297 11.4403 3.33389 11.4402 3.36574C11.435 3.50657 11.3651 3.56936 11.2684 3.66502C11.2094 3.70908 11.2094 3.70908 11.0966 3.72334C10.9378 3.6994 10.8757 3.65044 10.7739 3.52246C10.7505 3.17068 10.7532 2.81753 10.7532 2.46496C7.93404 5.28413 5.11488 8.1033 2.21028 11.0079C2.53873 11.0079 2.86718 11.0079 3.20558 11.0079C3.30544 11.0412 3.37149 11.1122 3.43366 11.1945C3.4855 11.3708 3.4855 11.3708 3.4544 11.4641C3.41795 11.5148 3.41795 11.5148 3.36887 11.5703C3.34569 11.598 3.34569 11.598 3.32205 11.6262C3.11952 11.7483 2.78651 11.6955 2.55622 11.6956C2.52106 11.6957 2.4859 11.6958 2.44967 11.6958C2.3759 11.696 2.30214 11.696 2.22838 11.696C2.11536 11.696 2.00235 11.6964 1.88933 11.6968C1.81745 11.6969 1.74556 11.6969 1.67368 11.6969C1.63992 11.6971 1.60616 11.6972 1.57138 11.6974C1.54001 11.6973 1.50864 11.6973 1.47632 11.6972C1.44881 11.6972 1.42129 11.6973 1.39294 11.6973C1.27093 11.6889 1.18738 11.6602 1.10484 11.569C0.907094 11.2924 1.00378 10.736 1.0038 10.4086C1.00375 10.3088 1.00337 10.209 1.00298 10.1092C1.00292 10.0454 1.00288 9.98156 1.00286 9.91775C1.00271 9.88809 1.00256 9.85844 1.00241 9.82788C1.00293 9.60019 1.00451 9.40216 1.21499 9.26613Z'
                fill='#8A8A8A'
            />
            <Path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M13.5459 3.6036C13.7411 3.79886 13.7411 4.11544 13.5459 4.31071L5.06058 12.796C4.86532 12.9912 4.54873 12.9913 4.35347 12.796C4.15821 12.6007 4.15821 12.2841 4.35347 12.0889L12.8388 3.6036C13.034 3.40834 13.3506 3.40834 13.5459 3.6036Z'
                fill='#8A8A8A'
            />
            <Path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M12.8388 3.60355C13.0341 3.40829 13.3507 3.40829 13.5459 3.60355L16.3744 6.43198C16.5696 6.62724 16.5696 6.94383 16.3744 7.13909C16.1791 7.33435 15.8625 7.33435 15.6673 7.13909L12.8388 4.31066C12.6436 4.1154 12.6436 3.79882 12.8388 3.60355Z'
                fill='#8A8A8A'
            />
            <Path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M11.4248 5.01774C11.62 4.82248 11.9366 4.82248 12.1319 5.01774L13.5461 6.43195C13.7413 6.62721 13.7413 6.9438 13.5461 7.13906C13.3508 7.33432 13.0342 7.33432 12.839 7.13906L11.4248 5.72484C11.2295 5.52958 11.2295 5.213 11.4248 5.01774Z'
                fill='#8A8A8A'
            />
            <Path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M7.1816 9.26041C7.37687 9.06515 7.69345 9.06515 7.88871 9.26041L9.30292 10.6746C9.49819 10.8699 9.49819 11.1865 9.30292 11.3817C9.10766 11.577 8.79108 11.577 8.59582 11.3817L7.1816 9.96752C6.98634 9.77226 6.98634 9.45568 7.1816 9.26041Z'
                fill='#8A8A8A'
            />
            <Path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M10.0107 6.43192C10.206 6.23666 10.5225 6.23666 10.7178 6.43192L12.132 7.84614C12.3273 8.0414 12.3273 8.35798 12.132 8.55324C11.9368 8.74851 11.6202 8.74851 11.4249 8.55324L10.0107 7.13903C9.81544 6.94377 9.81544 6.62718 10.0107 6.43192Z'
                fill='#8A8A8A'
            />
            <Path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M5.76754 10.6746C5.9628 10.4793 6.27938 10.4793 6.47465 10.6746L7.88886 12.0888C8.08412 12.2841 8.08412 12.6007 7.88886 12.7959C7.6936 12.9912 7.37702 12.9912 7.18175 12.7959L5.76754 11.3817C5.57228 11.1864 5.57228 10.8699 5.76754 10.6746Z'
                fill='#8A8A8A'
            />
            <Path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M8.59664 7.84623C8.7919 7.65097 9.10849 7.65097 9.30375 7.84623L12.1322 10.6747C12.3274 10.8699 12.3274 11.1865 12.1322 11.3818C11.9369 11.577 11.6203 11.577 11.4251 11.3818L8.59664 8.55334C8.40138 8.35807 8.40138 8.04149 8.59664 7.84623Z'
                fill='#8A8A8A'
            />
            <Path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M4.35348 12.0888C4.54874 11.8935 4.86532 11.8935 5.06058 12.0888L7.88901 14.9172C8.08427 15.1125 8.08427 15.4291 7.88901 15.6243C7.69375 15.8196 7.37717 15.8196 7.1819 15.6243L4.35348 12.7959C4.15822 12.6006 4.15822 12.284 4.35348 12.0888Z'
                fill='#8A8A8A'
            />
        </Svg>
    )
}

const FireIcon = () => {
    return (
        <Svg
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
        >
            <Path
                d='M10.9648 4.00336C11.1203 3.98718 11.1925 4.02957 11.3171 4.12825C11.3416 4.14746 11.3416 4.14746 11.3665 4.16706C11.4152 4.20562 11.4633 4.24485 11.5113 4.28438C11.5364 4.3049 11.5615 4.32543 11.5874 4.34658C11.7827 4.51174 11.9641 4.69338 12.1441 4.87764C12.1779 4.91181 12.1779 4.91181 12.2124 4.94668C12.5168 5.26418 12.7633 5.64 12.9782 6.03295C12.9882 6.05116 12.9981 6.06938 13.0084 6.08814C13.6534 7.28668 13.6705 8.59868 13.4282 9.92217C13.3574 10.3327 13.3329 10.7425 13.536 11.1123C13.7279 11.4144 13.9694 11.6692 14.3033 11.7635C14.692 11.8316 15.0376 11.7725 15.3618 11.5207C15.5985 11.3094 15.7611 11.0446 15.8257 10.7166C15.8295 10.6652 15.8321 10.6137 15.8338 10.5621C15.8348 10.533 15.8359 10.504 15.837 10.4741C15.8391 10.4129 15.8411 10.3518 15.8431 10.2906C15.8442 10.2617 15.8452 10.2328 15.8464 10.203C15.8472 10.1765 15.8481 10.15 15.849 10.1227C15.8544 10.0609 15.8544 10.0609 15.8832 10.0297C15.9619 10.0153 15.9619 10.0153 16.0558 10.0297C16.1165 10.0958 16.1594 10.1524 16.2068 10.2287C16.2203 10.2498 16.2339 10.2709 16.2478 10.2926C17.1231 11.6826 17.5192 13.5041 17.2507 15.1695C17.0692 16.2134 16.6467 17.1934 15.9983 17.9919C15.9738 18.0223 15.9493 18.0526 15.9241 18.0839C15.0513 19.1505 13.8304 19.8486 12.518 19.9903C12.4385 19.9952 12.3592 19.9968 12.2797 19.9977C12.2575 19.9981 12.2354 19.9984 12.2126 19.9987C11.7195 20.0041 11.2443 19.9989 10.7635 19.8654C10.7267 19.8554 10.7267 19.8554 10.6893 19.8451C9.34549 19.4665 8.15998 18.5447 7.44464 17.245C7.37827 17.121 7.31549 16.9951 7.25443 16.8679C7.24535 16.849 7.23627 16.8301 7.22691 16.8107C6.55781 15.3975 6.51776 13.6752 6.9508 12.1745C7.27775 11.1008 7.84919 10.1763 8.54998 9.34702C8.60038 9.28728 8.64933 9.22659 8.69795 9.16516C8.81358 9.021 8.93443 8.88217 9.05477 8.74267C9.21335 8.55883 9.37033 8.37352 9.52667 8.18744C9.54844 8.16196 9.5702 8.13648 9.59262 8.11023C10.3666 7.19564 11.0054 6.11124 10.9985 4.82922C10.9902 4.6479 10.9723 4.46744 10.954 4.28701C10.9513 4.25938 10.9486 4.23174 10.9458 4.20327C10.9433 4.17831 10.9407 4.15335 10.9381 4.12764C10.936 4.0658 10.936 4.0658 10.9648 4.00336ZM11.1891 11.9501C11.1578 11.9853 11.1578 11.9853 11.1259 12.0211C11.1026 12.0468 11.0793 12.0726 11.0554 12.0991C11.0194 12.1403 11.0194 12.1403 10.9828 12.1822C10.959 12.2086 10.9353 12.2349 10.9109 12.2621C9.99616 13.2842 9.33302 14.4486 9.34393 15.9126C9.36055 16.601 9.58943 17.2591 10.0156 17.7734C10.0341 17.7958 10.0341 17.7958 10.053 17.8186C10.5116 18.3654 11.1366 18.7147 11.8225 18.7533C12.5785 18.7773 13.2399 18.5448 13.7998 17.9729C13.8229 17.9483 13.846 17.9236 13.8698 17.8983C13.8938 17.873 13.9178 17.8477 13.9425 17.8217C14.4249 17.2826 14.6625 16.5426 14.6566 15.7978C14.6478 15.4704 14.6166 15.0523 14.4451 14.7758C14.395 14.7383 14.395 14.7383 14.33 14.7446C14.2681 14.7851 14.2143 14.8257 14.1575 14.8734C13.7364 15.2062 13.2876 15.2881 12.7768 15.213C12.3315 15.1132 11.9741 14.8652 11.7216 14.4558C11.3989 13.8732 11.3833 13.28 11.3908 12.6194C11.3913 12.5526 11.3917 12.4858 11.392 12.419C11.393 12.2575 11.3944 12.0959 11.3962 11.9344C11.3053 11.9017 11.2703 11.8899 11.1891 11.9501Z'
                fill='#FD7301'
            />
        </Svg>
    )
}

const DiameterIcon = () => {
    return (
        <Svg
            width='12'
            height='12'
            viewBox='0 0 20 20'
            fill='none'
        >
            <G clip-path='url(#clip0_3413_9585)'>
                <Path
                    d='M9.98961 2.99143C10.0174 2.99149 10.0453 2.99155 10.074 2.99161C10.4739 2.99297 10.8647 3.00156 11.2577 3.08201C11.2849 3.0873 11.3122 3.09258 11.3403 3.09803C12.2605 3.27987 13.1843 3.6201 13.9413 4.18526C14.0134 4.23694 14.0134 4.23694 14.0816 4.22511C14.1005 4.21672 14.1195 4.20833 14.139 4.19968C14.1708 4.18705 14.1708 4.18705 14.2033 4.17416C14.2238 4.16566 14.2444 4.15717 14.2655 4.14841C14.6138 4.03812 14.9408 4.08632 15.2696 4.23728C15.5585 4.39445 15.7411 4.63542 15.8514 4.94138C15.8615 4.96866 15.8615 4.96866 15.8717 4.9965C15.964 5.29734 15.8976 5.58314 15.7967 5.87107C15.7767 5.92446 15.7767 5.92446 15.7694 5.98045C15.809 6.04961 15.8499 6.11217 15.8959 6.17698C16.3972 6.92103 16.7171 7.7634 16.8973 8.63963C16.9015 8.6596 16.9056 8.67958 16.9099 8.70016C16.9927 9.1293 17.0101 9.55372 17.0084 9.98972C17.0083 10.0176 17.0083 10.0454 17.0082 10.0741C17.0069 10.4735 17 10.8654 16.9178 11.2578C16.9097 11.2978 16.9097 11.2978 16.9014 11.3386C16.632 12.6264 16.0581 13.8051 15.1544 14.7655C15.1059 14.818 15.0601 14.8704 15.015 14.9256C14.9617 14.9889 14.9113 15.0416 14.8482 15.0945C14.766 15.1644 14.6863 15.2362 14.6073 15.3098C13.6979 16.1264 12.5464 16.6553 11.3551 16.8991C11.3354 16.9032 11.3158 16.9072 11.2955 16.9114C10.8942 16.9876 10.4971 17.0095 10.0893 17.0086C10.009 17.0085 9.92862 17.0092 9.84824 17.0099C9.48253 17.0111 9.13 16.9779 8.76939 16.9179C8.73874 16.9129 8.70808 16.9079 8.6765 16.9028C7.75586 16.7404 6.8097 16.3756 6.05841 15.8147C5.98631 15.763 5.98631 15.763 5.91817 15.7748C5.8992 15.7832 5.88024 15.7916 5.8607 15.8003C5.83948 15.8087 5.81826 15.8171 5.7964 15.8258C5.77589 15.8343 5.75537 15.8428 5.73424 15.8515C5.38592 15.9618 5.05891 15.9136 4.7301 15.7627C4.44122 15.6055 4.25863 15.3645 4.1483 15.0586C4.1416 15.0404 4.1349 15.0222 4.128 15.0035C4.03573 14.7026 4.10215 14.4168 4.20299 14.1289C4.22303 14.0755 4.22303 14.0755 4.23033 14.0195C4.19069 13.9503 4.14978 13.8878 4.10386 13.823C3.60249 13.0789 3.28265 12.2366 3.1024 11.3603C3.09827 11.3404 3.09413 11.3204 3.08987 11.2998C3.00701 10.8707 2.98966 10.4462 2.99132 10.0102C2.99137 9.98239 2.99143 9.95455 2.99149 9.92586C2.99285 9.52604 3.00121 9.13506 3.08189 8.74216C3.08732 8.71448 3.09276 8.68679 3.09835 8.65826C3.36021 7.3488 3.96981 6.13293 4.9029 5.17381C4.95568 5.11738 5.00246 5.05643 5.05064 4.99607C5.08222 4.96604 5.11469 4.93694 5.14805 4.90891C5.21122 4.85522 5.27303 4.80121 5.33316 4.7441C6.22043 3.90317 7.39823 3.3692 8.58311 3.11619C8.6084 3.11075 8.63369 3.10531 8.65974 3.09971C9.1029 3.0097 9.53858 2.98971 9.98961 2.99143ZM8.19517 4.09373C8.17372 4.1003 8.15226 4.10688 8.13015 4.11366C6.58144 4.59822 5.29952 5.70907 4.53111 7.12888C4.5208 7.14794 4.51048 7.16699 4.49986 7.18663C4.20235 7.74823 3.9953 8.38732 3.9022 9.0156C3.89747 9.04424 3.89275 9.07288 3.88787 9.10239C3.84265 9.39866 3.83773 9.69055 3.83897 9.98972C3.83903 10.0152 3.83909 10.0407 3.83915 10.0669C3.84051 10.4336 3.85088 10.789 3.92955 11.1484C3.93484 11.1744 3.94012 11.2003 3.94557 11.2271C4.11266 12.0393 4.43236 12.7793 4.88658 13.4726C4.91873 13.4681 4.95087 13.4636 4.98399 13.459C5.10022 13.4465 5.21576 13.4409 5.33262 13.4385C5.36467 13.4377 5.39671 13.437 5.42972 13.4363C5.50104 13.4372 5.54705 13.447 5.61403 13.4739C5.70418 13.5084 5.77413 13.5262 5.87095 13.5273C6.00303 13.4581 6.09905 13.3547 6.20163 13.2487C6.23346 13.2174 6.26539 13.1861 6.29739 13.1549C6.38504 13.069 6.47137 12.9818 6.55752 12.8944C6.65067 12.8003 6.74499 12.7074 6.83916 12.6144C7.02344 12.4319 7.20658 12.2484 7.38935 12.0644C7.53789 11.915 7.68682 11.7659 7.83605 11.6171C7.85728 11.5959 7.87851 11.5748 7.90038 11.553C7.9435 11.51 7.98663 11.467 8.02975 11.424C8.43422 11.0207 8.83742 10.6162 9.2402 10.2112C9.58593 9.8636 9.93272 9.51713 10.2803 9.17143C10.6838 8.7701 11.0867 8.36812 11.4885 7.96506C11.5313 7.9221 11.5742 7.87913 11.617 7.83616C11.6381 7.81502 11.6592 7.79388 11.6809 7.7721C11.8295 7.62308 11.9787 7.47454 12.128 7.32618C12.3099 7.14539 12.4911 6.96388 12.6714 6.78143C12.7634 6.68832 12.8558 6.59558 12.949 6.50369C13.0343 6.41958 13.1187 6.33458 13.2023 6.24877C13.2327 6.21788 13.2635 6.18733 13.2947 6.15717C13.3856 6.06895 13.4678 5.98437 13.5272 5.87107C13.5258 5.74906 13.4902 5.65492 13.4452 5.54295C13.4352 5.47086 13.4367 5.40606 13.4383 5.33274C13.439 5.29848 13.4397 5.26422 13.4405 5.22892C13.4461 5.11365 13.4565 5.00096 13.4725 4.8867C11.8751 3.89293 10.0191 3.52913 8.19517 4.09373ZM14.3475 5.0781C14.2651 5.19654 14.2502 5.29085 14.2655 5.43357C14.3132 5.56159 14.3713 5.63079 14.4842 5.70701C14.5955 5.74408 14.6957 5.75584 14.8088 5.71662C14.9168 5.66229 14.9881 5.5967 15.0422 5.48804C15.0842 5.34714 15.0487 5.22395 14.9867 5.09519C14.8895 4.98774 14.7911 4.95172 14.65 4.92771C14.5285 4.94754 14.4414 4.99938 14.3475 5.0781ZM13.9276 6.61955C13.8837 6.66279 13.8409 6.70696 13.7981 6.75122C13.7663 6.78258 13.7343 6.81386 13.7023 6.84505C13.6147 6.93099 13.5284 7.01816 13.4422 7.10558C13.3491 7.19966 13.2547 7.29255 13.1606 7.38559C12.9763 7.56804 12.7931 7.75158 12.6104 7.93554C12.4618 8.085 12.3129 8.23406 12.1637 8.38284C12.1424 8.40401 12.1212 8.42517 12.0993 8.44698C12.0562 8.48997 12.0131 8.53296 11.97 8.57596C11.5655 8.97926 11.1623 9.3838 10.7595 9.78879C10.4138 10.1363 10.067 10.4828 9.71941 10.8285C9.31588 11.2298 8.91303 11.6318 8.51124 12.0349C8.4684 12.0779 8.42556 12.1208 8.38273 12.1638C8.35111 12.1955 8.35111 12.1955 8.31885 12.2279C8.17019 12.3769 8.02105 12.5254 7.87172 12.6738C7.68978 12.8546 7.50859 13.0361 7.32832 13.2185C7.23629 13.3116 7.14397 13.4044 7.05073 13.4963C6.96539 13.5804 6.88106 13.6654 6.79744 13.7512C6.76701 13.7821 6.73622 13.8126 6.70506 13.8428C6.61417 13.931 6.5319 14.0156 6.47252 14.1289C6.47395 14.2509 6.50955 14.345 6.55455 14.457C6.56455 14.5291 6.563 14.5939 6.56138 14.6672C6.56068 14.7015 6.55997 14.7357 6.55925 14.771C6.55361 14.8863 6.54324 14.999 6.5272 15.1133C8.02163 16.043 9.6947 16.4057 11.4265 16.0121C11.5539 15.9811 11.6794 15.945 11.8045 15.9062C11.826 15.8996 11.8475 15.8931 11.8696 15.8863C13.4183 15.4017 14.7002 14.2909 15.4686 12.8711C15.4841 12.8425 15.4841 12.8425 15.4999 12.8133C15.7974 12.2517 16.0044 11.6126 16.0975 10.9844C16.1046 10.9414 16.1046 10.9414 16.1118 10.8976C16.1571 10.6013 16.162 10.3094 16.1607 10.0102C16.1607 9.98476 16.1606 9.95929 16.1606 9.93305C16.1592 9.56631 16.1488 9.21096 16.0702 8.85154C16.0649 8.82558 16.0596 8.79962 16.0542 8.77287C15.8868 7.95926 15.568 7.22023 15.1131 6.52732C15.0977 6.52922 15.0823 6.53111 15.0663 6.53306C14.933 6.54876 14.8015 6.55974 14.6671 6.5615C14.6351 6.56221 14.603 6.56291 14.57 6.56364C14.4987 6.56274 14.4527 6.55297 14.3857 6.52605C14.1822 6.44809 14.0864 6.47094 13.9276 6.61955ZM5.01337 14.4162C4.9377 14.528 4.92928 14.6222 4.95216 14.7538C4.97813 14.8464 5.01351 14.9053 5.07799 14.9765C5.19778 15.0431 5.29695 15.0809 5.43345 15.0586C5.55067 15.0062 5.63325 14.9491 5.70689 14.8432C5.74972 14.7094 5.75097 14.6113 5.70177 14.4792C5.6306 14.3688 5.55811 14.3072 5.43345 14.2656C5.25708 14.2486 5.13252 14.2844 5.01337 14.4162Z'
                    fill='#8A8A8A'
                />
            </G>
            <Defs>
                <ClipPath id='clip0_3413_9585'>
                    <Rect
                        width='14'
                        height='14'
                        fill='white'
                        transform='translate(3 3)'
                    />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

const WeightIcon = () => {
    return (
        <Svg
            width='12'
            height='12'
            viewBox='0 0 20 20'
            fill='none'
        >
            <G clip-path='url(#clip0_3413_9591)'>
                <Path
                    d='M8.02789 2.98852C8.07551 2.98832 8.12313 2.98809 8.17075 2.98782C8.29889 2.98722 8.42703 2.98713 8.55517 2.98719C8.66278 2.98719 8.77039 2.98695 8.87801 2.98673C9.1323 2.9862 9.38658 2.98612 9.64087 2.98631C9.90168 2.98649 10.1625 2.98586 10.4233 2.98485C10.6485 2.98401 10.8738 2.9837 11.099 2.98381C11.2329 2.98386 11.3669 2.98372 11.5008 2.98304C12.5398 2.9782 13.3604 3.10204 14.1438 3.85279C14.6864 4.40912 14.961 5.15543 14.957 5.927C14.9367 6.78994 14.514 7.4496 14.0436 8.14191C14.0245 8.17029 14.0055 8.19866 13.9858 8.22789C13.9481 8.28413 13.9099 8.34013 13.8714 8.39586C13.8457 8.43432 13.8457 8.43432 13.8195 8.47356C13.8039 8.49638 13.7884 8.5192 13.7723 8.5427C13.738 8.60436 13.738 8.60436 13.7655 8.6654C13.8065 8.72363 13.852 8.76755 13.9046 8.81568C14.6343 9.53251 15.1019 10.5605 15.2769 11.5586C15.2817 11.5854 15.2866 11.6122 15.2915 11.6397C15.3367 11.9171 15.3425 12.1907 15.3418 12.4712C15.3418 12.5073 15.3418 12.5073 15.3418 12.5441C15.3407 12.9354 15.3156 13.31 15.2222 13.6914C15.2164 13.7159 15.2105 13.7404 15.2045 13.7657C14.9166 14.9367 14.216 16.0644 13.2244 16.7685C13.1702 16.8079 13.1702 16.8079 13.1216 16.8566C12.8911 17.0569 12.6293 17.0276 12.3409 17.0261C12.2844 17.0265 12.2278 17.0269 12.1713 17.0275C12.0183 17.0287 11.8653 17.0287 11.7123 17.0284C11.5843 17.0283 11.4563 17.0287 11.3283 17.0291C11.0261 17.0301 10.7239 17.0301 10.4217 17.0295C10.1106 17.0288 9.79962 17.0299 9.48856 17.0318C9.2209 17.0334 8.95324 17.0339 8.68557 17.0335C8.52597 17.0333 8.3664 17.0335 8.2068 17.0348C8.05658 17.0359 7.90643 17.0357 7.75622 17.0344C7.70135 17.0342 7.64648 17.0344 7.59161 17.0352C7.21567 17.0399 6.99905 16.9799 6.71831 16.7266C6.68226 16.6977 6.6461 16.669 6.60968 16.6406C6.58134 16.6165 6.55317 16.5922 6.5252 16.5676C6.50964 16.5541 6.49409 16.5406 6.47806 16.5266C6.17921 16.2633 5.91373 15.9824 5.67925 15.6602C5.66795 15.6448 5.65665 15.6293 5.64502 15.6135C5.17139 14.9591 4.86541 14.2109 4.72222 13.418C4.71715 13.3901 4.71207 13.3622 4.70685 13.3335C4.66181 13.0573 4.65663 12.7845 4.65728 12.5054C4.65729 12.4813 4.65731 12.4572 4.65732 12.4324C4.65843 12.0411 4.68357 11.6666 4.7769 11.2852C4.78276 11.2607 4.78862 11.2361 4.79466 11.2109C5.03165 10.2467 5.53423 9.34743 6.25347 8.66016C6.20675 8.51857 6.12332 8.40223 6.04155 8.27906C6.00938 8.22997 5.97723 8.18088 5.9451 8.13177C5.92005 8.09357 5.92005 8.09357 5.89449 8.05461C5.33058 7.19469 4.89088 6.37342 5.09002 5.3084C5.24569 4.57851 5.66649 3.89334 6.2963 3.4797C6.31826 3.46577 6.34022 3.45185 6.36284 3.43751C6.38283 3.42387 6.40281 3.41022 6.4234 3.39617C6.56611 3.30323 6.71631 3.23586 6.87383 3.17261C6.90227 3.1609 6.90227 3.1609 6.93129 3.14895C7.29021 3.01039 7.64832 2.98775 8.02789 2.98852ZM6.38709 4.53756C6.15708 4.80419 5.99344 5.14311 5.92534 5.48829C5.91914 5.51818 5.91294 5.54807 5.90654 5.57886C5.83435 6.43076 6.23158 7.01155 6.67612 7.69117C6.78582 7.8591 6.89395 8.02803 7.002 8.19703C7.01988 8.22498 7.03776 8.25293 7.05618 8.28174C7.17165 8.46242 7.28685 8.64328 7.4019 8.82422C7.38515 8.83217 7.3684 8.84011 7.35114 8.84829C7.27714 8.88695 7.2239 8.93674 7.16265 8.99341C7.08018 9.06926 6.99733 9.14367 6.91143 9.21558C6.27307 9.77559 5.83825 10.5803 5.62456 11.3945C5.61877 11.4162 5.61298 11.4379 5.60702 11.4603C5.3258 12.5664 5.54155 13.8099 6.11675 14.7852C6.30669 15.0902 6.53237 15.3667 6.773 15.6328C6.78939 15.6512 6.80578 15.6695 6.82267 15.6885C6.98204 15.8574 7.28775 16.168 7.51871 16.1871C7.55649 16.1877 7.59428 16.1879 7.63206 16.1879C7.65289 16.1881 7.67372 16.1884 7.69519 16.1886C7.76521 16.1893 7.83522 16.1895 7.90525 16.1898C7.95537 16.1902 8.0055 16.1906 8.05562 16.191C8.22049 16.1923 8.38536 16.193 8.55024 16.1937C8.60703 16.1939 8.66383 16.1942 8.72063 16.1945C8.957 16.1955 9.19337 16.1964 9.42975 16.1969C9.76819 16.1977 10.1066 16.1992 10.445 16.202C10.6831 16.2039 10.9212 16.2048 11.1593 16.2051C11.3015 16.2052 11.4436 16.2058 11.5857 16.2074C11.7196 16.2088 11.8534 16.2091 11.9873 16.2085C12.0362 16.2085 12.0852 16.2089 12.1341 16.2098C12.4692 16.2153 12.6522 16.1695 12.898 15.9336C12.9316 15.9047 12.9653 15.876 12.9991 15.8474C13.0266 15.8222 13.0538 15.7968 13.0809 15.7712C13.0957 15.7573 13.1105 15.7434 13.1258 15.729C13.7422 15.1431 14.1519 14.3997 14.3746 13.582C14.3843 13.5466 14.3843 13.5466 14.3942 13.5105C14.6691 12.4543 14.4719 11.2408 13.9371 10.3008C13.9196 10.2701 13.9022 10.2393 13.8843 10.2076C13.6015 9.73057 13.2332 9.32362 12.816 8.96094C12.7896 8.93757 12.7896 8.93757 12.7627 8.91373C12.6904 8.84464 12.6904 8.84464 12.5972 8.82422C12.799 8.50665 13.0011 8.18929 13.2039 7.87232C13.2223 7.84351 13.2407 7.81471 13.2597 7.78503C13.3538 7.63806 13.4484 7.49149 13.544 7.3455C13.6027 7.25548 13.6607 7.165 13.7183 7.07422C13.7287 7.05788 13.7392 7.04153 13.7499 7.02469C14.0684 6.51931 14.1806 5.96398 14.0491 5.37517C13.9606 5.0442 13.8041 4.7634 13.5816 4.50391C13.5648 4.48407 13.548 4.46422 13.5307 4.44378C13.1544 4.03446 12.6191 3.85499 12.0777 3.82032C11.9414 3.81649 11.8052 3.81629 11.669 3.81635C11.6287 3.81626 11.5884 3.81617 11.5481 3.81607C11.4395 3.81583 11.3309 3.81576 11.2223 3.81575C11.1542 3.81573 11.0861 3.81567 11.0181 3.81559C10.7798 3.81534 10.5415 3.81523 10.3033 3.81525C10.0823 3.81527 9.8614 3.81498 9.64045 3.81455C9.44981 3.81419 9.25918 3.81404 9.06853 3.81406C8.9551 3.81407 8.84166 3.81399 8.72822 3.8137C8.62136 3.81343 8.51451 3.81344 8.40765 3.81363C8.36881 3.81366 8.32997 3.8136 8.29113 3.81343C7.53913 3.8104 6.91968 3.97544 6.38709 4.53756Z'
                    fill='#8A8A8A'
                />
                <Path
                    d='M8.13443 4.62651C8.17974 4.62636 8.22505 4.62617 8.27037 4.62593C8.39251 4.62543 8.51465 4.62562 8.63679 4.62597C8.76517 4.62625 8.89354 4.62599 9.02192 4.62582C9.23742 4.62562 9.45292 4.62588 9.66843 4.6264C9.91689 4.627 10.1653 4.6268 10.4138 4.6262C10.6279 4.6257 10.8419 4.62564 11.056 4.62592C11.1835 4.62609 11.311 4.62612 11.4386 4.62575C11.5585 4.62544 11.6785 4.62566 11.7984 4.62629C11.8422 4.62643 11.886 4.62639 11.9297 4.62615C12.3298 4.62414 12.6462 4.69682 12.953 4.96879C13.2146 5.2448 13.3248 5.58928 13.3165 5.96331C13.2797 6.41853 12.9816 6.7902 12.7337 7.15735C12.6144 7.33432 12.5005 7.51464 12.3863 7.69487C12.2394 7.92646 12.0907 8.15682 11.9413 8.38675C11.7819 8.37077 11.6463 8.32518 11.497 8.26884C10.4201 7.87656 9.28539 7.95261 8.22896 8.36764C8.16786 8.38675 8.16786 8.38675 8.05849 8.38675C8.01068 8.33138 8.01068 8.33138 7.96268 8.25356C7.94484 8.22512 7.927 8.19667 7.90863 8.16736C7.88984 8.13656 7.87105 8.10575 7.8517 8.07401C7.83194 8.04226 7.81215 8.01054 7.79231 7.97884C7.75287 7.91575 7.71361 7.85255 7.67448 7.78926C7.60793 7.68215 7.53956 7.57632 7.47059 7.47074C7.44715 7.43454 7.42372 7.39833 7.40031 7.36211C7.35599 7.29357 7.3116 7.22507 7.26715 7.15662C7.20836 7.06602 7.14977 6.9753 7.0912 6.88456C7.07264 6.85604 7.05408 6.82753 7.03496 6.79815C6.78345 6.40752 6.61607 6.06012 6.7101 5.58466C6.76444 5.39129 6.84281 5.23693 6.96474 5.07816C6.98842 5.04263 6.98842 5.04263 7.01259 5.00638C7.32442 4.67722 7.70335 4.62411 8.13443 4.62651ZM7.67407 5.55422C7.58573 5.66008 7.54563 5.74779 7.52849 5.88469C7.55855 6.08134 7.69972 6.25739 7.80726 6.41971C7.83867 6.46749 7.87008 6.51527 7.90147 6.56305C7.91798 6.58811 7.93448 6.61316 7.95149 6.63897C8.00688 6.72348 8.06168 6.80835 8.11638 6.89332C8.13492 6.92204 8.15347 6.95077 8.17258 6.98036C8.20892 7.03665 8.24517 7.093 8.28133 7.1494C8.30611 7.18765 8.30611 7.18765 8.33139 7.22667C8.35334 7.26076 8.35334 7.26076 8.37574 7.29553C8.41034 7.35109 8.41034 7.35109 8.46864 7.37504C8.52648 7.36689 8.52648 7.36689 8.59212 7.34972C8.61735 7.34371 8.64259 7.3377 8.66859 7.33151C8.6951 7.32501 8.72161 7.3185 8.74891 7.3118C9.16193 7.21057 9.55898 7.17252 9.9828 7.17338C10.0068 7.17336 10.0308 7.17335 10.0555 7.17334C10.4472 7.17393 10.8204 7.20508 11.203 7.293C11.2425 7.30154 11.282 7.31006 11.3215 7.31853C11.4009 7.3362 11.4796 7.35511 11.5585 7.37504C11.7214 7.14684 11.8729 6.91225 12.023 6.67553C12.1875 6.41659 12.1875 6.41659 12.2695 6.29709C12.4341 6.06439 12.4341 6.06439 12.4608 5.7891C12.4146 5.64775 12.3364 5.57181 12.2147 5.48832C12.1014 5.46289 11.9926 5.4575 11.8767 5.45732C11.8423 5.4572 11.8079 5.45708 11.7724 5.45696C11.7346 5.45697 11.6968 5.45699 11.659 5.457C11.6189 5.45692 11.5789 5.45683 11.5388 5.45672C11.4302 5.45648 11.3216 5.45642 11.213 5.4564C11.1451 5.45638 11.0772 5.45632 11.0093 5.45625C10.7722 5.456 10.5351 5.45589 10.2979 5.45591C10.0772 5.45592 9.85651 5.45563 9.6358 5.4552C9.44602 5.45484 9.25625 5.4547 9.06648 5.45472C8.95326 5.45472 8.84004 5.45465 8.72682 5.45436C8.6203 5.45409 8.51378 5.45409 8.40726 5.45429C8.36829 5.45432 8.32931 5.45425 8.29034 5.45409C7.96822 5.4429 7.96822 5.4429 7.67407 5.55422Z'
                    fill='#8A8A8A'
                />
            </G>
            <Defs>
                <ClipPath id='clip0_3413_9591'>
                    <Rect
                        width='14'
                        height='14'
                        fill='white'
                        transform='translate(3 3)'
                    />
                </ClipPath>
            </Defs>
        </Svg>
    )
}
