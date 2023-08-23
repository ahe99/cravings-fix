import { Button, Card } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, Navigate } from 'react-router-dom'
import { AxiosError } from 'axios'

import { Breadcrumbs } from '@/components/atoms'
import { NewsForm } from '@/components/organisms'

import { useNews, APIRequestEditNews } from '@/hooks'

import CSS from './NewsEditPage.module.css'

interface NewsEditPageProps {
  newsId: APIRequestEditNews['_id']
}

export const NewsEditPage = ({ newsId }: NewsEditPageProps) => {
  const navigate = useNavigate()

  const news = useNews()

  const onSubmit = async (formValues: APIRequestEditNews) => {
    try {
      console.log('formValues', formValues)
      await news.update.mutateAsync(formValues)
      navigate(-1)
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data ?? e.response)
      } else {
        console.log(e)
      }
    }
  }

  const currentNews = news.query.data?.find(({ _id }) => _id === newsId)
  if (currentNews === undefined || currentNews === null) {
    return <Navigate to="/news" />
  } else {
    return (
      <div className={CSS.news_edit_page}>
        <div className={CSS.header}>
          <Button
            type="primary"
            className={CSS.go_back_button}
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          />
          <Breadcrumbs />
        </div>
        <Card>
          <NewsForm.Edit initialValues={currentNews} onSubmit={onSubmit} />
        </Card>
      </div>
    )
  }
}
