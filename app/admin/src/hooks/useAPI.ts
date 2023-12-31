import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { API } from '@/API'
import { useToken } from './useToken'

type RequestMethods = 'get' | 'post' | 'put' | 'delete'

export const useAPI = () => {
  const tokenStore = useToken()

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
  interface RequestConfig<RequestData, RequestParams>
    extends AxiosRequestConfig {
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
    { data, params, ...rest }: RequestConfig<RequestData, RequestParams> = {},
  ) => {
    if (method === 'post' || method === 'put') {
      return client[method]<
        RequestResponse,
        AxiosResponse<RequestResponse>,
        RequestData
      >(url, data, { params, ...rest })
    } else {
      return client[method]<
        RequestResponse,
        AxiosResponse<RequestResponse>,
        RequestData
      >(url, { data, params, ...rest })
    }
  }

  return {
    /** @description use this when 'request' can't fit */
    client,
    request,
  }
}
