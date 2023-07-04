const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

/**
 * @description this is for SSR
 */
export const SERVER = {
  request: <TResponse = unknown>(
    route: string,
    config?: RequestInit,
  ): Promise<TResponse> =>
    fetch(`${API_BASE_URL}${route}`, {
      ...config,
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => data as TResponse),
}

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
      list: '/foods',
      data: (param: string | number) => `/foods/${param ?? ''}`,
      create: '/foods',
      update: (param: string | number) => `/foods/${param ?? ''}`,
      delete: (param: string | number) => `/foods/${param ?? ''}`,
    },
    categories: {
      list: '/categories',
      data: (param: string | number) => `/categories/${param ?? ''}`,
      create: '/categories',
      update: (param: string | number) => `/categories/${param ?? ''}`,
      delete: (param: string | number) => `/categories/${param ?? ''}`,
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
