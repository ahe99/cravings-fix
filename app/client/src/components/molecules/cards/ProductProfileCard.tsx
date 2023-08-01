import { ProductImage } from '@/components/atoms'

import { Product } from '@/utils/ProductData'

interface ProductProfileCardProps {
  product: Product & { categoryName: string }
  quantity?: number
  className?: string
}

export const ProductProfileCard = ({
  product: { _id, name, categoryName, description, price, images },
  className = '',
}: ProductProfileCardProps) => {
  const firstImage = images[0] ? images[0].url : ''
  return (
    <div
      className={`${className} grid grid-flow-row grid-cols-5 gap-4 sm:grid-cols-4`}
    >
      <ProductImage
        className="col-span-2 sm:col-span-1"
        src={firstImage}
        alt={name}
      />
      <div className="col-span-3 flex flex-col">
        <div className="flex flex-col">
          <div className="text-xl font-bold">{name}</div>
          <div className="italic text-gray-400">{categoryName}</div>
          <div className="">{description}</div>
        </div>
        <div>{`$${price}`}</div>
      </div>
    </div>
  )
}
