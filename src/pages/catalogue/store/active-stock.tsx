import { create } from 'zustand'

interface ActiveStockIdState {
    activeStockId: number | null
    setActiveStockId: (activeStockId: number | null) => void
}

export const useActiveStockId = create<ActiveStockIdState>((set) => ({
    activeStockId: null,
    setActiveStockId: (activeStockId: ActiveStockIdState['activeStockId']) => {
        set({ activeStockId })
    }
}))
