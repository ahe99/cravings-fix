import dayjs from 'dayjs'
import { Box, IconButton, Heading } from '@chakra-ui/react'
import { MdArrowBack } from 'react-icons/md'
import { useRouter } from 'next/navigation'

import { Divider } from '@/components/atoms'
import { ProductProfileCard } from '@/components/molecules'

import { Order } from '@/utils/Order'
interface OrderPageProps {
  prefetchOrder: Order
}

export const OrderPage = ({
  prefetchOrder: { _id, createdAt, totalPrice, orderItems = [] },
}: OrderPageProps) => {
  const router = useRouter()
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
            {dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}
          </Heading>
          <Heading size="sm">{`Id: ${_id}`}</Heading>
        </Box>
        <Divider />
        {orderItems.map((orderItem) => (
          <div key={orderItem._id} className="flex flex-row">
            <ProductProfileCard className="flex-1" product={orderItem.food} />
            <div className="flex-shrink-0 self-start font-bold">{`x${orderItem.quantity}`}</div>
          </div>
        ))}
        <Divider />

        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between text-lg font-bold">
            <div>Total</div>
            <div>{`$${totalPrice}`}</div>
          </div>
        </div>
      </Box>
    </main>
  )
}
