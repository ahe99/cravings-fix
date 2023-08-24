import { useState, useMemo, Key } from 'react'
import { Button, Card } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'

import {
  useBanners,
  useRightDrawer,
  useMessage,
  APIRequestCreateBanner,
} from '@/hooks'
import { Banner } from '@/models/Banner'
import { exceptionHandler } from '@/helpers/exceptionHandler'

import { BannersTable, BannerForm } from '@/components/organisms'
import { Breadcrumbs } from '@/components/atoms'

import CSS from './BannersPage.module.css'

export const BannersPage = () => {
  const { RightDrawer, actions } = useRightDrawer()
  const { message } = useMessage()
  const banners = useBanners()

  const [selectedBanners, setSelectedBanners] = useState<Banner['imageId'][]>(
    [],
  )

  const bannersData = useMemo(
    () => banners.query.data ?? [],
    [banners.query.data],
  )

  const onCreateItem = () => {
    actions.open()
  }

  const onCloseDrawer = () => {
    actions.close()
  }

  const onSubmit = async (formValues: APIRequestCreateBanner) => {
    message.loading('In Progress...')
    try {
      await banners.create.mutateAsync(formValues)
      message.success('Banner Created!')
      actions.close()
    } catch (e) {
      message.error(exceptionHandler(e))
    }
  }

  const onSelectItem = (selectedBanners: Key[]) => {
    setSelectedBanners(selectedBanners as Banner['imageId'][])
  }

  const onDeleteItems = async () => {
    message.loading('In Progress...')
    try {
      for (const selectedBannerKey of selectedBanners) {
        await banners.delete.mutateAsync(selectedBannerKey)
      }
      const isMultipleItemsDeleted = selectedBanners.length > 1
      message.success(
        isMultipleItemsDeleted ? 'Banners Deleted!' : 'Banner Deleted!',
      )
      setSelectedBanners([])
    } catch (e) {
      message.error(exceptionHandler(e))
    }
  }

  return (
    <div className={CSS.banners_page}>
      <div className={CSS.header}>
        <Breadcrumbs />
        <Button
          type="primary"
          className={CSS.add_button}
          icon={<PlusOutlined />}
          onClick={onCreateItem}
        >
          NEW
        </Button>

        {selectedBanners.length !== 0 && (
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
      <Card>
        <BannersTable banners={bannersData} onSelectItem={onSelectItem} />
      </Card>
      <RightDrawer
        onClose={onCloseDrawer}
        className={CSS.right_drawer}
        bodyStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card title="Upload Banners">
          <BannerForm onSubmit={onSubmit} />
        </Card>
      </RightDrawer>
    </div>
  )
}
