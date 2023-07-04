'use client'

import { Spinner } from '@chakra-ui/react'

export const LoadingPage = () => {
  return (
    <main className="page-container h-screen">
      <Spinner size="xl" mx="auto" my="auto" />
    </main>
  )
}
