import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
  QueryFunction,
} from '@tanstack/react-query'

import { useAPI } from './useAPI'

import { API } from '@/API'
import { News } from '@/models/News'

export const useNews = (prefetchNews: News[]) => {
  const { request } = useAPI()

  const apiRoute = API.routes.news

  const getNewsData: QueryFunction<News[]> = async () => {
    const { data } = await request<News[], never, never>('get', apiRoute.list)
    return data
  }
  const newsDataQuery = useQuery({
    queryKey: ['news'],
    queryFn: getNewsData,
    initialData: prefetchNews,
  })

  return {
    query: newsDataQuery,
  }
}
