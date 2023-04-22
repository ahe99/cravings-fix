import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MdKeyboardReturn } from 'react-icons/md'
import { Box, Button } from '@chakra-ui/react'

export const NotFoundPage = () => {
  const router = useRouter()

  const handleGoHome = () => {
    router.push('/')
  }

  return (
    <main className="flex w-full flex-col items-center bg-white p-4 pb-4 sm:p-8">
      <Box className="relative aspect-square w-3/5">
        <Image alt="404" src="/404.jpg" fill className="object-contain" />
      </Box>
      <Button
        onClick={handleGoHome}
        rightIcon={<MdKeyboardReturn />}
        className="border-2 text-2xl"
      >
        Go to Home Page
      </Button>
    </main>
  )
}
