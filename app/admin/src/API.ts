const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const API = {
  baseURL: API_BASE_URL,

  routes: {
    users: {
      data: (param: string | number) => `/users/${param ?? ''}`,
      create: '/users/register',
      update: (param: string | number) => `/users/${param ?? ''}`,
      delete: (param: string | number) => `/users/${param ?? ''}`,
      current: '/users/me',
      list: '/users',
      login: '/users/login',
    },
    products: {
      list: '/foods',
      data: (param: string | number) => `/foods/${param ?? ''}`,
      create: '/foods',
      update: (param: string | number) => `/foods/${param ?? ''}`,
      delete: (param: string | number) => `/foods/${param ?? ''}`,
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
      update: (param: string | number) => `/orders/price/${param}`,
      delete: (param: string | number) => `/orders/${param}`,
      create: '/orders',
    },
    categories: {
      list: '/categories',
      data: (param: string | number) => `/categories/${param ?? ''}`,
      update: (param: string | number) => `/categories/${param}`,
      delete: (param: string | number) => `/categories/${param}`,
      create: '/categories',
    },
    news: {
      list: '/news',
      data: (param: string | number) => `/news/${param ?? ''}`,
      update: (param: string | number) => `/news/${param}`,
      delete: (param: string | number) => `/news/${param}`,
      create: '/news',
    },
    banners: {
      list: '/banners',
      create: '/banners',
      delete: (param: string | number) => `/banners/${param}`,
    },
    trending: {
      list: '/trending',
      bestseller: '/trending/bestseller',
    },
  },
  intervals: {},
  requestTimeout: {},
  retries: {},
  staleTimes: {},
}
