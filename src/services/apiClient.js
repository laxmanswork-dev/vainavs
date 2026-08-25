import axios from 'axios'

/**
 * Shared Axios instance for all API calls (contact form, reservations, etc.
 * once those endpoints exist). Centralizing this means base URL, timeout
 * and error handling only need to be configured once.
 *
 * Set VITE_API_BASE_URL in .env.local to point this at a real backend.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ?? error.message ?? 'Something went wrong. Please try again.'
    return Promise.reject(new Error(message))
  },
)
