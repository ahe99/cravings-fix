import Image from 'next/image'
import { Box } from '@chakra-ui/react'

// eslint-disable-next-line import/no-absolute-path
import welcome from '/public/welcome.webp'

export const Welcome = () => {
  return (
    <Box className="relative w-1/2 aspect-video">
      <Image
        alt="logo"
        src={welcome}
        sizes="100% 100%"
        fill
        className="object-contain"
        priority={true}
        placeholder="blur"
      />
    </Box>
  )
}
