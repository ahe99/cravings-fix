import { useMemo } from 'react'
import { Button } from '@chakra-ui/react'
import { MdArrowRight } from 'react-icons/md'
import { useRouter } from 'next/navigation'

import { CartProduct } from '@/utils/ProductData'
import { useCartProducts } from '@/hooks'

import { CartProductList } from '@/components/organisms'

interface CartProductPageProps {
  prefetchCartProducts?: CartProduct[]
}

export const CartProductPage = ({
  prefetchCartProducts = [],
}: CartProductPageProps) => {
  const cartProducts = useCartProducts(prefetchCartProducts)
  const router = useRouter()

  const cartProductsData = useMemo(
    () => cartProducts.query.data ?? [],
    [cartProducts.query.data],
  )
  const handleDeleteCartProduct = async (
    cartProductId: CartProduct['objectId'],
  ) => {
    await cartProducts.delete.mutateAsync(cartProductId)
  }
  const handleUpdateCartProductQuantity = async (
    selectedProductId: CartProduct['objectId'],
    newQuantity: number,
  ) => {
    const selectedCartProduct = cartProductsData.find(
      ({ objectId }) => objectId === selectedProductId,
    )

    if (selectedCartProduct) {
      await cartProducts.update.mutateAsync({
        ...selectedCartProduct,
        quantity: newQuantity,
      })
    }
  }

  const handleClickCartProductItem = async (
    cartProductId: CartProduct['objectId'],
  ) => {
    router.push(`products/${cartProductId}`)
  }

  const totalPrice = cartProductsData
    .map(({ price }) => price)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
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
        >
          Checkout
          <MdArrowRight className="text-xl" />
        </Button>
      </div>
    </main>
  )
}
