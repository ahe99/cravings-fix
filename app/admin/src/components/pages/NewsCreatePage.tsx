import { Button, Card } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import { Breadcrumbs } from '@/components/atoms'
import { NewsForm } from '@/components/organisms'

import { useNews, useMessage, APIRequestCreateNews } from '@/hooks'
import { exceptionHandler } from '@/helpers/exceptionHandler'

import CSS from './NewsCreatePage.module.css'

export const NewsCreatePage = () => {
  const navigate = useNavigate()
  const { message } = useMessage()

  const news = useNews()

  const onSubmit = async (formValues: APIRequestCreateNews) => {
    message.loading('In Progress...')
    try {
      await news.create.mutateAsync(formValues)
      message.success('News Created!')
      navigate(-1)
    } catch (e) {
      message.error(exceptionHandler(e))
    }
  }

  return (
    <div className={CSS.news_create_page}>
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
        <NewsForm.Create onSubmit={onSubmit} />
      </Card>
    </div>
  )
}
