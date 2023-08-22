import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
  QueryFunction,
} from '@tanstack/react-query'

import { useAPI } from './useAPI'

import { API } from '@/API'
import { News, Policy } from '@/models/News'

export interface APIRequestCreateNews {
  title: string
  description?: string
  content?: string
  policy: Policy
}
export interface APIRequestEditNews {
  _id: string
  title?: string
  description?: string
  content?: string
  policy?: Policy
}

export const useNews = () => {
  const queryClient = useQueryClient()

  const { request } = useAPI()

  const apiRoute = API.routes.news

  const getNewsData: QueryFunction<News[]> = async () => {
    const { data } = await request<News[], never, never>('get', apiRoute.list)
    return data
  }
  const newsDataQuery = useQuery({
    queryKey: ['news'],
    queryFn: getNewsData,
  })

  const postNewsData: MutationFunction<unknown, APIRequestCreateNews> = async (
    data,
  ) => {
    const { data: response } = await request<
      unknown,
      APIRequestCreateNews,
      never
    >('post', apiRoute.create, {
      data,
    })
    return response
  }

  const createNewsQuery = useMutation({
    mutationKey: ['create news'],
    mutationFn: postNewsData,
    onSuccess: () => {
      queryClient.invalidateQueries(['news'])
    },
  })

  const putNewsData: MutationFunction<unknown, APIRequestEditNews> = async (
    data,
  ) => {
    const { data: response } = await request<unknown, unknown, unknown>(
      'put',
      apiRoute.update(data._id),
      {
        data,
      },
    )
    return response
  }
  const updateNewsQuery = useMutation({
    mutationKey: ['update news'],
    mutationFn: putNewsData,
    onSuccess: () => {
      queryClient.invalidateQueries(['news'])
    },
  })

  const deleteNews: MutationFunction<unknown, News['_id']> = async (newsId) => {
    const { data: response } = await request<unknown>(
      'delete',
      apiRoute.delete(newsId),
    )

    return response
  }
  const deleteNewsQuery = useMutation({
    mutationKey: ['delete news'],
    mutationFn: deleteNews,
    onSuccess: () => {
      queryClient.invalidateQueries(['news'])
    },
  })

  return {
    query: newsDataQuery,
    create: createNewsQuery,
    update: updateNewsQuery,
    delete: deleteNewsQuery,
  }
}
