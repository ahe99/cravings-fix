import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
  QueryFunction,
} from '@tanstack/react-query'

import { useAPI } from './useAPI'

import { API } from '@/utils/API'
import { Category } from '@/utils/Category'

/**
 * @description fill the type after the type is defined
 */

export const useCategories = (prefetchCategories: Category[]) => {
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
    initialData: prefetchCategories,
  })

  const putCategoryData: MutationFunction<
    unknown,
    { data: unknown; categoryId: string | number }
  > = async ({ data, categoryId }) => {
    const { data: response } = await request<unknown, unknown, unknown>(
      'put',
      apiRoute.update(categoryId),
      {
        params: { id: categoryId },
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

  const deleteCategory: MutationFunction<
    unknown,
    { categoryId: string | number }
  > = async ({ categoryId }) => {
    const { data: response } = await request<unknown>(
      'delete',
      apiRoute.delete(categoryId),
      {
        params: { id: categoryId },
      },
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
    update: updateCategoryQuery,
    delete: deleteCategoryQuery,
  }
}
