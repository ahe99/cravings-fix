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

interface ProductTableProps {
  products: Product[]
  onClickItem?: (productId: Product['_id']) => void
}

const createRow = ({
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
type Row = ReturnType<typeof createRow>

interface HeadCell {
  id: keyof Row
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
    label: 'Product Name (With Image)',
  },
  {
    id: 'categoryName',
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

export const ProductTable = ({
  products,
  onClickItem = () => {},
}: ProductTableProps) => {
  const { updatePagination, currnetPage, rowsPerPage } = usePagination(10)
  const { orderBy, order, sortFn, updateSort } = useSort<Row>('createdAt')

  const rows = products.map(createRow)
  const sortedProducts = sortFn(rows)
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
              ({ label, id, numeric, disablePadding, sortable }) => (
                <TableCell
                  key={id}
                  align={numeric ? 'right' : 'left'}
                  padding={disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === id ? order : false}
                >
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
                  ) : (
                    <span className={CSS.table_head_text}>{label}</span>
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
              categoryName,
              createdAt,
              updatedAt,
              image,
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
                  <span className={CSS.product_name_cell}>
                    <img className={CSS.product_image} src={image} alt={name} />
                    {name}
                  </span>
                </TableCell>
                <TableCell>{categoryName}</TableCell>
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
