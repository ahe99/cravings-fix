import { useMemo, useState, Key } from 'react'
import { Button, Card } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'

import {
  useCategories,
  useRightDrawer,
  useMessage,
  APIRequestCreateCategory,
  APIRequestEditCategory,
} from '@/hooks'
import { Category } from '@/models/Category'
import { exceptionHandler } from '@/helpers/exceptionHandler'

import { CategoriesTable, CategoryForm } from '@/components/organisms'
import { Breadcrumbs } from '@/components/atoms'

import CSS from './CategoriesPage.module.css'

export const CategoriesPage = () => {
  const { RightDrawer, actions } = useRightDrawer()
  const { message } = useMessage()
  const categories = useCategories()

  const [clickedCategory, setClickedCategory] = useState<Category | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<
    Category['_id'][]
  >([])

  const categoriesData = useMemo(
    () => categories.query.data ?? [],
    [categories.query.data],
  )

  const onCreateItem = () => {
    actions.open()
  }

  const onClickCategoryItem = (category: Category) => {
    setClickedCategory(category)
    actions.open()
  }

  const onCloseDrawer = () => {
    actions.close()
    setClickedCategory(null)
  }

  const onSubmit = {
    create: async (formValues: APIRequestCreateCategory) => {
      message.loading('In Progress...')
      try {
        await categories.create.mutateAsync(formValues)
        message.success('Category Created!')

        actions.close()
      } catch (e) {
        message.error(exceptionHandler(e))
      }
    },
    edit: async (formValues: APIRequestEditCategory) => {
      message.loading('In Progress...')
      try {
        await categories.update.mutateAsync(formValues)
        message.success('Category Updated!')

        actions.close()
        setClickedCategory(null)
      } catch (e) {
        message.error(exceptionHandler(e))
      }
    },
  }

  const onSelectItem = (selectedCategories: Key[]) => {
    setSelectedCategories(selectedCategories as Category['_id'][])
  }

  const onDeleteItems = async () => {
    message.loading('In Progress...')
    try {
      for (const selectedCategoryKey of selectedCategories) {
        await categories.delete.mutateAsync(selectedCategoryKey)
      }
      const isMultipleItemsDeleted = selectedCategories.length > 1
      message.success(
        isMultipleItemsDeleted ? 'Categories Deleted!' : 'Category Deleted!',
      )
      setSelectedCategories([])
    } catch (e) {
      message.error(exceptionHandler(e))
    }
  }

  return (
    <div className={CSS.categories_page}>
      <div className={CSS.header}>
        <Breadcrumbs />
        <Button
          type="primary"
          className={CSS.add_button}
          icon={<PlusOutlined />}
          onClick={onCreateItem}
        >
          NEW
        </Button>

        {selectedCategories.length !== 0 && (
          <Button
            type="dashed"
            danger
            className={CSS.delete_button}
            icon={<DeleteOutlined />}
            onClick={onDeleteItems}
          >
            DELETE
          </Button>
        )}
      </div>
      <Card>
        <CategoriesTable
          categories={categoriesData}
          onClickItem={onClickCategoryItem}
          onSelectItem={onSelectItem}
        />
      </Card>
      <RightDrawer
        onClose={onCloseDrawer}
        className={CSS.right_drawer}
        bodyStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          title={
            clickedCategory !== null ? 'Edit a Category' : 'Create a Category'
          }
        >
          {clickedCategory !== null ? (
            <CategoryForm.Edit
              initialValues={clickedCategory}
              onSubmit={onSubmit.edit}
            />
          ) : (
            <CategoryForm.Create onSubmit={onSubmit.create} />
          )}
        </Card>
      </RightDrawer>
    </div>
  )
}
