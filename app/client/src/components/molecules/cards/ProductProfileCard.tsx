import { ProductImage } from '@/components/atoms'

import { Product } from '@/utils/Product'

interface ProductProfileCardProps {
  product: Product
  quantity?: number
  className?: string
}

export const ProductProfileCard = ({
  product: { name, category, description, price, images },
  className = '',
}: ProductProfileCardProps) => {
  const firstImage = images[0] ? images[0].url : ''
  return (
    <div className={`${className} flex flex-row gap-4`}>
      <ProductImage className="flex-shrink-0" src={firstImage} alt={name} />
      <div className="col-span-3 flex flex-col">
        <div className="flex flex-col">
          <div className="text-xl font-bold line-clamp-2">{name}</div>
          <div className="italic text-gray-400">{category.name}</div>
          <div className="line-clamp-2">{description}</div>
        </div>
        <div>{`$${price}`}</div>
      </div>
    </div>
  )
}
