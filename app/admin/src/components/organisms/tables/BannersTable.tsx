import { Key } from 'react'
import { Table, Image } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

import { Banner } from '@/models/Banner'
import { dateSortFn } from '@/helpers/sort'
import { useTableSearch } from '@/hooks'
import { DATE_TIME_FORMAT } from '@/helpers/date'

import CSS from './BannersTable.module.css'

interface BannersTableProps {
  banners: Banner[]
  onClickItem?: (banner: Banner) => void
  onSelectItem?: (selectedRowKeys: Key[]) => void
}

export const BannersTable = ({
  banners,
  onClickItem = () => {},
  onSelectItem = () => {},
}: BannersTableProps) => {
  const { register } = useTableSearch()

  const columns: ColumnsType<Banner> = [
    {
      title: '_id',
      dataIndex: 'imageId',
      ellipsis: true,
      width: '10%',
      ...register('imageId'),
    },
    {
      title: 'Preview',
      dataIndex: 'url',
      render: (url: Banner['url']) => (
        <Image className={CSS.banner_image} src={url} />
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      sorter: (a, b) => dateSortFn(dayjs(a.createdAt), dayjs(b.createdAt)),
      render: (createdAt) => dayjs(createdAt).format(DATE_TIME_FORMAT),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      sorter: (a, b) => dateSortFn(dayjs(a.updatedAt), dayjs(b.updatedAt)),
      render: (updatedAt) => dayjs(updatedAt).format(DATE_TIME_FORMAT),
    },
  ]

  const rowSelection = {
    onChange: onSelectItem,
    getCheckboxProps: (record: Banner) => ({
      name: record.imageId,
    }),
  }

  return (
    <Table
      columns={columns}
      dataSource={banners}
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
      }}
      onRow={(record) => {
        return {
          onClick: () => onClickItem(record),
        }
      }}
      style={{ cursor: 'pointer' }}
      rowKey="imageId"
    />
  )
}
