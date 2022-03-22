import { RawFindingDataOutput } from './RawFindingDataOutput.interface'

export interface RawFindingDataInput {
  id: number
  source_security_tool_name: string
  source_security_tool_id: string
  source_collbartion_tool_name: string
  source_collbartion_tool_id: string
  severity: string
  finding_created: string
  ticket_created: string
  description: string
  asset: string
  status: string
  remediation_url: string
  remediation_text: string
  grouped_finding_id: number
}

export function convertRawToOutput(rawInput: RawFindingDataInput): RawFindingDataOutput {
  return {
    id: rawInput.id.toString(),
    source_security_tool_name: rawInput.source_security_tool_name,
    source_security_tool_id: rawInput.source_security_tool_id,
    source_collbartion_tool_name: rawInput.source_collbartion_tool_name,
    source_collbartion_tool_id: rawInput.source_collbartion_tool_id,
    severity: rawInput.severity,
    finding_created: rawInput.finding_created,
    ticket_created: rawInput.ticket_created,
    description: rawInput.description,
    asset: rawInput.asset,
    status: rawInput.status,
    remediation_url: rawInput.remediation_url,
    remediation_text: rawInput.remediation_text,
    grouped_finding_id: rawInput.grouped_finding_id.toString()
  } as RawFindingDataOutput
}