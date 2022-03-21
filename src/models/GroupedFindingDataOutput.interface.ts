import { RawFindingDataInput } from './RawFindingDataInput.interface'

export interface GroupedFindingDataOutput {
  id: string
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
  progress: string
  number_of_findings: string
  raw_findings: RawFindingDataInput[]
}