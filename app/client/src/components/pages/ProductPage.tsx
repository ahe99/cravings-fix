'use client'

import React, { useState } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import { Button } from '@chakra-ui/react'

import { Product } from '@/models/Product'
import { Category } from '@/models/Category'
import { useCartProducts, useToast } from '@/hooks'
import { exceptionHandler } from '@/helpers/exceptionHandler'

import { Divider } from '@/components/atoms'
import { QuantitySelector, ProductProfileCard } from '@/components/molecules'

interface ProductPageProps {
  prefetchProduct: Product
  prefetchRecentlyProducts: Product[]
  prefetchCategories: Category[]
}

export const ProductPage = ({ prefetchProduct }: ProductPageProps) => {
  const [quantity, setQuantity] = useState(1)

  const cart = useCartProducts()
  const { toast } = useToast()

  const handleAddToCart = async () => {
    toast.loading({ title: 'In Progress...' })
    try {
      if (cart.isExistingInCart(prefetchProduct._id)) {
        const currentCartItem = cart.query.data?.find(
          ({ food }) => food._id === prefetchProduct._id,
        )
        if (currentCartItem) {
          await cart.update.mutateAsync({
            cartItemId: currentCartItem?._id,
            quantity: currentCartItem.quantity + quantity,
          })
          toast.success({ title: 'Food Updated!' })
        }
      } else {
        await cart.create.mutateAsync({
          productId: prefetchProduct._id,
          quantity,
        })
        toast.success({ title: 'Food Added!' })
      }
    } catch (e) {
      toast.error({ title: exceptionHandler(e) })
    }
  }

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
    </main>
  )
}
