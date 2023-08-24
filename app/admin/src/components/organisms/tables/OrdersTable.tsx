import { Key } from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

import { Order } from '@/models/Order'
import { sortFn, dateSortFn } from '@/helpers/sort'
import { useTableSearch } from '@/hooks'
import { DATE_TIME_FORMAT } from '@/helpers/date'

interface OrdersTableProps {
  orders: Order[]
  onClickItem?: (order: Order) => void
  onSelectItem?: (selectedRowKeys: Key[]) => void
}

export const OrdersTable = ({
  orders,
  onClickItem = () => {},
  onSelectItem = () => {},
}: OrdersTableProps) => {
  const { register } = useTableSearch()

  const columns: ColumnsType<Order> = [
    {
      title: '_id',
      dataIndex: '_id',
      ellipsis: true,
      width: '10%',
      ...register('_id'),
    },
    {
      title: 'Buyer',
      dataIndex: ['user', 'username'],
      sorter: (a, b) => sortFn(a.user.username, b.user.username),
      ...register('user'),
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      sorter: (a, b) => sortFn(a.totalPrice, b.totalPrice),
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
    getCheckboxProps: (record: Order) => ({
      name: record._id,
    }),
  }

  return (
    <Table
      columns={columns}
      dataSource={orders}
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
