import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
  QueryFunction,
} from '@tanstack/react-query'

import { useAPI } from './useAPI'

import { API } from '@/API'
import { Order } from '@/models/Order'

export const useOrders = () => {
  const queryClient = useQueryClient()

  const apiRoute = API.routes.orders

  const { request } = useAPI()

  const getOrdersData: QueryFunction<Order[]> = async () => {
    const { data } = await request<Order[], never, never>('get', apiRoute.list)

    return data
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
