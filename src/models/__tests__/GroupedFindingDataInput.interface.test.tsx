import { convertGroupToOutput, GroupedFindingDataInput } from "../GroupedFindingDataInput.interface"
import { GroupedFindingDataOutput } from "../GroupedFindingDataOutput.interface"
import { RawFindingDataInput } from "../RawFindingDataInput.interface"

test('convertGroupToOutput should convert data as expected', () => {
  const input = {
   id: 1,
   grouping_type: "remediation",
   grouping_key: "https://docs.aws.amazon.com/console/securityhub/Lambda.1/remediation",
   severity: "low",
   grouped_finding_created: "2022-03-05",
   sla: "2022-04-04",
   description: "Remediation Grou: https://docs.aws.amazon.com/console/securityhub/Lambda.1/remediation",
   security_analyst: "unassigned",
   owner: "unassigned",
   workflow: "defualt-workflow",
   status: "in_progress",
   progress: 0.5
  } as GroupedFindingDataInput

  const rawFindings = [
    {
      id: 1,
      source_security_tool_name: "AWS Security Hub",
      source_security_tool_id: "arn:aws:securityhub:us-east-1:340199105480:subscription/aws-foundational-security-best-practices/v/1.0.0/Lambda.1/finding/3947dfa3-51e6-42af-8b6f-0f1bbb3cb21c",
      source_collbartion_tool_name: "Jira",
      source_collbartion_tool_id: "SEC-264",
      severity: "low",
      finding_created: "2022-02-15",
      ticket_created: "2022-02-25",
      description: "Lambda.1 Lambda function policies should prohibit public access",
      asset: "arn:aws:lambda:us-east-1:340199105480:function:api_lambda",
      status: "in_progress",
      remediation_url: "https://docs.aws.amazon.com/console/securityhub/Lambda.1/remediation",
      remediation_text: "For directions on how to fix this issue, consult the AWS Security Hub Foundational Security Best Practices documentation.",
      grouped_finding_id: 1
    } as RawFindingDataInput
  ]

  const output = convertGroupToOutput(input, rawFindings)

  const expected = {
    id: input.id.toString(),
    grouping_type: input.grouping_type,
    grouping_key: input.grouping_key,
    severity: input.severity,
    grouped_finding_created: input.grouped_finding_created,
    sla: input.sla,
    description: input.description,
    security_analyst: input.security_analyst,
    owner: input.owner,
    workflow: input.workflow,
    status: input.status,
    progress: input.progress.toString(),
    number_of_findings: rawFindings.length.toString(),
    raw_findings: rawFindings
  } as GroupedFindingDataOutput

  expect(output).toEqual(expected)
})
