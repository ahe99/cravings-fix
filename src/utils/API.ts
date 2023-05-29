const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const API = {
  baseURL: API_BASE_URL,

  routes: {
    user: {
      data: (param: string | number) => `/user/${param ?? ''}`,
      update: (param: string | number) => `/user/${param ?? ''}`,
      delete: (param: string | number) => `/user/${param ?? ''}`,
      list: '/users',
      login: '/login',
      register: '/users',
    },
    products: {
      list: '/products',
      data: (param: string | number) => `/products/${param ?? ''}`,
      create: '/products',
      update: (param: string | number) => `/products/${param ?? ''}`,
      delete: (param: string | number) => `/products/${param ?? ''}`,
    },
    recently: {
      list: '/recently',
      create: '/recently',
      delete: (param: string | number) => `/recently/${param}`,
    },
    cart: {
      list: '/cart',
      create: '/cart',
      update: (param: string | number) => `/cart/${param}`,
      delete: (param: string | number) => `/cart/${param}`,
    },
    orders: {
      list: '/orders',
      data: (param: string | number) => `/orders/${param ?? ''}`,
      create: '/orders',
    },
    banners: {
      list: '/banners',
    },
  },
  intervals: {},
  requestTimeout: {},
  retries: {},
  staleTimes: {},
}
