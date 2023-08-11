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

import { Order } from '@/utils/Order'
import { usePagination, useSort } from '@/hooks'

import { Paper } from '@/components/atoms'

import CSS from './ProducsTable.module.css'

interface OrderTableProps {
  orders: Order[]
  onClickItem?: (productId: Order['_id']) => void
}
interface HeadCell {
  id: keyof Order
  label: string
  disablePadding: boolean
  sortable: boolean
  numeric: boolean
}

const headCells: HeadCell[] = [
  {
    id: 'user',
    sortable: true,
    numeric: false,
    disablePadding: false,
    label: 'User',
  },
  {
    id: 'totalPrice',
    sortable: true,
    numeric: true,
    disablePadding: false,
    label: 'Total Price',
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

export const OrderTable = ({
  orders,
  onClickItem = () => {},
}: OrderTableProps) => {
  const { updatePagination, currnetPage, rowsPerPage } = usePagination(10)
  const { orderBy, order, sortFn, updateSort } = useSort<Order>('createdAt')

  const sortedOrders = sortFn(orders)
  const paginatedOrders = sortedOrders.filter(
    (_, index) =>
      index >= rowsPerPage * currnetPage &&
      index < rowsPerPage * (currnetPage + 1),
  )
  return (
    <TableContainer component={Paper}>
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
                      <span className={CSS.table_head_text}>{label}</span>
                      {orderBy === id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc'
                            ? 'sorted descending'
                            : 'sorted ascending'}
                        </Box>
                      ) : null}
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
          {paginatedOrders.map(
            ({ _id, user, totalPrice, createdAt, updatedAt }) => (
              <TableRow
                key={_id}
                sx={{
                  'cursor': 'pointer',
                  '&:hover': { opacity: 0.4 },
                }}
                hover={true}
                onClick={() => onClickItem(_id)}
              >
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>

                <TableCell align="right">{`$${totalPrice}`}</TableCell>
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
        count={orders.length}
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
