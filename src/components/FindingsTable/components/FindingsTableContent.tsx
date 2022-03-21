import React from 'react'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableContainer,
  Paper
} from '@mui/material'
import { SortableColumns } from '../FindingsTable'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import EnhancedTableHead from './EnhancedTableHead'
import CollapsibleRow from './CollapsibleRow'
import { GroupedFindingDataOutput } from '../../../models/GroupedFindingDataOutput'
import { HeaderCell } from '../../../models/HeaderCell'
import { Order } from '../../../models/Order'
import { getComparator, stableSort, uid } from '../../../utils/helpers'

export interface GroupedFindingsTableContentProps {
  rows: GroupedFindingDataOutput[]
  columnConfig: HeaderCell<SortableColumns>[]
}

export default function FindingsTableContent(props: GroupedFindingsTableContentProps) {
  const { rows, columnConfig } = props
  const [filteredRows, setFilteredRows] = React.useState(rows)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<SortableColumns>('grouping_type')

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage)

 const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
   setRowsPerPage(parseInt(event.target.value, 10))
   setPage(0)
 }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: SortableColumns,
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  React.useEffect(() => {
    const filterRes = rows.filter(row => {
      const objVals = Object.values(row).filter(val => typeof val === 'string')
      return objVals.some(objVal => objVal.toLowerCase().includes(searchTerm.toLowerCase()))
    })
    setFilteredRows(filterRes)
  }, [searchTerm])

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <>
      <EnhancedTableToolbar setSearchTerm={setSearchTerm} />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headerCells={columnConfig}
          />
          <TableBody>
            {stableSort(filteredRows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => <CollapsibleRow key={`${row.id}-${uid()}`} row={row} columnConfig={columnConfig} />)}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}