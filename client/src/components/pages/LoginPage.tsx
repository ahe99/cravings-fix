import React from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button } from '@chakra-ui/react'

import { UserLoginForm } from '@/components/organisms'

export const LoginPage = () => {
  const router = useRouter()

  const login = (credential: {}) => {
    console.log('credential', credential)
    router.push('/overview')
  }

  return (
    <main className="grid h-full grid-flow-row grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1">
      <Box className="flex h-full flex-col items-center justify-center gap-4">
        <Box className="text-2xl">LOGIN</Box>
        <UserLoginForm onSubmit={login} />
      </Box>
      <Box className="flex h-full flex-col gap-8 bg-brown-300 px-8 py-40">
        <Box className="text-2xl font-bold">CREATE AN ACCOUNT</Box>
        register for free!
        <Button className="w-max bg-brown-800 text-brown-200">
          CREATE AN ACCOUNT
        </Button>
      </Box>
    </main>
  )
}
