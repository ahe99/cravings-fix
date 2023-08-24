import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
  QueryFunction,
} from '@tanstack/react-query'

import { API } from '@/API'
import { Product } from '@/models/Product'
import { Category } from '@/models/Category'

import { useAPI } from './useAPI'
import { Override } from '@/helpers/types'

export interface APIRequestCreateProduct {
  name: string
  description?: string
  stockQuantity?: number
  price: number
  category?: Category
}
export interface APIRequestEditProduct {
  _id: string
  name?: string
  description?: string
  stockQuantity?: number
  price?: number
  category?: Category
}

export const useProducts = () => {
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
  })

  const postProductData: MutationFunction<
    unknown,
    APIRequestCreateProduct
  > = async (data) => {
    const { data: response } = await request<
      unknown,
      Override<APIRequestCreateProduct, { category?: Category['_id'] }>,
      unknown
    >('post', apiRoute.create, {
      data: { ...data, category: data.category?._id },
    })
    return response
  }
  const createProductQuery = useMutation({
    mutationKey: ['create product'],
    mutationFn: postProductData,
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
    },
  })

  const putProductData: MutationFunction<
    unknown,
    APIRequestEditProduct
  > = async (data) => {
    const { data: response } = await request<
      unknown,
      Override<APIRequestEditProduct, { category?: Category['_id'] }>,
      unknown
    >('put', apiRoute.update(data._id), {
      data: { ...data, category: data.category?._id },
    })
    return response
  }

  const updateProductQuery = useMutation({
    mutationKey: ['update product'],
    mutationFn: putProductData,
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
    },
  })

  const deleteProduct: MutationFunction<unknown, Product['_id']> = async (
    productId,
  ) => {
    const { data: response } = await request<unknown>(
      'delete',
      apiRoute.delete(productId),
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
    create: createProductQuery,
    update: updateProductQuery,
    delete: deleteProductQuery,
  }
}
