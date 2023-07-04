import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
  QueryFunction,
} from '@tanstack/react-query'

import { API } from '@/utils/API'
import { CartProduct } from '@/utils/ProductData'

import { useAPI } from './useAPI'

const MAX_DISPLAY_QUANTITY = 6

export const useCartProducts = (initialData: CartProduct[] = []) => {
  const queryClient = useQueryClient()

  const { request } = useAPI()

  const apiRoute = API.routes.cart

  const getCartProductsData: QueryFunction<CartProduct[]> = async () => {
    const { data } = await request<CartProduct[], never, never>(
      'get',
      apiRoute.list,
    )
    const reversedData = data.reverse()
    const filteredData = reversedData.filter(
      (_, index) => index < MAX_DISPLAY_QUANTITY,
    )

    return filteredData
  }
  const cartProductsDataQuery = useQuery({
    queryKey: ['cart'],
    queryFn: getCartProductsData,
    initialData,
  })

  const createCartProduct: MutationFunction<unknown, CartProduct> = async (
    newCartProduct: CartProduct,
  ) => {
    // to improve
    if (
      cartProductsDataQuery.data.findIndex(
        ({ objectId }) => objectId === newCartProduct.objectId,
      ) !== -1
    ) {
      await updateCartProduct(newCartProduct)
    } else {
      const { data } = await request<unknown, CartProduct, never>(
        'post',
        apiRoute.create,
        { data: newCartProduct },
      )

      return data
    }
  }

  const createCartProductMutation = useMutation({
    mutationKey: ['create product in cart'],
    mutationFn: createCartProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart'])
    },
    onError: (error) => {
      console.log('create product in cart', error)
    },
  })

  const updateCartProduct: MutationFunction<unknown, CartProduct> = async (
    selectedCartProduct: CartProduct,
  ) => {
    const { data } = await request<unknown, CartProduct, never>(
      'put',
      apiRoute.update(selectedCartProduct.objectId),
      { data: selectedCartProduct },
    )

    return data
  }

  const updateCartProductMutation = useMutation({
    mutationKey: ['update product in cart'],
    mutationFn: updateCartProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart'])
    },
    onError: (error) => {
      console.log('update product in cart', error)
    },
  })

  const deleteCartProduct: MutationFunction<
    unknown,
    CartProduct['objectId']
  > = async (selectedProductId: CartProduct['objectId']) => {
    const { data } = await request<unknown, never, never>(
      'delete',
      apiRoute.delete(selectedProductId),
    )
    return data
  }

  const deleteCartProductMutation = useMutation({
    mutationKey: ['delete product in cart'],
    mutationFn: deleteCartProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart'])
    },
  })

  return {
    query: cartProductsDataQuery,
    create: createCartProductMutation,
    update: updateCartProductMutation,
    delete: deleteCartProductMutation,
  }
}
