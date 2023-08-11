import { useMemo } from 'react'
import { Button } from '@mui/material'
import { MdAdd } from 'react-icons/md'

import { useCategories } from '@/hooks'
import { CategoriesTable } from '@/components/organisms'
import { Breadcrumbs } from '@/components/atoms'

import CSS from './CategoriesPage.module.css'

export const CategoriesPage = () => {
  const categories = useCategories()

  const categoriesData = useMemo(() => categories.query.data ?? [], [categories.query.data])

  return (
    <div className={CSS.categories_page}>
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

      <CategoriesTable categories={categoriesData} />
    </div>
  )
}
