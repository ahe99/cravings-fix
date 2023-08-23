import { Box } from '@chakra-ui/react'

import { NewsItem } from '@/components/molecules'

import { News } from '@/models/News'

interface NewsListProps {
  news?: News[]
  onClickItem?: (newsId: News['_id']) => void
}

export const NewsList = ({
  news = [],
  onClickItem = () => {},
}: NewsListProps) => {
  return (
    <Box className="grid grid-cols-3" gap={4}>
      {news.map((newsItem) => (
        <NewsItem news={newsItem} key={newsItem._id} onClick={onClickItem} />
      ))}
    </Box>
  )
}
