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

  const { request } = useAPI()

  const apiRoute = API.routes.orders

  const getOrdersData: QueryFunction<Order[]> = async () => {
    const { data } = await request<Order[], never, never>('get', apiRoute.list)

    return data
  }
  const ordersDataQuery = useQuery({
    queryKey: ['orders'],
    queryFn: getOrdersData,
  })

  const createOrder: MutationFunction<unknown, Order> = async (
    newOrder: Order,
  ) => {
    const { data } = await request<unknown, Order, never>(
      'post',
      apiRoute.create,
      { data: newOrder },
    )

    return data
  }

  const createOrderQuery = useMutation({
    mutationKey: ['create order'],
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders'])
    },
    onError: (error) => {
      console.log('create order', error)
    },
  })

  return {
    query: ordersDataQuery,
    create: createOrderQuery,
  }
}
