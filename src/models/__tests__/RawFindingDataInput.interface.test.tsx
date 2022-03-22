import { 
  RawFindingDataInput, 
  convertRawToOutput, 
  RawFindingDataOutput
} from '../'

test('convertRawToOutput should convert data as expected', () => {
  const input = {
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

  const output = convertRawToOutput(input)

  const expected = {
    id: input.id.toString(),
    source_security_tool_name: input.source_security_tool_name,
    source_security_tool_id: input.source_security_tool_id,
    source_collbartion_tool_name: input.source_collbartion_tool_name,
    source_collbartion_tool_id: input.source_collbartion_tool_id,
    severity: input.severity,
    finding_created: input.finding_created,
    ticket_created: input.ticket_created,
    description: input.description,
    asset: input.asset,
    status: input.status,
    remediation_url: input.remediation_url,
    remediation_text: input.remediation_text,
    grouped_finding_id: input.grouped_finding_id.toString()
  } as RawFindingDataOutput

  expect(output).toEqual(expected)
})
