import React, { useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { useProducts, useCategories } from '@/hooks'
import { Product } from '@/utils/ProductData'

import { ProductsBoard } from '@/components/templates'
import { Category } from '@/utils/Category'

interface ProductsPageProps {
  prefetchProducts?: Product[]
  prefetchCategories?: Category[]
}

export const ProductsPage = ({
  prefetchProducts = [],
  prefetchCategories = [],
}: ProductsPageProps) => {
  const router = useRouter()

  const products = useProducts(prefetchProducts)
  const categories = useCategories(prefetchCategories)

  const productsData = useMemo(() => {
    return products.query.data ?? []
  }, [products.query.data])

  const categoriesData = useMemo(() => {
    return categories.query.data ?? []
  }, [categories.query.data])

  const handleClickProductCard = async (productId: Product['objectId']) => {
    router.push(`products/${productId}`)
  }

  return (
    <main className="page-container">
      <h1 className="mb-8 text-3xl">All Products</h1>
      <ProductsBoard
        products={productsData}
        categories={categoriesData}
        onClickItem={handleClickProductCard}
      />
    </main>
  )
}
