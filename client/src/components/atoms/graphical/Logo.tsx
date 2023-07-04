import Image from 'next/image'
import { Box } from '@chakra-ui/react'

import logo from '/public/logo.png'

export const Logo = () => {
  return (
    <Box className="relative h-16 w-40 flex-shrink-0">
      <Image
        alt="logo"
        src={logo}
        sizes="100% 100%"
        fill
        className="object-contain"
        priority={true}
        placeholder="blur"
      />
    </Box>
  )
}
