'use client'

import React, { useState, useEffect } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

import { Product } from '@/utils/ProductData'
import { useRecentlyViewedProducts, useCartProducts } from '@/hooks'

import { Divider } from '@/components/atoms'
import { QuantitySelector, ProductProfileCard } from '@/components/molecules'
import { ProductList } from '@/components/organisms'
import { Category } from '@/utils/Category'

interface ProductPageProps {
  prefetchProduct: Product
  prefetchRecentlyProducts: Product[]
  prefetchCategories: Category[]
}

export const ProductPage = ({
  prefetchProduct,
  prefetchRecentlyProducts,
  prefetchCategories,
}: ProductPageProps) => {
  const [quantity, setQuantity] = useState(1)

  const router = useRouter()

  const cart = useCartProducts()
  // const recentlyViewedProducts = useRecentlyViewedProducts(
  //   prefetchRecentlyProducts,
  // )

  // useEffect(() => {
  //   if (prefetchProduct.objectId) {
  //     recentlyViewedProducts.create.mutateAsync(prefetchProduct)
  //   }
  // }, [prefetchProduct.id])

  const handleAddToCart = async () => {
    await cart.create.mutateAsync({ ...prefetchProduct, quantity })
  }

  // const handleClickProductCard = async (productId: Product['objectId']) => {
  //   router.push(`products/${productId}`)
  // }

  const category = prefetchCategories.find(
    ({ _id }) => prefetchProduct.categoryId === _id,
  )

  const productWithCategoryName = {
    ...prefetchProduct,
    categoryName: category?.name ?? '',
  }

  return (
    <main className="page-container gap-4">
      <ProductProfileCard product={productWithCategoryName} />

      <div className="flex w-2/3 flex-row flex-wrap items-end gap-2 self-end">
        <div className="flex-1">
          <QuantitySelector
            value={quantity}
            minValue={1}
            maxValue={prefetchProduct.stockQuantity}
            onChange={(newValue) => setQuantity(newValue)}
          />
        </div>

        <Button
          variant="outline"
          className="flex-1 border-2 border-brown-600"
          leftIcon={<MdShoppingCart />}
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </div>
      <Divider />
      <div className="text-2xl">Recently viewed</div>
      {/* <ProductList
        products={prefetchRecentlyProducts}
        onClickItem={handleClickProductCard}
      /> */}
    </main>
  )
}
