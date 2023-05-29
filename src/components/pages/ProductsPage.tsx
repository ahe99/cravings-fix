import { useMemo } from 'react'

import { useProducts } from '@/hooks'
import { ProductTable } from '@/components/organisms'

export const ProductsPage = () => {
  const products = useProducts()

  const productsData = useMemo(
    () => products.query.data ?? [],
    [products.query.data],
  )

  return <ProductTable products={productsData} />
}
