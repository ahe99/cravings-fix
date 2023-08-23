import { API, SERVER } from '@/API'
import { News } from '@/models/News'

import { NewsPage } from '@/components/pages'

const getNews = () => SERVER.request<News[]>(API.routes.products.list)

export default async function News() {
  const prefetchNews = await getNews()
  return <NewsPage prefetchNews={prefetchNews} />
}
