import dayjs from 'dayjs'

import { Divider } from '@/components/atoms'
import { ProductProfileCard } from '@/components/molecules'

import { Order } from '@/utils/ProductData'
interface OrderPageProps {
  prefetchOrder: Order
}

export const OrderPage = ({
  prefetchOrder: { objectId, createdAt, totalPrice, products = [] },
}: OrderPageProps) => {
  return (
    <main className="page-container">
      <h1 className="mb-8 text-3xl">Order Detail</h1>

      <div className="flex flex-col gap-4 rounded-md border-4 border-dashed border-brown-800 p-4">
        <div className="flex flex-row justify-between text-xl font-bold">
          <div>{`Id: ${objectId}`}</div>
          <div>{dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
        </div>
        <Divider />
        {products.map((product) => (
          <div key={product.objectId} className="flex flex-row">
            <ProductProfileCard className="flex-1" product={product} />
            <div className="flex-shrink-0 self-start font-bold">{`x${product.quantity}`}</div>
          </div>
        ))}
        <Divider />

        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between text-lg font-bold">
            <div>Total</div>
            <div>{`$${totalPrice}`}</div>
          </div>
        </div>
      </div>
    </main>
  )
}
