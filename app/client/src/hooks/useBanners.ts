import { useQuery, QueryFunction } from '@tanstack/react-query'

import { useAPI } from './useAPI'

import { API } from '@/API'
import { Banner } from '@/models/Banner'

/**
 * @description fill the type after the type is defined
 */
export const useBanners = (initialData: Banner[] = []) => {
  const { request } = useAPI()

  const apiRoute = API.routes.banners

  const getBannersData: QueryFunction<Banner[]> = async () => {
    const { data } = await request<Banner[], never, never>('get', apiRoute.list)

    return data
  }
  const bannersDataQuery = useQuery({
    queryKey: ['banners'],
    queryFn: getBannersData,
    initialData,
  })

  return {
    query: bannersDataQuery,
  }
}
