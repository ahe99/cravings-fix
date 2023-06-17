import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
  QueryFunction,
} from '@tanstack/react-query'

import { useAPI } from './useAPI'

import { API } from '@/utils/API'
import { CartProduct, Order } from '@/utils/ProductData'

/**
 * @description fill the type after the type is defined
 */

export const useOrders = () => {
  const queryClient = useQueryClient()

  const apiRoute = API.routes.orders
  const categoriesApiRoute = API.routes.categories
  const usersApiRoute = API.routes.user

  const { request } = useAPI()

  const getOrderItemWithCategory = async (item: CartProduct) => {
    const {
      data: { name },
    } = await request<{ name: string }, never, never>(
      'get',
      categoriesApiRoute.data(item.category_id),
    )
    return {
      ...item,
      category_name: name,
    }
  }

  const getFormattedOrder = async (order: Order) => {
    const { items } = order
    const formattedItems = await Promise.all(
      items.map(getOrderItemWithCategory),
    )
    const { data } = await request<{ username: string }>(
      'get',
      usersApiRoute.data(order.owner),
    )
    console.log(data)
    return {
      ...order,
      owner: data.username,
      items: formattedItems,
    }
  }

  const getOrdersData: QueryFunction<Order[]> = async () => {
    const { data: orders } = await request<Order[], never, never>(
      'get',
      apiRoute.list,
    )

    const formattedOrders = await Promise.all(orders.map(getFormattedOrder))

    return formattedOrders
  }
  const ordersDataQuery = useQuery({
    queryKey: ['orders'],
    queryFn: getOrdersData,
  })

  const putOrderData: MutationFunction<
    unknown,
    { data: unknown; orderId: string | number }
  > = async ({ data, orderId }) => {
    const { data: response } = await request<unknown, unknown, unknown>(
      'put',
      apiRoute.update(orderId),
      {
        params: { id: orderId },
        data,
      },
    )
    return response
  }
  const updateOrderQuery = useMutation({
    mutationKey: ['update order'],
    mutationFn: putOrderData,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders'])
    },
  })

  const deleteOrder: MutationFunction<
    unknown,
    { orderId: string | number }
  > = async ({ orderId }) => {
    const { data: response } = await request<unknown>(
      'delete',
      apiRoute.delete(orderId),
      {
        params: { id: orderId },
      },
    )

    return response
  }
  const deleteOrderQuery = useMutation({
    mutationKey: ['delete order'],
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders'])
    },
  })

  return {
    query: ordersDataQuery,
    update: updateOrderQuery,
    delete: deleteOrderQuery,
  }
}
