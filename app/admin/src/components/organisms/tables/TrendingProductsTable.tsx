import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { TrendingProduct } from '@/models/Trending'
import { sortFn } from '@/helpers/sort'
import { useTableSearch } from '@/hooks'

import CSS from './ProducsTable.module.css'

interface TrendingProductsTableProps {
  trendingProducts: TrendingProduct[]
  onClickItem?: (product: TrendingProduct) => void
}

export const TrendingProductsTable = ({
  trendingProducts,
  onClickItem = () => {},
}: TrendingProductsTableProps) => {
  const { register } = useTableSearch()

  const columns: ColumnsType<TrendingProduct> = [
    {
      title: 'Preview',
      dataIndex: 'images',
      render: (images: TrendingProduct['images'] = []) => (
        <img
          className={CSS.product_image}
          src={images[0] ? images[0].url : ''}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => sortFn(a.name, b.name),
      ...register('name'),
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
      title: 'Sold',
      dataIndex: 'sold',
      sorter: (a, b) => sortFn(a.sold, b.sold),
    },
    {
      title: 'Stock Quantity',
      dataIndex: 'stockQuantity',
      sorter: (a, b) => sortFn(a.stockQuantity, b.stockQuantity),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={trendingProducts}
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
