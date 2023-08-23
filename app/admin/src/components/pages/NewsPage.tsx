import { Key, useState, useMemo } from 'react'
import { Button } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

import { Breadcrumbs } from '@/components/atoms'
import { NewsTable } from '@/components/organisms'

import { News } from '@/models/News'
import { useNews } from '@/hooks/useNews'

import CSS from './NewsPage.module.css'

export const NewsPage = () => {
  const navigate = useNavigate()
  const news = useNews()
  const [selectedNews, setSelectedNews] = useState<News['_id'][]>([])

  const newsData = useMemo(() => {
    return news.query.data ?? []
  }, [news.query.data])

  const onSelectItem = (selectedCategories: Key[]) => {
    setSelectedNews(selectedCategories as News['_id'][])
  }

  const onDeleteItems = async () => {
    try {
      for (const selectedNewsKey of selectedNews) {
        await news.delete.mutateAsync(selectedNewsKey)
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data ?? e.response)
      } else {
        console.log(e)
      }
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
