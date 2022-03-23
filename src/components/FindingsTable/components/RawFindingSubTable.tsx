import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material'
import { HeaderCell } from '../../../models/HeaderCell.interface'
import { RawFindingDataInput, convertRawToOutput } from '../../../models/RawFindingDataInput.interface'
import { capitalize, getSeverityChip, formatUrl, uid } from '../../../utils/helpers'

type Columns = keyof RawFindingDataInput

const subTableHeaderCells: HeaderCell<Columns>[] = [
  {
    id: 'source_security_tool_name',
    label: 'Source Security Tool Name',
    minWidth: 170,
  },
  { 
    id: 'source_security_tool_id', 
    label: 'Source Security Tool ID', 
    minWidth: 170,
  },
  { 
    id: 'source_collbartion_tool_name', 
    label: 'Source Collaboration Tool Name', 
    minWidth: 170, 
    align: 'left', 
  },
  {
    id: 'source_collbartion_tool_id',
    label: 'Source Collaboration Tool ID',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'severity',
    label: 'Severity',
    minWidth: 170,
    align: 'left',
    columnValueFormat: (severity: string): JSX.Element => getSeverityChip(severity)
  },
  {
    id: 'finding_created',
    label: 'Finding Created',
    minWidth: 170,
    align: 'left',
    tooltip: 'YYYY-MM-DD'
  },
  {
    id: 'ticket_created',
    label: 'Ticket Created',
    minWidth: 170,
    align: 'left',
    tooltip: 'YYYY-MM-DD'
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'asset',
    label: 'Asset',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'left',
    columnValueFormat: (status: string): string => capitalize(status, /_/g)
  },
  {
    id: 'remediation_url',
    label: 'Remediation URL',
    minWidth: 170,
    align: 'left',
    columnValueFormat: (url: string): JSX.Element => formatUrl(url)
  },
  {
    id: 'remediation_text',
    label: 'Remediation Text',
    minWidth: 170,
    align: 'left',
  },
]

interface RawFindingSubTableProps {
  rawFindings: RawFindingDataInput[]
}

export default function RawFindingSubTable(props: RawFindingSubTableProps) {
  const { rawFindings } = props
  const cleanRawFindings = rawFindings.map(convertRawToOutput)

  return (
    <Box sx={{ margin: 1 }}>
      <Typography variant="h6" gutterBottom component="div">
        Raw Finding Data
      </Typography>
      <Table aria-label="purchases">
        <TableHead>
          <TableRow>
            {subTableHeaderCells.map((column) => (
              <TableCell 
                key={`${column.id}-${uid()}`}
                style={{ minWidth: column.minWidth }} 
                align={column.align}>
                {
                  column.tooltip ?
                    <Tooltip title={column.tooltip} arrow placement="top">
                      <span>{column.label}</span>
                    </Tooltip> :
                  column.label
                }
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {cleanRawFindings.map((rawRow) => (
            <TableRow key={`${rawRow.id}-${uid()}`}>
              {subTableHeaderCells.map(column => (
                <TableCell 
                  key={`${column.id}-${uid()}`}
                  style={{ minWidth: column.minWidth }} 
                >
                  {
                    column.columnValueFormat ? 
                    column.columnValueFormat(rawRow[column.id]) : 
                    rawRow[column.id]
                  }
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}
