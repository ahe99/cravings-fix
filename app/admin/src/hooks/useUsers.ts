import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
  QueryFunction,
} from '@tanstack/react-query'

import { useAPI } from './useAPI'

import { API } from '@/API'
import { Roles, User } from '@/models/User'

export interface APIRequestCreateUser {
  username?: string
  email: string
  password: string
  role: Roles
}
export interface APIRequestEditUser {
  _id: string
  email?: string
  username?: string
  role?: Roles
}

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

  const postUserData: MutationFunction<unknown, APIRequestCreateUser> = async (
    data,
  ) => {
    const { data: response } = await request<
      unknown,
      APIRequestCreateUser,
      never
    >('post', apiRoute.create, {
      data,
    })
    return response
  }

  const createUserQuery = useMutation({
    mutationKey: ['create user'],
    mutationFn: postUserData,
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })

  const putUserData: MutationFunction<unknown, APIRequestEditUser> = async (
    data,
  ) => {
    const { data: response } = await request<
      unknown,
      APIRequestEditUser,
      unknown
    >('put', apiRoute.update(data._id), {
      data,
    })
    return response
  }

  const updateUserQuery = useMutation({
    mutationKey: ['update user'],
    mutationFn: putUserData,
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })

  const deleteUser: MutationFunction<unknown, User['_id']> = async (userId) => {
    const { data: response } = await request<unknown>(
      'delete',
      apiRoute.delete(userId),
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
    create: createUserQuery,
    update: updateUserQuery,
    delete: deleteUserQuery,
  }
}
