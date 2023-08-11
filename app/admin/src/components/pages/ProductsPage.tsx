import { useMemo } from 'react'
import { Button } from '@mui/material'
import { MdAdd } from 'react-icons/md'

import { useProducts } from '@/hooks'
import { ProductTable } from '@/components/organisms'
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
          variant="contained"
          className={CSS.add_button}
          endIcon={<MdAdd />}
        >
          New
        </Button>
      </div>

      <ProductTable products={productsData} />
    </div>
  )
}
