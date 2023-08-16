import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { Breadcrumbs } from '@/components/atoms'
import { TextEditor } from '@/components/organisms/TextEditor'

import CSS from './NewsPage.module.css'

export const NewsPage = () => {
  return (
    <div className={CSS.news_page}>
      <div className={CSS.header}>
        <Breadcrumbs />
        <Button
          type="primary"
          className={CSS.add_button}
          icon={<PlusOutlined />}
        >
          NEW
        </Button>
      </div>
      <TextEditor />
    </div>
  )
}
