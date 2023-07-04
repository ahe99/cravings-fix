import axios, { AxiosResponse } from 'axios'

import { API } from '@/utils/API'
// import { useToken } from './useToken'

type RequestMethods = 'get' | 'post' | 'put' | 'delete'

export const useAPI = () => {
  // const tokenStore = useToken()
  const tokenStore = { token: 'mock token' }

  const client = axios.create({
    baseURL: API.baseURL,
    headers: {
      'Access-Control-Allow-Origin': API.baseURL,
      'Authorization': tokenStore.token,
      'Content-Type': 'application/json',
    },
  })
  client.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  )
  client.interceptors.request.use(
    (config) => config,
    (error) => error,
  )

  // maybe we can specify RequestData/ RequestParams
  interface RequestConfig<RequestData, RequestParams> {
    data?: RequestData
    params?: RequestParams
  }

  const request = <
    RequestResponse = unknown,
    RequestData = object,
    RequestParams = object,
  >(
    method: RequestMethods,
    url: string,
    { data, params }: RequestConfig<RequestData, RequestParams> = {},
  ) => {
    if (method === 'post' || method === 'put') {
      return client[method]<
        RequestResponse,
        AxiosResponse<RequestResponse>,
        RequestData
      >(url, data, { params })
    } else {
      return client[method]<
        RequestResponse,
        AxiosResponse<RequestResponse>,
        RequestData
      >(url, { data, params })
    }
  }

  return {
    /** @description use this when 'request' can't fit */
    client,
    request,
  }
}
