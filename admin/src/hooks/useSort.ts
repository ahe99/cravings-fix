import { useState } from 'react'

type Order = 'asc' | 'desc'

export const useSort = <ColumnType>(defaultOrderBy: keyof ColumnType) => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof ColumnType>(defaultOrderBy)

  const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  const sortFn = (source: ColumnType[] = []) => {
    return source.sort((formmer, latter) =>
      order === 'desc'
        ? descendingComparator(formmer, latter, orderBy)
        : -descendingComparator(formmer, latter, orderBy),
    )
  }

  const updateSort = (value: keyof ColumnType) => {
    const isAsc = orderBy === value && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(value)
  }

  return {
    order,
    orderBy,
    sortFn,
    updateSort,
  }
}
