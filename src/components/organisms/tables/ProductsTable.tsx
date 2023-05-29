import dayjs from 'dayjs'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { Product } from '@/utils/ProductData'

import CSS from './ProducsTable.module.css'

interface ProductTableProps {
  products: Product[]
  onClickItem?: (productId: Product['id']) => void
}

export const ProductTable = ({
  products,
  onClickItem = () => {},
}: ProductTableProps) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Preview</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Caterory</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Stock Quantity</TableCell>
              <TableCell align="right">Create Date</TableCell>
              <TableCell align="right">Last update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(
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
                  <TableCell align="right">{category_name}</TableCell>
                  <TableCell align="right">{`${price}`}</TableCell>
                  <TableCell align="right">{stock_quantity}</TableCell>
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
      </TableContainer>
    </div>
  )
}
