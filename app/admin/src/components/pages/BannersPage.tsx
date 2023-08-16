import { useMemo } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { useBanners } from '@/hooks'
import { BannersTable } from '@/components/organisms'
import { Breadcrumbs } from '@/components/atoms'

import CSS from './BannersPage.module.css'

export const BannersPage = () => {
  const banners = useBanners()

  const bannersData = useMemo(
    () => banners.query.data ?? [],
    [banners.query.data],
  )

  return (
    <div className={CSS.banners_page}>
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

      <BannersTable banners={bannersData} />
    </div>
  )
}
