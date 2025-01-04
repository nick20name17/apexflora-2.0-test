import axios from 'axios'

import { refresh } from './auth/auth'
import { routes } from '@/config/routes'
import { API_URL } from '@/constants/app'

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    (request) => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            request.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return request
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        const refreshToken = localStorage.getItem('refreshToken')

        if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
            originalRequest._retry = true
            try {
                const response = await refresh({ refresh: refreshToken })
                const { access, refresh: newRefreshToken } = response
                localStorage.setItem('accessToken', access)
                localStorage.setItem('refreshToken', newRefreshToken)
                api.defaults.headers.common['Authorization'] = `Bearer ${access}`
                return api(originalRequest)
            } catch (refreshError) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')
                window.location.href = routes.signIn
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)

export const publicApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})
