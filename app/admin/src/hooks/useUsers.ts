import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
  QueryFunction,
} from '@tanstack/react-query'

import { useAPI } from './useAPI'

import { API } from '@/API'
import { User } from '@/models/User'

export const useUsers = () => {
  const queryClient = useQueryClient()

  const apiRoute = API.routes.users

  const { request } = useAPI()

  const getUsersData: QueryFunction<User[]> = async () => {
    const { data } = await request<User[], never, never>('get', apiRoute.list)

    return data
  }
  const usersDataQuery = useQuery({
    queryKey: ['users'],
    queryFn: getUsersData,
  })

  const putUserData: MutationFunction<
    unknown,
    { data: unknown; userId: string | number }
  > = async ({ data, userId }) => {
    const { data: response } = await request<unknown, unknown, unknown>(
      'put',
      apiRoute.update(userId),
      {
        params: { id: userId },
        data,
      },
    )
    return response
  }
  const updateUserQuery = useMutation({
    mutationKey: ['update user'],
    mutationFn: putUserData,
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })

  const deleteUser: MutationFunction<
    unknown,
    { userId: string | number }
  > = async ({ userId }) => {
    const { data: response } = await request<unknown>(
      'delete',
      apiRoute.delete(userId),
      {
        params: { id: userId },
      },
    )

    return response
  }

  const deleteUserQuery = useMutation({
    mutationKey: ['delete user'],
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })

  return {
    query: usersDataQuery,
    update: updateUserQuery,
    delete: deleteUserQuery,
  }
}
