import { ProductCard } from '@/components/molecules'

import { Product } from '@/utils/ProductData'

interface ProductListProps {
  products: Product[]
  onClickItem?: (productId: Product['_id']) => void
}

export const ProductList = ({
  products,
  onClickItem = () => {},
}: ProductListProps) => {
  return (
    <div className="grid grid-flow-row grid-cols-2 gap-4 sm:grid-cols-3 ">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onClick={onClickItem}
        />
      ))}
    </div>
  )
}
