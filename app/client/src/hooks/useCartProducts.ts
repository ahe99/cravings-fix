import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
  QueryFunction,
} from '@tanstack/react-query'

import { API } from '@/API'
import { Product } from '@/models/Product'
import { Cart, CartProduct } from '@/models/Cart'

import { useAuth } from './useAuth'
import { useAPI } from './useAPI'

// const MAX_DISPLAY_QUANTITY = 6

export const useCartProducts = () => {
  const queryClient = useQueryClient()

  const { isLoggedIn } = useAuth()
  const { request } = useAPI()

  const apiRoute = API.routes.cart

  const getMyCartProductsData: QueryFunction<CartProduct[]> = async () => {
    const { data } = await request<Cart, never, never>('get', apiRoute.current)

    return data.cartItems.map((cartItem) => ({
      ...cartItem,
      price: cartItem.quantity * cartItem.food.price,
    }))
  }
  const cartProductsDataQuery = useQuery({
    queryKey: ['cart'],
    queryFn: getMyCartProductsData,
    enabled: isLoggedIn,
  })

  const createCartProduct: MutationFunction<
    unknown,
    {
      productId: Product['_id']
      quantity: CartProduct['quantity']
    }
  > = async ({ productId, quantity }) => {
    const { data } = await request<
      unknown,
      { quantity: CartProduct['quantity'] },
      never
    >('post', apiRoute.item.create(productId), {
      data: {
        quantity,
      },
    })

    return data
  }

  const createCartProductQuery = useMutation({
    mutationKey: ['create product in cart'],
    mutationFn: createCartProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart'])
    },
    onError: (error) => {
      console.log('create product in cart', error)
    },
  })

  const updateCartQuantityProduct: MutationFunction<
    unknown,
    {
      cartItemId: CartProduct['_id']
      quantity: CartProduct['quantity']
    }
  > = async ({ cartItemId, quantity }) => {
    const { data } = await request<
      unknown,
      { quantity: CartProduct['quantity'] },
      never
    >('put', apiRoute.item.update(cartItemId), {
      data: {
        quantity,
      },
    })

    return data
  }

  const updateCartQuantityProductQuery = useMutation({
    mutationKey: ['update product in cart'],
    mutationFn: updateCartQuantityProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart'])
    },
    onError: (error) => {
      console.log('update product in cart', error)
    },
  })

  const deleteCartProduct: MutationFunction<
    unknown,
    CartProduct['_id']
  > = async (selectedProductId: CartProduct['_id']) => {
    const { data } = await request<unknown, never, never>(
      'delete',
      apiRoute.item.delete(selectedProductId),
    )
    return data
  }

  const deleteCartProductQuery = useMutation({
    mutationKey: ['delete product in cart'],
    mutationFn: deleteCartProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart'])
    },
  })

  const checkoutCart = async () => {
    const { data } = await request('post', apiRoute.checkout)
    return data
  }

  const checkoutCartProductQuery = useMutation({
    mutationKey: ['checkout product in cart'],
    mutationFn: checkoutCart,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart'])
    },
    onError: (error) => {
      console.log('checkout product in cart', error)
    },
  })

  const isExistingInCart = (productId: Product['_id']) => {
    return (
      cartProductsDataQuery.data?.findIndex(
        ({ food }) => food._id === productId,
      ) !== -1
    )
  }

  return {
    query: cartProductsDataQuery,
    create: createCartProductQuery,
    update: updateCartQuantityProductQuery,
    delete: deleteCartProductQuery,
    checkout: checkoutCartProductQuery,
    isExistingInCart,
  }
}
