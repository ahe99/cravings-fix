'use client'

import { useRouter } from 'next/navigation'
import { Heading, Box, IconButton } from '@chakra-ui/react'
import { MdOutlineKeyboardArrowLeft, MdOutlineTimer } from 'react-icons/md'

import { News } from '@/models/News'
import dayjs from 'dayjs'

interface NewsPageProps {
  prefetchNews: News
}
export const NewsContentPage = ({
  prefetchNews: { title, content, createdAt },
}: NewsPageProps) => {
  const router = useRouter()
  return (
    <main className="page-container ">
      <Box>
        <IconButton
          aria-label="go-back"
          icon={
            <Box display="flex" alignItems="center">
              <MdOutlineKeyboardArrowLeft className="text-4xl" />
              <Box p={2} pl={0}>
                Go Back
              </Box>
            </Box>
          }
          onClick={() => router.back()}
        />
      </Box>
      <Box className="grid grid-flow-row gap-4 lg:grid-cols-3">
        <Box>
          <Heading mb={4}>{title}</Heading>
          <Box display="flex" alignItems="center" gap={1}>
            <MdOutlineTimer className="text-lg" />
            {dayjs(createdAt).format('YYYY-MM-DD')}
          </Box>
        </Box>
        <div
          className="prose col-span-2 lg:prose-xl"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </Box>
    </main>
  )
}
