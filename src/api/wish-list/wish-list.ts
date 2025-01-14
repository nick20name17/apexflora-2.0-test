import { api } from '../api'

import type { WishListPayload } from './wish-list.types'

export const postWishList = async (data: WishListPayload) => {
    const res = await api.post('/wish-list/', data)

    return res.data
}

export const deleteFromWishList = async (id: number) => {
    const res = await api.delete(`/wish-list/${id}/delete/`)

    return res.data
}
