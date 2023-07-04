import { ProductImage } from '@/components/atoms'

import { CartProduct } from '@/utils/ProductData'

import { QuantitySelector } from '../interactive/QuantitySelector'

interface CartProductItemProps {
  cartProduct: CartProduct
  onChangeQuantity?: (
    cartProductId: CartProduct['objectId'],
    newQuantity: number,
  ) => void
  onClick?: (cartProductId: CartProduct['objectId']) => void
}

//todo: find a better naming
export const CartProductItem = ({
  cartProduct: {
    objectId,
    name,
    category_name,
    description,
    price,
    stock_quantity,
    quantity,
    image: { src },
  },
  onChangeQuantity = () => {},
  onClick = () => {},
}: CartProductItemProps) => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-flow-row grid-cols-3 gap-4 rounded-md">
        <ProductImage className="col-span-1" src={src} alt={name} />

        <div className="col-span-2 flex flex-col justify-between">
          <div
            className="flex flex-col hover:cursor-pointer hover:opacity-40"
            onClick={() => onClick(objectId)}
          >
            <div className="text-xl font-bold">{name}</div>
            <div className="italic text-gray-400">{category_name}</div>
            <div className="line-clamp-2">{description}</div>
          </div>
          <div className="flex flex-col">
            <div className="flex-shrink-0 text-lg font-bold">{`$${price}`}</div>
            <QuantitySelector
              value={quantity}
              minValue={0}
              maxValue={stock_quantity}
              onChange={(newQuantity) =>
                onChangeQuantity(objectId, newQuantity)
              }
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
