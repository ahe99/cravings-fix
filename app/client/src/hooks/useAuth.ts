import { useEffect } from 'react'
import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
  QueryFunction,
} from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import { API } from '@/utils/API'

import { useToken, Token } from './useToken'
import { useAPI } from './useAPI'

export interface APIRequestUserLogin {
  email: string
  password: string
  rememberMe?: boolean
}

export interface APIRequestUserRegister {
  name: string
  email: string
  password: string
}

export const useAuth = ({
  redirectTo,
  fallbackTo,
}: {
  redirectTo?: string
  fallbackTo?: string
} = {}) => {
  const queryClient = useQueryClient()
  const tokenStore = useToken()
  const { client } = useAPI()
  const router = useRouter()

  const apiRoute = API.routes.user

  const isLoggedIn = Boolean(tokenStore.token)

  useEffect(() => {
    if (isLoggedIn && redirectTo) {
      router.push(redirectTo)
    } else if (fallbackTo) {
      router.push(fallbackTo)
    }
  }, [isLoggedIn, redirectTo, fallbackTo])

  const getToken: MutationFunction<Token, APIRequestUserLogin> = async (
    credentials,
  ) => {
    const { data } = await client.post(apiRoute.login, credentials)

    return data.token
  }

  const tokenQuery = useMutation({
    mutationKey: ['login'],
    mutationFn: getToken,
    onSuccess: () => {
      queryClient.invalidateQueries(['get user info'])
    },
  })

  const login = async (credentials: APIRequestUserLogin) => {
    try {
      const token = await tokenQuery.mutateAsync(credentials)

      tokenStore.update(token)
    } catch (e) {
      if (isAxiosError(e)) {
        throw e.response?.data ?? e.response
      } else {
        throw e
      }
    }
  }

  const logout = () => {
    tokenStore.clear()
    userQuery.remove()
    router.push('/')
  }

  const getUserInfo: QueryFunction<{
    _id: string
    username: string
  }> = async () => {
    try {
      const { data } = await client.get(apiRoute.current)
      return data
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data ?? error.response)
      }
      tokenStore.clear()
    }
  }

  const userQuery = useQuery({
    queryKey: ['get user info'],
    queryFn: getUserInfo,
    enabled: isLoggedIn,
  })

  const postNewUser: MutationFunction<void, APIRequestUserRegister> = async (
    newUserData,
  ) => {
    await client.post(API.routes.user.register, newUserData)
  }

  const register = useMutation({
    mutationKey: ['register'],
    mutationFn: postNewUser,
  })

  return {
    login,
    logout,
    register,
    user: userQuery.data,
    isLoggedIn,
  }
}
