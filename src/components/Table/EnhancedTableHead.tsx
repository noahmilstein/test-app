import React from 'react'
import {
  Box,
  TableCell,
  TableSortLabel,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'
import { SortableColumns } from './GroupedFindingsTable'
import { Order } from '../../models/Order'
import { HeaderCell } from '../../models/HeaderCell'
import { uid } from '../../utils/helpers'
import { visuallyHidden } from '@mui/utils'


interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: SortableColumns) => void
  order: Order
  orderBy: string
  headerCells: HeaderCell<SortableColumns>[]
}

export default function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, headerCells, onRequestSort } = props

  const createSortHandler =
    (property: SortableColumns) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        {headerCells.map((headCell) => (
          <TableCell
            key={`${headCell.id}-${uid()}`}
            align={headCell.align}
            padding='normal'
            style={{ minWidth: headCell.minWidth }}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.tooltip ?
                <Tooltip title={headCell.tooltip} arrow placement="top">
                  <span>{headCell.label}</span>
                </Tooltip> :
                headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
