import { useState } from 'react'

export const usePagination = (defaultRowsPerPage = 5, initPage = 0) => {
  const [currnetPage, setCurrentPage] = useState(initPage)
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage)

  const updatePagination = {
    currnetPage: (value: number) => {
      setCurrentPage(value)
    },
    rowsPerPage: (value: number) => {
      setRowsPerPage(value)
    },
  }

  return {
    updatePagination,
    currnetPage,
    rowsPerPage,
  }
}
