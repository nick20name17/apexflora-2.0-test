import React, {
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    createContext,
    useContext,
    useState
} from 'react'

import type { AdminOrderItem } from '@/api/order-items/order-items.types'

// Define the type for the context value
interface ProductStatusContextType {
    productStatus: string
    setProductStatus: Dispatch<SetStateAction<string>>
    orderItems: AdminOrderItem[]
    setOrderItems: Dispatch<SetStateAction<AdminOrderItem[]>>
}

const ProductStatusContext = createContext<ProductStatusContextType | undefined>(
    undefined
)

interface ProductStatusProviderProps {
    children: ReactNode
}

export const ProductStatusProvider: React.FC<ProductStatusProviderProps> = ({
    children
}) => {
    const [productStatus, setProductStatus] = useState('2')

    const [orderItems, setOrderItems] = useState<AdminOrderItem[]>([])

    return (
        <ProductStatusContext.Provider
            value={{ productStatus, setProductStatus, orderItems, setOrderItems }}
        >
            {children}
        </ProductStatusContext.Provider>
    )
}

export const useProductStatus = (): ProductStatusContextType => {
    const context = useContext(ProductStatusContext)
    if (!context) {
        throw new Error('useProductStatus must be used within a ProductStatusProvider')
    }
    return context
}
