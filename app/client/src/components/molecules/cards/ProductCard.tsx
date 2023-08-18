import { motion } from 'framer-motion'

import { ProductImage } from '@/components/atoms'

import { Product } from '@/models/Product'

interface ProductCardProps {
  product: Product
  onClick?: (productId: Product['_id']) => void
}

export const ProductCard = ({
  product: { _id, name = '', price, images = [] },
  onClick = () => {},
}: ProductCardProps) => {
  const firstImage = images[0] ? images[0].url : ''
  return (
    <motion.div
      className="relative flex flex-col gap-2 hover:cursor-pointer hover:opacity-40"
      whileTap={{ scale: 0.9 }}
      onClick={() => onClick(_id)}
    >
      <ProductImage src={firstImage} alt={name} expanded={true} />

      <div className="flex flex-col">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
          {name}
        </div>
        <div>{`$${price}`}</div>
      </div>
    </motion.div>
  )
}
export default ProductCard
