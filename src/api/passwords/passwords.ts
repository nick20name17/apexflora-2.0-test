// export const passwords = api.injectEndpoints({
//     endpoints: (build) => ({
//         passwordReset: build.mutation<void, PasswordReset>({
//             query: (userData) => ({
//                 url: 'users/password-reset/',
//                 method: 'POST',
//                 body: userData
//             })
//         }),
//         passwordResetConfirm: build.mutation<void, PasswordResetConfirmData>({
//             query: (data) => ({
//                 url: `users/password-reset-confirm/${data.uidb64}/${data.token}/`,
//                 method: 'POST',
//                 body: data
//             })
//         }),
//         passwordChange: build.mutation<void, PasswordChange>({
//             query: ({ data, id }) => ({
//                 url: `users/${id}/password-change/`,
//                 method: 'POST',
//                 body: data
//             })
//         })
//     })
// })
import { api, publicApi } from '../api'

import type {
    PasswordChangePayload,
    PasswordResetConfirmPayload,
    PasswordResetPayload
} from './passwords.types'

export const passwordReset = async (data: PasswordResetPayload) => {
    const res = await publicApi.post('/users/password-reset/', data)

    return res.data
}

export const passwordResetConfirm = async (data: PasswordResetConfirmPayload) => {
    const res = await publicApi.post(
        `/users/password-reset-confirm/${data.uidb64}/${data.token}/`,
        data
    )

    return res.data
}

export const passwordChange = async (id: number, data: PasswordChangePayload) => {
    const res = await api.post(`users/${id}/password-change/`, data)

    return res.data
}
