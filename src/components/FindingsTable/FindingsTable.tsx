import { Box, Paper } from '@mui/material'
import { GroupedFindingDataOutput } from '../../models/GroupedFindingDataOutput.interface'
import { HeaderCell } from '../../models/HeaderCell.interface'
import { capitalize, getSeverityChip, formatUrl } from '../../utils/helpers'
import FindingsTableContent from './components/FindingsTableContent'

export type SortableColumns = Exclude<keyof GroupedFindingDataOutput, "raw_findings">

const headerCells: HeaderCell<SortableColumns>[] = [
  {
    id: 'grouping_type',
    label: 'Grouping Type',
    minWidth: 170,
  },
  { 
    id: 'grouping_key', 
    label: 'Grouping Key', 
    minWidth: 100,
    columnValueFormat: (url: string): JSX.Element => formatUrl(url)
  },
  { 
    id: 'severity', 
    label: 'Severity', 
    minWidth: 170, 
    align: 'left',
    columnValueFormat: (severity: string): JSX.Element => getSeverityChip(severity)
  },
  {
    id: 'grouped_finding_created',
    label: 'Grouped Finding Created',
    minWidth: 170,
    align: 'left',
    tooltip: 'YYYY-MM-DD'
  },
  {
    id: 'sla',
    label: 'SLA',
    minWidth: 170,
    align: 'left',
    tooltip: 'YYYY-MM-DD'
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
    align: 'left',
    columnValueFormat: (description: string): JSX.Element => formatUrl(description)
  },
  {
    id: 'security_analyst',
    label: 'Security Analyst',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'owner',
    label: 'Owner',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'workflow',
    label: 'Workflow',
    minWidth: 170,
    align: 'left',
    columnValueFormat: (workflow: string): string => {
      /*
        NOTE :: json data reflects a table error "defualt-workflow" <<<< typo
        hard coding a fix here until db migration to fix column name is possible
      */
      const cleanVal = workflow.replace("defualt", "default").replace(/-/g, " ")
      return capitalize(cleanVal)
    }
  },
  {
    id: 'number_of_findings',
    label: '# of Findings',
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
    id: 'progress',
    label: 'Progress',
    minWidth: 170,
    align: 'left'
  },
]

interface GroupedFindingsTableProps {
  rows: GroupedFindingDataOutput[]
}

export default function FindingsTable(props: GroupedFindingsTableProps) {
  const { rows } = props
  const columnConfig = headerCells

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <FindingsTableContent rows={rows} columnConfig={columnConfig} />
      </Paper>
    </Box>
  )
}