import { ProductImage } from '@/components/atoms'

import { Product } from '@/utils/ProductData'

interface ProductProfileCardProps {
  product: Product
  quantity?: number
  className?: string
}

//todo: find a better naming
export const ProductProfileCard = ({
  product: {
    objectId,
    name,
    category_name,
    description,
    price,
    image: { src },
  },
  className = '',
}: ProductProfileCardProps) => {
  return (
    <div
      className={`${className} grid grid-flow-row grid-cols-5 gap-4 sm:grid-cols-4`}
    >
      <ProductImage className="col-span-2 sm:col-span-1" src={src} alt={name} />

      <div className="col-span-3 flex flex-col">
        <div className="flex flex-col">
          <div className="text-xl font-bold">{name}</div>
          <div className="italic text-gray-400">{category_name}</div>
          <div className="">{description}</div>
        </div>
        <div>{`$${price}`}</div>
      </div>
    </div>
  )
}
