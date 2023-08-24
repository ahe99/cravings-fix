import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { isAxiosError } from 'axios'
import Link from 'next/link'
import { MdArrowForward } from 'react-icons/md'

import { useAuth, APIRequestUserRegister } from '@/hooks'

import { UserRegisterForm } from '@/components/organisms'

export const RegisterPage = () => {
  const { register } = useAuth()

  const handleRegister = async (credential: APIRequestUserRegister) => {
    try {
      await register.mutateAsync(credential)
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
          <Box className="text-2xl">REGISTER</Box>
          <UserRegisterForm onSubmit={handleRegister} />

          <Link
            className="inline-block rounded-md p-2 text-brown-800 duration-300 hover:cursor-pointer hover:bg-brown-100 sm:hidden"
            href="/login"
          >
            Already have an account?
          </Link>
        </Box>
        <Box className="hidden h-full flex-col justify-center gap-8 bg-primary-50 px-8 py-40 sm:flex">
          <Box fontSize="xl">Already have an account?</Box>
          <Button className="w-max bg-brown-800 text-primary-200">
            <Link href="/login">LOGIN</Link>
            <MdArrowForward className="ml-2 text-xl" />
          </Button>
        </Box>
      </div>
    </main>
  )
}
