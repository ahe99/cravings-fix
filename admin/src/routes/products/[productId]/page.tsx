import { useParams } from 'react-router-dom'

const ProductRoute = () => {
  const { productId } = useParams()
  return (
    <div>
      <div>{productId}</div>
    </div>
  )
}
ProductRoute.layouts = 'content'
ProductRoute.displayName = 'ProductRoute'
export default ProductRoute
