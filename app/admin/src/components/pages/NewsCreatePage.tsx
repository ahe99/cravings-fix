import { Button, Card } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

import { Breadcrumbs } from '@/components/atoms'
import { NewsForm } from '@/components/organisms'

import { useNews, APIRequestCreateNews } from '@/hooks'

import CSS from './NewsCreatePage.module.css'

export const NewsCreatePage = () => {
  const navigate = useNavigate()
  const news = useNews()

  const onSubmit = async (formValues: APIRequestCreateNews) => {
    try {
      await news.create.mutateAsync(formValues)
      navigate(-1)
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data ?? e.response)
      } else {
        console.log(e)
      }
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
