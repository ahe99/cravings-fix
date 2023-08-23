'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { useNews } from '@/hooks'
import { News } from '@/models/News'

import { NewsList } from '@/components/organisms'

interface NewsPageProps {
  prefetchNews?: News[]
}
export const NewsPage = ({ prefetchNews = [] }: NewsPageProps) => {
  const router = useRouter()
  const news = useNews(prefetchNews)

  const newsData = useMemo(() => {
    return news.query.data ?? []
  }, [news.query.data])

  const handleClickNewsItem = (newsId: News['_id']) => {
    router.push(`news/${newsId}`)
  }
  return (
    <main className="page-container">
      <h1 className="mb-8 text-3xl">All News</h1>

      <NewsList news={newsData} onClickItem={handleClickNewsItem} />
    </main>
  )
}
