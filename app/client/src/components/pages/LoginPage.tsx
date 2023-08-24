import React from 'react'
import { Box } from '@chakra-ui/react'
import { isAxiosError } from 'axios'

import { useAuth, APIRequestUserLogin } from '@/hooks'

import { UserLoginForm } from '@/components/organisms'
import Link from 'next/link'

export const LoginPage = () => {
  const { login } = useAuth({ redirectTo: '/' })

  const handleLogin = async (credential: APIRequestUserLogin) => {
    try {
      await login(credential)
    } catch (e) {
      if (isAxiosError(e)) {
        console.error(e.response?.data ?? e.response)
      } else {
        console.error(e)
      }
    }
  }

  return (
    <main className="h-full">
      <div className="h-full sm:grid sm:grid-flow-row sm:grid-cols-2 sm:grid-rows-1">
        <Box className="flex h-full flex-col items-center justify-center gap-4">
          <Box className="text-2xl">LOGIN</Box>
          <UserLoginForm onSubmit={handleLogin} />

          <Link
            className="inline-block rounded-md p-2 text-brown-800 duration-300 hover:cursor-pointer hover:bg-brown-100 sm:hidden"
            href="/register"
          >
            CREATE AN ACCOUNT
          </Link>
        </Box>
        <Box className="hidden h-full flex-col justify-center gap-8 bg-primary-50 px-8 py-40 sm:flex">
          <Box className="text-2xl font-bold">CREATE AN ACCOUNT</Box>
          <Box fontSize="xl">Register for free!</Box>

          <Link
            className="inline-block w-max rounded-md bg-brown-800 px-4 py-2 text-primary-200 duration-300 hover:cursor-pointer hover:bg-brown-100"
            href="/register"
          >
            CREATE AN ACCOUNT
          </Link>
        </Box>
      </div>
    </main>
  )
}
