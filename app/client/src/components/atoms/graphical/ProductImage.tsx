import Image from 'next/image'
import { Box, Skeleton } from '@chakra-ui/react'
import { Fragment, useState } from 'react'

interface ProductImageProps {
  src: string
  className?: string
  alt: string
  expanded?: boolean
}

export const ProductImage = ({
  src = '',
  alt = '',
  className = '',
  expanded = false,
}: ProductImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const hasImage = src !== ''
  return (
    <div
      className={`relative rounded-md ${className} ${
        expanded ? 'aspect-square' : 'product-img'
      }`}
    >
      {hasImage ? (
        <Fragment>
          <Skeleton
            isLoaded={imageLoaded}
            startColor="gray.200"
            endColor="gray.300"
            height="full"
            width="full"
          />
          <Image
            alt={alt}
            src={src}
            fill
            onLoadingComplete={() => setImageLoaded(true)}
            loading="lazy"
            sizes="100% 100%"
            className={`object-contain ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </Fragment>
      ) : (
        <Box w="full" h="full" />
      )}
    </div>
  )
}
