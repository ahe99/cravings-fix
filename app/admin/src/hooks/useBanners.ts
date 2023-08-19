import {
  useQuery,
  QueryFunction,
  useQueryClient,
  MutationFunction,
  useMutation,
} from '@tanstack/react-query'

import { API } from '@/API'
import { Banner } from '@/models/Banner'

import { useAPI } from './useAPI'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface APIRequestCreateBanner extends FormData {}

export const useBanners = (initialData: Banner[] = []) => {
  const queryClient = useQueryClient()
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

  const postBannerData: MutationFunction<
    unknown,
    APIRequestCreateBanner
  > = async (formData) => {
    const { data: response } = await request<
      unknown,
      APIRequestCreateBanner,
      never
    >('post', apiRoute.create, {
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response
  }

  const createBannerQuery = useMutation({
    mutationKey: ['create banner'],
    mutationFn: postBannerData,
    onSuccess: () => {
      queryClient.invalidateQueries(['banners'])
    },
  })

  const deleteBanner: MutationFunction<unknown, Banner['imageId']> = async (
    bannerId,
  ) => {
    const { data: response } = await request<unknown>(
      'delete',
      apiRoute.delete(bannerId),
    )

    return response
  }
  const deleteBannerQuery = useMutation({
    mutationKey: ['delete banner'],
    mutationFn: deleteBanner,
    onSuccess: () => {
      queryClient.invalidateQueries(['banners'])
    },
  })

  return {
    query: bannersDataQuery,
    create: createBannerQuery,
    delete: deleteBannerQuery,
  }
}
