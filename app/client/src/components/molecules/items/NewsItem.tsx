import { Box, Card, Divider, Heading } from '@chakra-ui/react'
import { MdOutlineTimer } from 'react-icons/md'
import dayjs from 'dayjs'

import { News } from '@/models/News'

interface NewsItemProps {
  news: News
  onClick?: (newsId: News['_id']) => void
}

export const NewsItem = ({
  news: { _id, title, description, createdAt },
  onClick = () => {},
}: NewsItemProps) => {
  return (
    <Box
      className=" bg-primary-200 hover:cursor-pointer hover:opacity-40 rounded-md"
      p="4"
      display="flex"
      flexFlow="column"
      gap={4}
      w="full"
      onClick={() => onClick(_id)}
    >
      <Box>
        <Heading size="md" className="line-clamp-1" w="full" mb={1}>
          {title}
        </Heading>
        <Box display="flex" className="text-sm" alignItems="center" gap={1}>
          <MdOutlineTimer className="text-md" />
          {dayjs(createdAt).format('YYYY-MM-DD')}
        </Box>
      </Box>

      <Box className="line-clamp-4">{description}</Box>
    </Box>
  )
}
