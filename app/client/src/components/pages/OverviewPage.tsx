import React, { useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { Product } from '@/models/Product'
import { Banner } from '@/models/Banner'

import { BannerImage } from '@/components/atoms'
import { Carousel, ProductsBoard } from '@/components/templates'
import { useProducts, useBanners, useCategories } from '@/hooks'
import { Category } from '@/models/Category'

interface OverviewPageProps {
  prefetchProducts?: Product[]
  prefetchBanners?: Banner[]
  prefetchCategories?: Category[]
}

export const OverviewPage = ({
  prefetchProducts = [],
  prefetchBanners = [],
  prefetchCategories = [],
}: OverviewPageProps) => {
  const router = useRouter()

  const products = useProducts(prefetchProducts)
  const categories = useCategories(prefetchCategories)
  const banners = useBanners(prefetchBanners)

  const productsData = useMemo(() => {
    return products.query.data ?? []
  }, [products.query.data])

  const categoriesData = useMemo(() => {
    return categories.query.data ?? []
  }, [categories.query.data])

  const bannersData = useMemo(() => {
    return banners.query.data ?? []
  }, [banners.query.data])

  const handleClickProductCard = async (productId: Product['_id']) => {
    router.push(`products/${productId}`)
  }

  return (
    <main className="page-container gap-4">
      <Carousel
        className="aspect-video w-full overflow-hidden rounded-md"
        autoPlay
        allowPan
      >
        {bannersData.map(({ imageId, url }) => (
          <BannerImage
            src={url}
            alt={url}
            key={imageId}
            className="h-full w-full"
          />
        ))}
      </Carousel>
      <ProductsBoard
        products={productsData}
        categories={categoriesData}
        onClickItem={handleClickProductCard}
      />
    </main>
  )
}
