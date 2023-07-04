import { Fragment } from 'react'

import { CartProduct } from '@/utils/ProductData'

import { Divider } from '@/components/atoms'
import { CartProductItem } from '@/components/molecules'

interface CartProductListProps {
  cartProducts?: CartProduct[]
  onUpdateCartProductQuantity?: (
    selectedProductId: CartProduct['objectId'],
    newQuantity: number,
  ) => void
  onDeleteCartProduct?: (selectedProductId: CartProduct['objectId']) => void
  onClickitem?: (cartProductId: CartProduct['objectId']) => void
}

export const CartProductList = ({
  cartProducts = [],
  onDeleteCartProduct = () => {},
  onUpdateCartProductQuantity = () => {},
  onClickitem = () => {},
}: CartProductListProps) => {
  const handleChangeCartProductQuantity = (
    selectedProductId: CartProduct['objectId'],
    newQuantity: number,
  ) => {
    if (newQuantity === 0) {
      handleRemoveCartProduct(selectedProductId)
    } else {
      onUpdateCartProductQuantity(selectedProductId, newQuantity)
    }
  }

  const handleRemoveCartProduct = (
    selectedProductId: CartProduct['objectId'],
  ) => {
    //to add: confirm modal
    onDeleteCartProduct(selectedProductId)
  }

  return (
    <div className="flex flex-col">
      {cartProducts.map((cartProduct) => (
        <Fragment key={cartProduct.objectId}>
          <CartProductItem
            cartProduct={cartProduct}
            onChangeQuantity={handleChangeCartProductQuantity}
            onClick={onClickitem}
          />
          <Divider className="my-4" />
        </Fragment>
      ))}
    </div>
  )
}
