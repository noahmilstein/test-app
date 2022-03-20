export interface GroupedFindingDataInput {
  id: number
  grouping_type: string
  grouping_key: string
  severity: string
  grouped_finding_created: string
  sla: string
  description: string
  security_analyst: string
  owner: string
  workflow: string
  status: string
  progress: number
}