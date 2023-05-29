import dayjs from 'dayjs'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import { visuallyHidden } from '@mui/utils'
import Box from '@mui/material/Box'

import { Product } from '@/utils/ProductData'
import { usePagination, useSort } from '@/hooks'

import CSS from './ProducsTable.module.css'

interface ProductTableProps {
  products: Product[]
  onClickItem?: (productId: Product['id']) => void
}
interface HeadCell {
  id: keyof Product
  label: string
  disablePadding: boolean
  sortable: boolean
  numeric: boolean
}

const headCells: HeadCell[] = [
  {
    id: 'image',
    sortable: false,
    numeric: false,
    disablePadding: true,
    label: 'Preview',
  },
  {
    id: 'name',
    sortable: true,
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'category_name',
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
    id: 'stock_quantity',
    sortable: true,
    numeric: true,
    disablePadding: false,
    label: 'Stock Quantity',
  },
  {
    id: 'createdAt',
    sortable: true,
    numeric: false,
    disablePadding: false,
    label: 'Create Date',
  },
  {
    id: 'updatedAt',
    sortable: true,
    numeric: false,
    disablePadding: false,
    label: 'Last update',
  },
]

export const ProductTable = ({
  products,
  onClickItem = () => {},
}: ProductTableProps) => {
  const { updatePagination, currnetPage, rowsPerPage } = usePagination(10)
  const { orderBy, order, sortFn, updateSort } = useSort<Product>('createdAt')

  const sortedProducts = sortFn(products)
  const paginatedProducts = sortedProducts.filter(
    (_, index) =>
      index >= rowsPerPage * currnetPage &&
      index < rowsPerPage * (currnetPage + 1),
  )
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                        {label}
                        {orderBy === id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === 'desc'
                              ? 'sorted descending'
                              : 'sorted ascending'}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    ) : (
                      label
                    )}
                  </TableCell>
                ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map(
              ({
                id,
                name,
                price,
                stock_quantity,
                category_name,
                createdAt,
                updatedAt,
                image,
              }) => (
                <TableRow
                  key={id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    'cursor': 'pointer',
                    '&:hover': { opacity: 0.4 },
                  }}
                  onClick={() => onClickItem(id)}
                >
                  <TableCell component="th" scope="row">
                    <img
                      className={CSS.product_image}
                      src={image.src}
                      alt={name}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell>{category_name}</TableCell>
                  <TableCell align="right">{`${price}`}</TableCell>
                  <TableCell align="right">{stock_quantity}</TableCell>
                  <TableCell>{dayjs(createdAt).format('YYYY-MM-DD')}</TableCell>
                  <TableCell>{dayjs(updatedAt).format('YYYY-MM-DD')}</TableCell>
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
    </div>
  )
}
