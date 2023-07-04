import { motion } from 'framer-motion'

import { OrderItem } from '@/components/molecules'

import { Order } from '@/utils/ProductData'

interface OrderListProps {
  orders: Order[]
  onClickItem?: (productId: Order['objectId']) => void
}
export const OrderList = ({
  orders,
  onClickItem = () => {},
}: OrderListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 1,
        y: 0,
      }}
      transition={{ ease: 'easeInOut' }}
      className="flex flex-col gap-4"
    >
      {orders.map((order) => (
        <OrderItem key={order.objectId} order={order} onClick={onClickItem} />
      ))}
    </motion.div>
  )
}
