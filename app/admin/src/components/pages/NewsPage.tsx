import { Key, useState, useMemo } from 'react'
import { Button } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import { Breadcrumbs } from '@/components/atoms'
import { NewsTable } from '@/components/organisms'

import { News } from '@/models/News'
import { useNews, useMessage } from '@/hooks'
import { exceptionHandler } from '@/helpers/exceptionHandler'

import CSS from './NewsPage.module.css'

export const NewsPage = () => {
  const navigate = useNavigate()
  const { message } = useMessage()
  const news = useNews()
  const [selectedNews, setSelectedNews] = useState<News['_id'][]>([])

  const newsData = useMemo(() => {
    return news.query.data ?? []
  }, [news.query.data])

  const onSelectItem = (selectedCategories: Key[]) => {
    setSelectedNews(selectedCategories as News['_id'][])
  }

  const onDeleteItems = async () => {
    message.loading('In Progress...')
    try {
      for (const selectedNewsKey of selectedNews) {
        await news.delete.mutateAsync(selectedNewsKey)
      }
      message.success('News Deleted!')
      setSelectedNews([])
    } catch (e) {
      message.error(exceptionHandler(e))
    }
  }

  return (
    <div className={CSS.news_page}>
      <div className={CSS.header}>
        <Breadcrumbs />
        <Button
          type="primary"
          className={CSS.add_button}
          icon={<PlusOutlined />}
          onClick={() => navigate('/news/create')}
        >
          NEW
        </Button>

        {selectedNews.length !== 0 && (
          <Button
            type="dashed"
            danger
            className={CSS.delete_button}
            icon={<DeleteOutlined />}
            onClick={onDeleteItems}
          >
            DELETE
          </Button>
        )}
      </div>
      <NewsTable
        news={newsData}
        onSelectItem={onSelectItem}
        onClickItem={(news) => navigate(`/news/${news._id}`)}
      />
    </div>
  )
}
