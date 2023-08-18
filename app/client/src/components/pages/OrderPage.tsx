import { useMemo } from 'react'
import { Box, IconButton, Heading } from '@chakra-ui/react'
import { MdArrowBack } from 'react-icons/md'
import { notFound, useRouter } from 'next/navigation'
import dayjs from 'dayjs'

import { Divider } from '@/components/atoms'
import { ProductProfileCard } from '@/components/molecules'

import { useOrders } from '@/hooks'
import { Order } from '@/models/Order'
interface OrderPageProps {
  orderId: Order['_id']
}

export const OrderPage = ({ orderId }: OrderPageProps) => {
  const router = useRouter()
  const orders = useOrders()

  const orderData: Order | undefined = useMemo(() => {
    return orders.query.data?.find(({ _id }) => _id === orderId)
  }, [orders.query.data])

  if (orderData === undefined) {
    notFound()
  }
  return (
    <main className="page-container">
      <Box display="flex" flexFlow="row" gap={4}>
        <IconButton
          color="brown.800"
          colorScheme="brown"
          bg=""
          _hover={{ bg: 'brown.100' }}
          aria-label="Profile"
          icon={<MdArrowBack className="text-4xl" />}
          onClick={() => router.back()}
        />
        <h1 className="mb-8 text-3xl">Order Detail</h1>
      </Box>

      <Box
        className="border-brown-600 bg-primary-200"
        rounded="md"
        p={4}
        borderWidth={4}
        display="flex"
        flexFlow="column"
        gap={4}
      >
        <Box
          display="flex"
          flexFlow="row"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <Heading size="sm">
            {dayjs(orderData.createdAt).format('YYYY-MM-DD HH:mm:ss')}
          </Heading>
          <Heading size="sm">{`Id: ${orderData._id}`}</Heading>
        </Box>
        <Divider />
        {orderData.orderItems.map((orderItem) => (
          <div key={orderItem._id} className="flex flex-row">
            <ProductProfileCard className="flex-1" product={orderItem.food} />
            <div className="flex-shrink-0 self-start font-bold">{`x${orderItem.quantity}`}</div>
          </div>
        ))}
        <Divider />

        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between text-lg font-bold">
            <div>Total</div>
            <div>{`$${orderData.totalPrice}`}</div>
          </div>
        </div>
      </Box>
    </main>
  )
}
