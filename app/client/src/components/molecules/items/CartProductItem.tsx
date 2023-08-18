import { ProductImage } from '@/components/atoms'

import { CartProduct } from '@/models/Cart'

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
    food: {
      _id: productId,
      name,
      description,
      stockQuantity,
      images,
      category,
    },
    price,
    quantity,
  },
  onChangeQuantity = () => {},
  onClick = () => {},
}: CartProductItemProps) => {
  const previewImage = (images && images[0]?.url) ?? ''

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-4">
        <ProductImage src={previewImage} alt={name} />

        <div className="flex flex-col justify-between">
          <div
            className="flex flex-col hover:cursor-pointer hover:opacity-40"
            onClick={() => onClick(productId)}
          >
            <div className="text-xl font-bold">{name}</div>
            <div className="italic text-gray-400">{category.name}</div>
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
