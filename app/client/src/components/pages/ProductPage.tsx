'use client'

import React, { useState, useEffect } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

import { Product } from '@/models/Product'
import { useRecentlyViewedProducts, useCartProducts } from '@/hooks'

import { Divider } from '@/components/atoms'
import { QuantitySelector, ProductProfileCard } from '@/components/molecules'
import { ProductList } from '@/components/organisms'
import { Category } from '@/models/Category'

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
    try {
      if (cart.isExistingInCart(prefetchProduct._id)) {
        const currentCartItem = cart.query.data.find(
          ({ food }) => food._id === prefetchProduct._id,
        )
        if (currentCartItem) {
          await cart.update.mutateAsync({
            cartItemId: currentCartItem?._id,
            quantity: currentCartItem.quantity + quantity,
          })
        }
      } else {
        await cart.create.mutateAsync({
          productId: prefetchProduct._id,
          quantity,
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  // const handleClickProductCard = async (productId: Product['objectId']) => {
  //   router.push(`products/${productId}`)
  // }

  return (
    <main className="page-container gap-4">
      <ProductProfileCard product={prefetchProduct} />

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
