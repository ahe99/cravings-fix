import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
  QueryFunction,
} from '@tanstack/react-query'

import { useAPI } from './useAPI'

import { API } from '@/utils/API'
import { Product } from '@/utils/ProductData'

/**
 * @description fill the type after the type is defined
 */

export const useProducts = (prefetchProducts: Product[]) => {
  const queryClient = useQueryClient()

  const { request } = useAPI()

  const apiRoute = API.routes.products

  const getProductsData: QueryFunction<Product[]> = async () => {
    const { data } = await request<Product[], never, never>(
      'get',
      apiRoute.list,
    )

    return data
  }
  const productsDataQuery = useQuery({
    queryKey: ['products'],
    queryFn: getProductsData,
    initialData: prefetchProducts,
  })

  const putProductData: MutationFunction<
    unknown,
    { data: unknown; productId: string | number }
  > = async ({ data, productId }) => {
    const { data: response } = await request<unknown, unknown, unknown>(
      'put',
      apiRoute.update(productId),
      {
        params: { id: productId },
        data,
      },
    )
    return response
  }
  const updateProductQuery = useMutation({
    mutationKey: ['update product'],
    mutationFn: putProductData,
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
    },
  })

  const deleteProduct: MutationFunction<
    unknown,
    { productId: string | number }
  > = async ({ productId }) => {
    const { data: response } = await request<unknown>(
      'delete',
      apiRoute.delete(productId),
      {
        params: { id: productId },
      },
    )

    return response
  }
  const deleteProductQuery = useMutation({
    mutationKey: ['delete product'],
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
    },
  })

  return {
    query: productsDataQuery,
    update: updateProductQuery,
    delete: deleteProductQuery,
  }
}
