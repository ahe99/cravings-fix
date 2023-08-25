'use client'

import { useMemo } from 'react'
import { Button } from '@chakra-ui/react'
import { MdArrowRight } from 'react-icons/md'
import { useRouter } from 'next/navigation'

import { CartProduct } from '@/models/Cart'
import { useCartProducts, useAuth, useToast } from '@/hooks'
import { exceptionHandler } from '@/helpers/exceptionHandler'

import { CartProductList } from '@/components/organisms'

export interface CartProductPageProps {}

export const CartProductPage = () => {
  const cartProducts = useCartProducts()
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  const { toast } = useToast()

  const cartProductsData = useMemo(
    () => cartProducts.query.data ?? [],
    [cartProducts.query.data],
  )
  const handleDeleteCartProduct = async (cartProductId: CartProduct['_id']) => {
    await cartProducts.delete.mutateAsync(cartProductId)
  }

  const handleUpdateCartProductQuantity = async (
    selectedProductId: CartProduct['_id'],
    newQuantity: number,
  ) => {
    const selectedCartProduct = cartProductsData.find(
      ({ _id }) => _id === selectedProductId,
    )

    if (selectedCartProduct) {
      await cartProducts.update.mutateAsync({
        cartItemId: selectedCartProduct._id,
        quantity: newQuantity,
      })
    }
  }

  const handleClickCartProductItem = async (
    cartProductId: CartProduct['_id'],
  ) => {
    router.push(`products/${cartProductId}`)
  }

  const checkout = async () => {
    if (!isCartEmpty) {
      toast.loading({ title: 'In Progress...' })
      try {
        if (isLoggedIn) {
          await cartProducts.checkout.mutateAsync()
          toast.success({ title: 'Checkout Successfully!' })
        } else {
          router.push('/login')
        }
      } catch (e) {
        toast.error({ title: exceptionHandler(e) })
      }
    } else {
      toast.info({ title: "Can't Checkout Empty Cart" })
    }
  }

  const totalPrice = cartProductsData
    .map(({ price }) => price)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  const isCartEmpty = cartProductsData.length === 0
  return (
    <main className="page-container">
      <h1 className="mb-8 text-3xl">Shopping Cart</h1>
      <CartProductList
        cartProducts={cartProductsData}
        onDeleteCartProduct={handleDeleteCartProduct}
        onUpdateCartProductQuantity={handleUpdateCartProductQuantity}
        onClickitem={handleClickCartProductItem}
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between text-lg font-bold">
          <div>Total</div>
          <div>{`$${totalPrice}`}</div>
        </div>
        <Button
          variant="outline"
          className="w-max items-center self-end border-2 border-brown-800 text-brown-800"
          onClick={checkout}
          disabled={isCartEmpty}
        >
          Checkout
          <MdArrowRight className="text-xl" />
        </Button>
      </div>
    </main>
  )
}
