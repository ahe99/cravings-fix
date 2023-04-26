import dayjs from 'dayjs'

import { Divider } from '@/components/atoms'
import { ProductProfileCard } from '@/components/molecules'

import { Order } from '@/utils/ProductData'
interface OrderPageProps {
  prefetchOrder: Order
}

export const OrderPage = ({
  prefetchOrder: { id, createdAt, totalPrice, products },
}: OrderPageProps) => {
  return (
    <main className="mx-auto flex w-full flex-col items-stretch p-4 sm:p-8 landscape:w-10/12">
      <h1 className="mb-8 text-3xl">Order Detail</h1>

      <div className="flex flex-col gap-4 rounded-md">
        <div className="flex flex-row justify-between text-xl font-bold">
          <div>{`Id: ${id}`}</div>
          <div>{dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
        </div>
        <Divider />
        {products.map((product) => (
          <div key={product.id} className="flex flex-row">
            <ProductProfileCard product={product} />
            <div className="flex-shrink-0 self-end">{`x${product.quantity}`}</div>
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
