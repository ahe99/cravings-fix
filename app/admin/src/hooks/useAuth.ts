import { useEffect, useMemo } from 'react'
import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
  QueryFunction,
} from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import { API } from '@/API'
import { User } from '@/models/User'

import { useToken, Token } from './useToken'
import { useAPI } from './useAPI'

export interface APIRequestUserLogin {
  email: string
  password: string
  rememberMe?: boolean
}

export interface APIRequestUserRegister {
  username: string
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
  const navigate = useNavigate()

  const apiRoute = API.routes.users

  const isLoggedIn = useMemo(
    () => Boolean(tokenStore.token),
    [tokenStore.token],
  )

  useEffect(() => {
    if (isLoggedIn && redirectTo) {
      navigate(redirectTo)
    } else if (!isLoggedIn && fallbackTo) {
      navigate(fallbackTo)
    }
  }, [isLoggedIn, redirectTo, fallbackTo])

  const getToken: MutationFunction<Token, APIRequestUserLogin> = async (
    credentials,
  ) => {
    const { data } = await client.post(apiRoute.login, {
      ...credentials,
      shouldValidAdmin: true,
    })

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
    const token = await tokenQuery.mutateAsync(credentials)

    tokenStore.update(token)
  }

  const logout = () => {
    tokenStore.clear()
    userQuery.remove()
    navigate('/')
  }

  const getUserInfo: QueryFunction<User> = async () => {
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
    await client.post(apiRoute.create, newUserData)
  }

  const register = useMutation({
    mutationKey: ['register'],
    mutationFn: postNewUser,
  })

  return {
    login,
    logout,
    register,
    userQuery,
    isLoggedIn,
  }
}
