import { useMemo } from 'react'
import { Button } from '@mui/material'
import { MdAdd } from 'react-icons/md'

import { useProducts, useCategories } from '@/hooks'
import { ProductTable } from '@/components/organisms'
import { Breadcrumbs } from '@/components/atoms'

import CSS from './ProductsPage.module.css'

export const ProductsPage = () => {
  const products = useProducts()
  const categories = useCategories()

  const productsData = useMemo(
    () => products.query.data ?? [],
    [products.query.data],
  )

  const categoriesData = useMemo(
    () => categories.query.data ?? [],
    [categories.query.data],
  )

  const productsWithCategoryName = productsData.map(
    ({ categoryId, ...restObject }) => {
      const category = categoriesData.find(({ _id }) => _id === categoryId)

      return {
        categoryName: category?.name ?? '',
        ...restObject,
      }
    },
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

      <ProductTable products={productsWithCategoryName} />
    </div>
  )
}
