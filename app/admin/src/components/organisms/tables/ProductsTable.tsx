import { Key } from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

import { Product } from '@/models/Product'
import { sortFn, dateSortFn } from '@/helpers/sort'
import { useTableSearch } from '@/hooks'

import CSS from './ProducsTable.module.css'

interface ProductsTableProps {
  products: Product[]
  onClickItem?: (product: Product) => void
  onSelectItem?: (selectedRowKeys: Key[]) => void
}

export const ProductsTable = ({
  products,
  onClickItem = () => {},
  onSelectItem = () => {},
}: ProductsTableProps) => {
  const { register } = useTableSearch()

  const columns: ColumnsType<Product> = [
    {
      title: '_id',
      dataIndex: '_id',
      ellipsis: true,
      ...register('_id'),
    },

    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => sortFn(a.name, b.name),
      ...register('name'),
    },
    {
      title: 'Preview',
      dataIndex: 'images',
      render: (images: Product['images'] = []) => (
        <img
          className={CSS.product_image}
          src={images[0] ? images[0].url : ''}
        />
      ),
    },
    {
      title: 'Category',
      dataIndex: ['category', 'name'],
      sorter: (a, b) => sortFn(a.category.name, b.category.name),
      ...register('category'),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => sortFn(a.price, b.price),
    },
    {
      title: 'Stock Quantity',
      dataIndex: 'stockQuantity',
      sorter: (a, b) => sortFn(a.stockQuantity, b.stockQuantity),
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
    getCheckboxProps: (record: Product) => ({
      name: record._id,
    }),
  }

  return (
    <Table
      columns={columns}
      dataSource={products}
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
