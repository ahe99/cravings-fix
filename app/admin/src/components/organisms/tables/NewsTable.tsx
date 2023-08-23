import { Key } from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

import { News } from '@/models/News'
import { sortFn, dateSortFn } from '@/helpers/sort'
import { useTableSearch } from '@/hooks'

interface NewsTableProps {
  news: News[]
  onClickItem?: (news: News) => void
  onSelectItem?: (selectedRowKeys: Key[]) => void
}

export const NewsTable = ({
  news,
  onClickItem = () => {},
  onSelectItem = () => {},
}: NewsTableProps) => {
  const { register } = useTableSearch()

  const columns: ColumnsType<News> = [
    {
      title: '_id',
      dataIndex: '_id',
      ellipsis: true,
      width: '10%',
      ...register('_id'),
    },
    {
      title: 'Author',
      dataIndex: ['author', 'username'],
      sorter: (a, b) => sortFn(a.title, b.title),
      ...register('author'),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      ellipsis: true,
      sorter: (a, b) => sortFn(a.title, b.title),
      ...register('title'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
      sorter: (a, b) => sortFn(a.title, b.title),
      ...register('title'),
    },
    {
      title: 'Policy',
      dataIndex: 'policy',
      sorter: (a, b) => sortFn(a.title, b.title),
      ...register('policy'),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      sorter: (a, b) => dateSortFn(dayjs(a.createdAt), dayjs(b.createdAt)),
      render: (createdAt) => dayjs(createdAt).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      sorter: (a, b) => dateSortFn(dayjs(a.updatedAt), dayjs(b.updatedAt)),
      render: (updatedAt) => dayjs(updatedAt).format('YYYY-MM-DD HH:mm'),
    },
  ]

  const rowSelection = {
    onChange: onSelectItem,
    getCheckboxProps: (record: News) => ({
      name: record._id,
    }),
  }

  return (
    <Table
      columns={columns}
      dataSource={news}
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
      rowKey={(row) => row._id}
    />
  )
}
