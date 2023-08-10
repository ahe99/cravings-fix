import { ProductImage } from '@/components/atoms'

import { CartProduct } from '@/utils/ProductData'

import { QuantitySelector } from '../interactive/QuantitySelector'

interface CartProductItemProps {
  cartProduct: CartProduct
  onChangeQuantity?: (
    cartProductId: CartProduct['_id'],
    newQuantity: number,
  ) => void
  onClick?: (cartProductId: CartProduct['_id']) => void
}

export const CartProductItem = ({
  cartProduct: {
    _id,
    name,
    categoryName,
    description,
    price,
    stockQuantity,
    quantity,
    images,
  },
  onChangeQuantity = () => {},
  onClick = () => {},
}: CartProductItemProps) => {
  const previewImage = (images && images[0]?.url) ?? ''

  return (
    <div className="flex flex-col">
      <div className="grid grid-flow-row grid-cols-3 gap-4 rounded-md">
        <ProductImage className="col-span-1" src={previewImage} alt={name} />

        <div className="col-span-2 flex flex-col justify-between">
          <div
            className="flex flex-col hover:cursor-pointer hover:opacity-40"
            onClick={() => onClick(_id)}
          >
            <div className="text-xl font-bold">{name}</div>
            <div className="italic text-gray-400">{categoryName}</div>
            <div className="line-clamp-2">{description}</div>
          </div>
          <div className="flex flex-col">
            <div className="flex-shrink-0 text-lg font-bold">{`$${price}`}</div>
            <QuantitySelector
              value={quantity}
              minValue={0}
              maxValue={stockQuantity}
              onChange={(newQuantity) => onChangeQuantity(_id, newQuantity)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
const MockImage = () => {
  return (
    <div className="col-span-1 aspect-square w-full rounded-md bg-brown-600" />
  )
}
