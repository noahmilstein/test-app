import { GroupedFindingDataOutput } from './GroupedFindingDataOutput'
import { RawFindingDataInput } from './RawFindingDataInput'

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

export function convertGroupToOutput(groupInput: GroupedFindingDataInput, rawFindingsData: RawFindingDataInput[]): GroupedFindingDataOutput {
  const raw_findings = rawFindingsData.filter(raw => raw.grouped_finding_id === groupInput.id)

  return {
    id: groupInput.id.toString(),
    grouping_type: groupInput.grouping_type,
    grouping_key: groupInput.grouping_key,
    severity: groupInput.severity,
    grouped_finding_created: groupInput.grouped_finding_created,
    sla: groupInput.sla,
    description: groupInput.description,
    security_analyst: groupInput.security_analyst,
    owner: groupInput.owner,
    workflow: groupInput.workflow,
    status: groupInput.status,
    progress: groupInput.progress.toString(),
    number_of_findings: raw_findings.length.toString(),
    raw_findings
  } as GroupedFindingDataOutput
}