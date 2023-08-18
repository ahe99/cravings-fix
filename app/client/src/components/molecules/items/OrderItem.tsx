import dayjs from 'dayjs'
import { Heading, Box } from '@chakra-ui/react'

import { Order } from '@/models/Order'
import { Divider } from '@/components/atoms'

interface OrderItemProps {
  order: Order
  onClick: (orderId: Order['_id']) => void
}

export const OrderItem = ({
  order: { _id, createdAt, orderItems, totalPrice },
  onClick = () => {},
}: OrderItemProps) => {
  return (
    <Box
      className="border-brown-600 bg-primary-200 hover:cursor-pointer hover:opacity-40"
      rounded="md"
      p={4}
      borderWidth={4}
      display="flex"
      flexFlow="column"
      gap={4}
      onClick={() => onClick(_id)}
    >
      <Box display="flex" flexFlow="row" flexWrap='wrap' justifyContent="space-between">
        <Heading size="sm">
          {dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}
        </Heading>
        <Heading size="sm">{`Id: ${_id}`}</Heading>
      </Box>
      <Divider />

      <div className="flex flex-row justify-between text-md font-bold ">
        <div>Product Name</div>
        <div>Price</div>
      </div>
      {orderItems.map(({ _id, price, quantity, food: { name } }) => (
        <div className="flex flex-row justify-between" key={_id}>
          <div>{`${name} x${quantity}`}</div>
          <div>{`$${price}`}</div>
        </div>
      ))}
      <Divider />
      <div className="flex flex-row justify-between font-bold">
        <div>Total</div>
        <div>{`$${totalPrice}`}</div>
      </div>
    </Box>
  )
}
