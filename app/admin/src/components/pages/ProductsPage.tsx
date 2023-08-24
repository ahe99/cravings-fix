import { useMemo, useState, Key } from 'react'
import { Button, Card } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'

import {
  useProducts,
  useCategories,
  useMessage,
  useRightDrawer,
  APIRequestEditProduct,
  APIRequestCreateProduct,
} from '@/hooks'
import { exceptionHandler } from '@/helpers/exceptionHandler'

import { ProductsTable, ProductForm } from '@/components/organisms'
import { Breadcrumbs } from '@/components/atoms'

import CSS from './ProductsPage.module.css'
import { Product } from '@/models/Product'

export const ProductsPage = () => {
  const { RightDrawer, actions } = useRightDrawer()
  const { message } = useMessage()
  const products = useProducts()
  const categories = useCategories()

  const [clickedProduct, setClickedProduct] = useState<Product | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<Product['_id'][]>([])

  const productsData = useMemo(
    () => products.query.data ?? [],
    [products.query.data],
  )

  const categoryOptions = useMemo(
    () => categories.query.data ?? [],
    [categories.query.data],
  )

  const onCreateItem = () => {
    actions.open()
  }

  const onClickProductItem = (product: Product) => {
    setClickedProduct(product)
    actions.open()
  }

  const onCloseDrawer = () => {
    actions.close()
    setClickedProduct(null)
  }

  const onSubmit = {
    create: async (formValues: APIRequestCreateProduct) => {
      message.loading('In Progress...')
      try {
        await products.create.mutateAsync(formValues)
        message.success('Product Created!')

        actions.close()
      } catch (e) {
        message.error(exceptionHandler(e))
      }
    },
    edit: async (formValues: APIRequestEditProduct) => {
      message.loading('In Progress...')
      try {
        await products.update.mutateAsync(formValues)
        message.success('Product Updated!')

        actions.close()
        setClickedProduct(null)
      } catch (e) {
        message.error(exceptionHandler(e))
      }
    },
  }
  const onSelectItem = (selectedCategories: Key[]) => {
    setSelectedProducts(selectedCategories as Product['_id'][])
  }

  const onDeleteItems = async () => {
    message.loading('In Progress...')
    try {
      for (const selectedProductKey of selectedProducts) {
        await products.delete.mutateAsync(selectedProductKey)
      }
      const isMultipleItemsDeleted = selectedProducts.length > 1
      message.success(
        isMultipleItemsDeleted ? 'Products Deleted!' : 'Product Deleted!',
      )
      setSelectedProducts([])
    } catch (e) {
      message.error(exceptionHandler(e))
    }
  }

  return (
    <div className={CSS.products_page}>
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

        {selectedProducts.length !== 0 && (
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
        <ProductsTable
          products={productsData}
          onClickItem={onClickProductItem}
          onSelectItem={onSelectItem}
        />
      </Card>
      <RightDrawer onClose={onCloseDrawer} size="large">
        <Card
          title={
            clickedProduct !== null ? 'Edit a Product' : 'Create a Product'
          }
        >
          {clickedProduct !== null ? (
            <ProductForm.Edit
              initialValues={clickedProduct}
              categoryOptions={categoryOptions}
              onSubmit={onSubmit.edit}
            />
          ) : (
            <ProductForm.Create
              categoryOptions={categoryOptions}
              onSubmit={onSubmit.create}
            />
          )}
        </Card>
      </RightDrawer>
    </div>
  )
}
