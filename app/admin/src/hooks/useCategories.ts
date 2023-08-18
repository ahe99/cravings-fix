import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
  QueryFunction,
} from '@tanstack/react-query'

import { useAPI } from './useAPI'

import { API } from '@/API'
import { Category } from '@/models/Category'

export interface APIRequestCreateCategory {
  name: string
  description?: string
}
export interface APIRequestEditCategory {
  _id: string
  name?: string
  description?: string
}

export const useCategories = () => {
  const queryClient = useQueryClient()

  const { request } = useAPI()

  const apiRoute = API.routes.categories

  const getCategoriesData: QueryFunction<Category[]> = async () => {
    const { data } = await request<Category[], never, never>(
      'get',
      apiRoute.list,
    )
    return data
  }
  const categoriesDataQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesData,
  })

  const postCategoryData: MutationFunction<
    unknown,
    APIRequestCreateCategory
  > = async (data) => {
    const { data: response } = await request<
      unknown,
      APIRequestCreateCategory,
      never
    >('post', apiRoute.create, {
      data,
    })
    return response
  }

  const createCategoryQuery = useMutation({
    mutationKey: ['create category'],
    mutationFn: postCategoryData,
    onSuccess: () => {
      queryClient.invalidateQueries(['categories'])
    },
  })

  const putCategoryData: MutationFunction<
    unknown,
    APIRequestEditCategory
  > = async (data) => {
    const { data: response } = await request<unknown, unknown, unknown>(
      'put',
      apiRoute.update(data._id),
      {
        data,
      },
    )
    return response
  }
  const updateCategoryQuery = useMutation({
    mutationKey: ['update category'],
    mutationFn: putCategoryData,
    onSuccess: () => {
      queryClient.invalidateQueries(['categories'])
    },
  })

  const deleteCategory: MutationFunction<unknown, Category['_id']> = async (
    categoryId,
  ) => {
    const { data: response } = await request<unknown>(
      'delete',
      apiRoute.delete(categoryId),
    )

    return response
  }
  const deleteCategoryQuery = useMutation({
    mutationKey: ['delete category'],
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(['categories'])
    },
  })

  return {
    query: categoriesDataQuery,
    create: createCategoryQuery,
    update: updateCategoryQuery,
    delete: deleteCategoryQuery,
  }
}
