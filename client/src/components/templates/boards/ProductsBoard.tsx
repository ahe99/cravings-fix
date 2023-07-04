import React, { useState } from 'react'
import dayjs from 'dayjs'

import {
  Pagination,
  ProductList,
  ProductFilter,
  SortBaseType,
} from '@/components/organisms'

import { Product } from '@/utils/ProductData'
import { Category } from '@/utils/Category'

type ProductFilterType = {
  category: Category[]
  text: string
}

const PRODUCTS_PER_PAGE = 12

interface ProductsBoardProps {
  products?: Product[]
  categories?: Category[]
  productsPerPage?: number
  onClickItem?: (productId: Product['objectId']) => void
}

export const ProductsBoard = ({
  products = [],
  categories = [],
  productsPerPage = PRODUCTS_PER_PAGE,
  onClickItem = () => {},
}: ProductsBoardProps) => {
  const [filter, setFilter] = useState<ProductFilterType>({
    category: categories,
    text: '',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBase, setSortBase] = useState<SortBaseType>()

  const handleChangeSortBase = (newSortBase: SortBaseType) => {
    resetPagination()
    setSortBase(newSortBase)
  }

  const handleChangeCategory = (selectedCategory: Category) => {
    resetPagination()
    setFilter((prev) => {
      const { text, category } = prev
      let newCategory = []
      if (category.includes(selectedCategory)) {
        newCategory = category.filter((item) => item !== selectedCategory)
      } else {
        newCategory = [...category, selectedCategory]
      }

      return {
        text,
        category: newCategory,
      }
    })
  }

  const handleSelectAllCategory = () => {
    resetPagination()
    setFilter((prev) => {
      const { category } = prev
      if (category.length === categories.length) {
        return { ...prev, category: [] }
      } else {
        return { ...prev, category: categories }
      }
    })
  }

  const handleChangeSearchText = (newSearchText: string) => {
    resetPagination()
    setFilter((prev) => ({ ...prev, text: newSearchText }))
  }

  const handleSelectPage = (newPage: number) => {
    setCurrentPage(newPage)
    scrollToTop()
  }

  const resetPagination = () => {
    setCurrentPage(1)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0 })
  }

  const filteredProducts = products.filter(
    (product) =>
      filter.category.findIndex(
        ({ objectId }) => product.category_id === objectId,
      ) !== -1,
  )
  const searchedProducts = filteredProducts.filter((product) => {
    if (filter.text) {
      return product.name.toUpperCase().includes(filter.text.toUpperCase())
    } else {
      return true
    }
  })
  const sortedProducts = searchedProducts.sort((productA, productB) => {
    if (sortBase === 'ASCEND_CREATE_TIME') {
      return dayjs(productA.createdAt).diff(productB.createdAt)
    } else if (sortBase === 'DESCEND_CREATE_TIME') {
      return -dayjs(productA.createdAt).diff(productB.createdAt)
    } else if (sortBase === 'ASCEND_PRICE') {
      return productA.price - productB.price
    } else if (sortBase === 'DESCEND_PRICE') {
      return -(productA.price - productB.price)
    } else {
      return 0
    }
  })
  const paginatedProducts = sortedProducts.filter(
    (_, index) =>
      index >= productsPerPage * (currentPage - 1) &&
      index < productsPerPage * currentPage,
  )
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full flex-col gap-2">
        <ProductFilter
          categoryOptions={categories}
          selectedOptions={filter.category}
          onChangeSearchText={handleChangeSearchText}
          onSelectCategory={handleChangeCategory}
          onSelectAllCategory={handleSelectAllCategory}
          onChangeSortBase={handleChangeSortBase}
        />
        <ProductList onClickItem={onClickItem} products={paginatedProducts} />
      </div>
      <div className="mx-auto">
        <Pagination
          total={Math.ceil(searchedProducts.length / PRODUCTS_PER_PAGE)}
          currentPage={currentPage}
          onChange={handleSelectPage}
        />
      </div>
    </div>
  )
}
