import { Key } from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

import { Category } from '@/models/Category'
import { sortFn, dateSortFn } from '@/helpers/sort'
import { useTableSearch } from '@/hooks'

interface CategoriesTableProps {
  categories: Category[]
  onClickItem?: (category: Category) => void
  onSelectItem?: (selectedRowKeys: Key[]) => void
}

export const CategoriesTable = ({
  categories,
  onClickItem = () => {},
  onSelectItem = () => {},
}: CategoriesTableProps) => {
  const { register } = useTableSearch()

  const columns: ColumnsType<Category> = [
    {
      title: '_id',
      dataIndex: '_id',
      ellipsis: true,
      width: '10%',
      ...register('_id'),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => sortFn(a.name, b.name),
      ...register('name'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
      ...register('description'),
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
    getCheckboxProps: (record: Category) => ({
      name: record._id,
    }),
  }

  return (
    <Table
      columns={columns}
      dataSource={categories}
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
