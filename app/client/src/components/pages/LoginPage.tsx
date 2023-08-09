import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { isAxiosError } from 'axios'

import { useAuth, APIRequestUserLogin } from '@/hooks'

import { UserLoginForm } from '@/components/organisms'

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
    <main className="grid h-full grid-flow-row grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1">
      <Box className="flex h-full flex-col items-center justify-center gap-4">
        <Box className="text-2xl">LOGIN</Box>
        <UserLoginForm onSubmit={handleLogin} />
      </Box>
      <Box className="flex h-full flex-col gap-8 bg-brown-200 px-8 py-40">
        <Box className="text-2xl font-bold">CREATE AN ACCOUNT</Box>
        register for free!
        <Button className="w-max bg-brown-800 text-brown-200">
          CREATE AN ACCOUNT
        </Button>
      </Box>
    </main>
  )
}
