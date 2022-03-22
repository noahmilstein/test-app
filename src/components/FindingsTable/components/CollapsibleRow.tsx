import React from 'react'
import {
  Collapse,
  IconButton,
  TableCell,
  TableRow,
} from '@mui/material'
import {
  KeyboardArrowUp,
  KeyboardArrowDown
} from '@mui/icons-material'
import { capitalize, uid } from '../../../utils/helpers'
import { HeaderCell, GroupedFindingDataOutput } from '../../../models'
import RawFindingSubTable from './RawFindingSubTable'
import { SortableColumns } from '../FindingsTable'

interface CollapsibleRowProps {
  row: GroupedFindingDataOutput
  columnConfig: HeaderCell<SortableColumns>[]
}

export default function CollapsibleRow(props: CollapsibleRowProps) {
  const { row, columnConfig } = props
  const [open, setOpen] = React.useState(false)
  const cleanColumns = columnConfig.filter(col => col.id !== 'grouping_type')

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover tabIndex={-1}>
        <TableCell
          component="th"
          id={row.id}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          {capitalize(row.grouping_type)}
        </TableCell>
        {cleanColumns.map(column => (
          <TableCell align={column.align} key={`${column.id}-${uid()}`}>
            {column.columnValueFormat ? column.columnValueFormat(row[column.id]) : row[column.id]}
          </TableCell>
        ))}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <RawFindingSubTable rawFindings={row.raw_findings} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
