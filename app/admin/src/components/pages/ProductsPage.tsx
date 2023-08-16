import { useMemo } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { useProducts } from '@/hooks'
import { ProductsTable } from '@/components/organisms'
import { Breadcrumbs } from '@/components/atoms'

import CSS from './ProductsPage.module.css'

export const ProductsPage = () => {
  const products = useProducts()

  const productsData = useMemo(
    () => products.query.data ?? [],
    [products.query.data],
  )

  return (
    <div className={CSS.products_page}>
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

      <ProductsTable products={productsData} />
    </div>
  )
}
