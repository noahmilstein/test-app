import { Box, Paper } from '@mui/material'
import { capitalize, getSeverityChip, formatUrl } from '../../utils/helpers'
import groupedFindingsJson from '../../assets/grouped_findings.json'
import rawFindingsJson from '../../assets/raw_findings.json'
import { GroupedFindingDataInput } from '../../models/GroupedFindingDataInput'
import { GroupedFindingDataOutput } from '../../models/GroupedFindingDataOutput'
import { HeaderCell } from '../../models/HeaderCell'
import GroupedFindingsTableContent from './GroupedFindingsTableContent'

export type SortableColumns = Exclude<keyof GroupedFindingDataOutput, "raw_findings">

const groupedFindingsData = [...groupedFindingsJson] // WORKING HERE : make API GET call
const rawFindingsData = [...rawFindingsJson] // WORKING HERE : make API GET call

const createData = (rawDatum: GroupedFindingDataInput): GroupedFindingDataOutput => {
  const raw_findings = rawFindingsData.filter(raw => raw.grouped_finding_id === rawDatum.id)

  return {
    id: rawDatum.id.toString(),
    grouping_type: rawDatum.grouping_type,
    grouping_key: rawDatum.grouping_key,
    severity: rawDatum.severity,
    grouped_finding_created: rawDatum.grouped_finding_created,
    sla: rawDatum.sla,
    description: rawDatum.description,
    security_analyst: rawDatum.security_analyst,
    owner: rawDatum.owner,
    workflow: rawDatum.workflow,
    status: rawDatum.status,
    progress: rawDatum.progress.toString(),
    number_of_findings: raw_findings.length.toString(),
    raw_findings
  } as GroupedFindingDataOutput
} 

const headerCells: HeaderCell<SortableColumns>[] = [
  {
    id: 'grouping_type',
    label: 'Grouping Type MOO',
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
];

export default function GroupedFindingsTable() {
  const rows = groupedFindingsData.map((datum: GroupedFindingDataInput) => createData({...datum}))
  const columnConfig = headerCells

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <GroupedFindingsTableContent rows={rows} columnConfig={columnConfig} />
      </Paper>
    </Box>
  );
}