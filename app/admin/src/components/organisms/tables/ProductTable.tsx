import dayjs from 'dayjs'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import Box from '@mui/material/Box'

import { Product } from '@/utils/Product'
import { usePagination, useSort } from '@/hooks'

import { Paper } from '@/components/atoms'

import CSS from './ProducsTable.module.css'
import { useState } from 'react'
import { Button, IconButton } from '@mui/material'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

interface ProductTableProps {
  products: Product[]
  onClickItem?: (productId: Product['_id']) => void
}
interface HeadCell {
  id: keyof Product
  label: string
  disablePadding: boolean
  sortable: boolean
  numeric: boolean
  hideable?: boolean
}

const headCells: HeadCell[] = [
  {
    id: 'name',
    sortable: true,
    numeric: false,
    disablePadding: false,
    label: 'Product Name',
  },
  {
    id: 'images',
    sortable: false,
    numeric: false,
    disablePadding: false,
    label: 'Preview',
    hideable: true,
  },
  {
    id: 'category',
    sortable: true,
    numeric: false,
    disablePadding: false,
    label: 'Caterory',
  },
  {
    id: 'price',
    sortable: true,
    numeric: true,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'stockQuantity',
    sortable: true,
    numeric: true,
    disablePadding: true,
    label: 'Stock Quantity',
  },
  {
    id: 'createdAt',
    sortable: true,
    numeric: true,
    disablePadding: false,
    label: 'Create Date',
  },
  {
    id: 'updatedAt',
    sortable: true,
    numeric: true,
    disablePadding: false,
    label: 'Last update',
  },
]
const createRows = ({
  _id,
  name,
  price,
  stockQuantity,
  category,
  createdAt,
  updatedAt,
  images,
}: Product) => ({
  _id,
  name,
  price,
  stockQuantity,
  categoryName: category.name,
  createdAt,
  updatedAt,
  image: images && images[0] ? images[0].url : '',
})
type Row = ReturnType<typeof createRows>

export const ProductTable = ({
  products,
  onClickItem = () => {},
}: ProductTableProps) => {
  const { updatePagination, currnetPage, rowsPerPage } = usePagination(10)
  const { orderBy, order, sortFn, updateSort } = useSort<Product>('createdAt')
  const [visibleImages, setVisibleImages] = useState<{
    [K in Product['_id']]: boolean
  }>({})
  const [isImagesAllVisible, setIsImagesAllVisible] = useState(false)

  const imageAction = {
    show: (_id: Product['_id']) =>
      setVisibleImages((prev) => ({
        ...prev,
        [_id]: true,
      })),
    hide: (_id: Product['_id']) =>
      setVisibleImages((prev) => ({
        ...prev,
        [_id]: false,
      })),
    showAll: () => {
      paginatedProducts.forEach(({ _id }) => {
        setVisibleImages((prev) => ({
          ...prev,
          [_id]: true,
        }))
        setIsImagesAllVisible(true)
      })
    },
    hideAll: () => {
      paginatedProducts.forEach(({ _id }) => {
        setVisibleImages((prev) => ({
          ...prev,
          [_id]: false,
        }))
      })
      setIsImagesAllVisible(false)
    },
  }

  const sortedProducts = sortFn(products)
  const paginatedProducts = sortedProducts.filter(
    (_, index) =>
      index >= rowsPerPage * currnetPage &&
      index < rowsPerPage * (currnetPage + 1),
  )
  return (
    <TableContainer component={Paper} className={CSS.table_container}>
      <Table sx={{ minWidth: 650 }} aria-label="produdcts-table">
        <TableHead>
          <TableRow>
            {headCells.map(
              ({ label, id, numeric, disablePadding, sortable, hideable }) => (
                <TableCell
                  key={id}
                  align={numeric ? 'right' : 'left'}
                  padding={disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === id ? order : false}
                >
                  {!sortable && (
                    <span className={CSS.table_head_text}>{label}</span>
                  )}
                  {sortable ? (
                    <TableSortLabel
                      active={orderBy === id}
                      direction={orderBy === id ? order : 'asc'}
                      onClick={() => updateSort(id)}
                    >
                      {orderBy === id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc'
                            ? 'sorted descending'
                            : 'sorted ascending'}
                        </Box>
                      ) : null}
                      <span className={CSS.table_head_text}>{label}</span>
                    </TableSortLabel>
                  ) : hideable && isImagesAllVisible ? (
                    <span>
                      <span className={CSS.table_head_text}>{label}</span>

                      <IconButton onClick={imageAction.hideAll}>
                        <MdVisibility />
                      </IconButton>
                    </span>
                  ) : (
                    <span>
                      <span className={CSS.table_head_text}>{label}</span>
                      <IconButton onClick={imageAction.showAll}>
                        <MdVisibilityOff />
                      </IconButton>
                    </span>
                  )}
                </TableCell>
              ),
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedProducts.map(
            ({
              _id,
              name,
              price,
              stockQuantity,
              category,
              createdAt,
              updatedAt,
              images,
            }) => (
              <TableRow
                key={_id}
                sx={{
                  'cursor': 'pointer',
                  '&:hover': { opacity: 0.4 },
                  'height': '6rem',
                }}
                hover={true}
                onClick={() => onClickItem(_id)}
              >
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell>
                  {visibleImages[_id] ? (
                    <img
                      className={CSS.product_image}
                      src={images[0] ? images[0].url : ''}
                      alt={name}
                      onClick={() => imageAction.hide(_id)}
                    />
                  ) : (
                    <Button onClick={() => imageAction.show(_id)}>
                      See Image
                    </Button>
                  )}
                </TableCell>

                <TableCell>{category.name}</TableCell>
                <TableCell align="right">{`$${price}`}</TableCell>
                <TableCell align="right">{stockQuantity}</TableCell>
                <TableCell align="right">
                  {dayjs(createdAt).format('YYYY-MM-DD')}
                </TableCell>
                <TableCell align="right">
                  {dayjs(updatedAt).format('YYYY-MM-DD')}
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={currnetPage}
        onPageChange={(_, newPage) => updatePagination.currnetPage(newPage)}
        onRowsPerPageChange={(e) =>
          updatePagination.rowsPerPage(Number(e.target.value))
        }
      />
    </TableContainer>
  )
}
