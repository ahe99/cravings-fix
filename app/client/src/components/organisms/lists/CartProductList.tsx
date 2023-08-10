import { Fragment } from 'react'

import { CartProduct } from '@/utils/ProductData'
import debounce from '@/helpers/debounce'

import { Divider } from '@/components/atoms'
import { CartProductItem } from '@/components/molecules'

interface CartProductListProps {
  cartProducts?: CartProduct[]
  onUpdateCartProductQuantity?: (
    selectedProductId: CartProduct['_id'],
    newQuantity: number,
  ) => void
  onDeleteCartProduct?: (selectedProductId: CartProduct['_id']) => void
  onClickitem?: (cartProductId: CartProduct['_id']) => void
}

export const CartProductList = ({
  cartProducts = [],
  onDeleteCartProduct = () => {},
  onUpdateCartProductQuantity = () => {},
  onClickitem = () => {},
}: CartProductListProps) => {
  const handleChangeCartProductQuantity = (
    selectedProductId: CartProduct['_id'],
    newQuantity: number,
  ) => {
    if (newQuantity === 0) {
      handleRemoveCartProduct(selectedProductId)
    } else {
      debounce(onUpdateCartProductQuantity)(selectedProductId, newQuantity)
    }
  }

  const handleRemoveCartProduct = (selectedProductId: CartProduct['_id']) => {
    // to add: confirm modal
    onDeleteCartProduct(selectedProductId)
  }

  return (
    <div className="flex flex-col">
      {cartProducts.map((cartProduct) => (
        <Fragment key={cartProduct._id}>
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
