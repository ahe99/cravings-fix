import { useQuery, QueryFunction } from '@tanstack/react-query'

import { API } from '@/utils/API'
import { Banner } from '@/utils/Banner'

import { useAPI } from './useAPI'

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
