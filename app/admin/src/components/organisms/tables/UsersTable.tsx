import { Key } from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

import { User } from '@/models/User'
import { sortFn, dateSortFn } from '@/helpers/sort'
import { useTableSearch } from '@/hooks'

interface UsersTableProps {
  users: User[]
  onClickItem?: (user: User) => void
  onSelectItem?: (selectedRowKeys: Key[]) => void
}

export const UsersTable = ({
  users,
  onClickItem = () => {},
  onSelectItem = () => {},
}: UsersTableProps) => {
  const { register } = useTableSearch()

  const columns: ColumnsType<User> = [
    {
      title: '_id',
      dataIndex: '_id',
      ellipsis: true,
      width: '10%',
      ...register('_id'),
    },
    {
      title: 'Name',
      dataIndex: 'username',
      sorter: (a, b) => sortFn(a.username, b.username),
      ...register('username'),
    },
    {
      title: 'Description',
      dataIndex: 'role',
      ellipsis: true,
      sorter: (a, b) => sortFn(a.username, b.username),
      ...register('role'),
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
    getCheckboxProps: (record: User) => ({
      name: record._id,
    }),
  }

  return (
    <Table
      columns={columns}
      dataSource={users}
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
      rowKey="_id"
    />
  )
}
