import { Button, Card } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, Navigate } from 'react-router-dom'

import { Breadcrumbs } from '@/components/atoms'
import { NewsForm } from '@/components/organisms'

import { useNews, useMessage, APIRequestEditNews } from '@/hooks'
import { exceptionHandler } from '@/helpers/exceptionHandler'

import CSS from './NewsEditPage.module.css'

interface NewsEditPageProps {
  newsId: APIRequestEditNews['_id']
}

export const NewsEditPage = ({ newsId }: NewsEditPageProps) => {
  const navigate = useNavigate()
  const { message } = useMessage()

  const news = useNews()

  const onSubmit = async (formValues: APIRequestEditNews) => {
    message.loading('In Progress...')
    try {
      await news.update.mutateAsync(formValues)
      message.success('News Updated!')
      navigate(-1)
    } catch (e) {
      message.error(exceptionHandler(e))
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
