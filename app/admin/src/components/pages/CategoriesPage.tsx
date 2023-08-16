import { useMemo } from 'react'
import { Button, Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { useCategories } from '@/hooks'
import { CategoriesTable } from '@/components/organisms'
import { Breadcrumbs } from '@/components/atoms'

import CSS from './CategoriesPage.module.css'

export const CategoriesPage = () => {
  const categories = useCategories()

  const categoriesData = useMemo(
    () => categories.query.data ?? [],
    [categories.query.data],
  )

  return (
    <div className={CSS.categories_page}>
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
      <Card>
        <CategoriesTable categories={categoriesData} />
      </Card>
    </div>
  )
}
