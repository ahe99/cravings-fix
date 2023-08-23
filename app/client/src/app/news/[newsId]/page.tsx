import { notFound } from 'next/navigation'

import { NewsContentPage } from '@/components/pages'

import { API, SERVER } from '@/API'
import { News } from '@/models/News'

const getSpecificNews = (newsId: News['_id']) =>
  SERVER.request<News>(API.routes.news.data(newsId))

export default async function NewsRoute({
  params: { newsId },
}: {
  params: { newsId: News['_id'] }
}) {
  const prefetchNews = await getSpecificNews(newsId)
  // const notFoundNews = !prefetchNews?._id
  // if (notFoundNews) {
  //   notFound()
  // }

  return <NewsContentPage prefetchNews={prefetchNews} />
}
