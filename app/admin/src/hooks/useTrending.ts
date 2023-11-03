import { useQuery, QueryFunction } from '@tanstack/react-query'

import { API } from '@/API'
import { TrendingProduct, Bestseller } from '@/models/Trending'

import { useAPI } from './useAPI'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface APIRequestCreateTrending extends FormData {}

export const useTrending = () => {
  const { request } = useAPI()

  const apiRoute = API.routes.trending

  const getTrendingData: QueryFunction<TrendingProduct[]> = async () => {
    const { data } = await request<TrendingProduct[], never, never>(
      'get',
      apiRoute.list,
    )

    return data
  }
  const trendingProductsDataQuery = useQuery({
    queryKey: ['trending products'],
    queryFn: getTrendingData,
  })

  const getBestsellerData: QueryFunction<Bestseller> = async () => {
    const { data } = await request<Bestseller, never, never>(
      'get',
      apiRoute.bestseller,
    )

    return data
  }
  const bestsellerDataQuery = useQuery({
    queryKey: ['bestseller'],
    queryFn: getBestsellerData,
  })

  return {
    trendingProductQuery: trendingProductsDataQuery,
    bestsellerDataQuery,
  }
}
