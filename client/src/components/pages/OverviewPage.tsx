import React, { useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { Product } from '@/utils/ProductData'
import { Banner } from '@/utils/BannerData'

import { BannerImage } from '@/components/atoms'
import { Carousel, ProductsBoard } from '@/components/templates'
import { useProducts, useBanners } from '@/hooks'

interface OverviewPageProps {
  prefetchProducts?: Product[]
  prefetchBanners?: Banner[]
}

export const OverviewPage = ({
  prefetchProducts = [],
  prefetchBanners = [],
}: OverviewPageProps) => {
  const router = useRouter()

  const products = useProducts(prefetchProducts)
  const banners = useBanners(prefetchBanners)

  const productsData = useMemo(() => {
    return products.query.data ?? []
  }, [products.query.data])

  const bannersData = useMemo(() => {
    return banners.query.data ?? []
  }, [banners.query.data])

  const handleClickProductCard = async (productId: Product['objectId']) => {
    router.push(`products/${productId}`)
  }

  return (
    <main className="page-container gap-4">
      <Carousel
        className="aspect-video w-full overflow-hidden rounded-md"
        autoPlay
        allowPan
      >
        {bannersData.map(({ image }, index) => (
          <BannerImage
            src={image.src}
            alt={image.src}
            key={index}
            className="h-full w-full"
          />
        ))}
      </Carousel>
      <ProductsBoard
        products={productsData}
        onClickItem={handleClickProductCard}
      />
    </main>
  )
}
