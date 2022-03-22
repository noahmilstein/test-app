import { Severity } from '../../models'
import {
  getComparator,
  stableSort,
  formatUrl,
  getSeverityChip,
  capitalize,
  uid
} from '../helpers'
import { Chip, Link } from '@mui/material'

describe('helper methods', () => {
  it('capitalize() should capitalize each word in string input', () => {
    const input = capitalize("this is a test case string")
    const expected = "This Is A Test Case String"
    expect(input).toEqual(expected)
  })
  it('capitalize() should replaced regex target and capitalize each word in string input', () => {
    const input = capitalize("this_is_a_test_case_string", /_/g)
    const expected = "This Is A Test Case String"
    expect(input).toEqual(expected)
  })
  it('uid() should generate a random string of the prescribed length', () => {
    const input = uid(10)
    expect(input.length).toEqual(10)
  })
  it('uid() should generate a random string of the default length', () => {
    const input = uid()
    expect(input.length).toEqual(6)
  })
  it('getSeverityChip() should return a Chip JSX.Element', () => {
    const inputLow = getSeverityChip(Severity.Low)
    const expectedLow = <Chip label={capitalize(Severity.Low)} color="success" />
    const inputMedium = getSeverityChip(Severity.Medium)
    const expectedMedium = <Chip label={capitalize(Severity.Medium)} color="info" />
    const inputHigh = getSeverityChip(Severity.High)
    const expectedHigh = <Chip label={capitalize(Severity.High)} color="warning" />
    const inputCritical = getSeverityChip(Severity.Critical)
    const expectedCritical = <Chip label={capitalize(Severity.Critical)} color="error" />
    const inputInvalid = getSeverityChip('invalid')
    const expectedInvalid = <Chip label={capitalize('invalid')} color="primary" />

    expect(inputLow).toEqual(expectedLow)
    expect(inputMedium).toEqual(expectedMedium)
    expect(inputHigh).toEqual(expectedHigh)
    expect(inputCritical).toEqual(expectedCritical)
    expect(inputInvalid).toEqual(expectedInvalid)
  })

  it('formatUrl() should return a span wrapped Link', () => {
    const urlString = 'I\'m a prefix: https://www.fake_url.com'
    const input = formatUrl(urlString)
    const expected = <span>I'm a prefix: <Link href='https://www.fake_url.com'>https://www.fake_url.com</Link></span>
    expect(input).toEqual(expected)
  })

  it('stableSort() should sort array by comparator', () => {
    const testArray = [
      { a: '3', b: '2' },
      { a: '1', b: '4' },
      { a: '2', b: '1' }
    ]
    const inputCaseA = stableSort(testArray, getComparator('asc', 'a'))
    const inputCaseB = stableSort(testArray, getComparator('desc', 'b'))
    const expectedCaseA = [
      { a: '1', b: '4' },
      { a: '2', b: '1' },
      { a: '3', b: '2' }
    ]
    const expectedCaseB = [
      { a: '1', b: '4' },
      { a: '3', b: '2' },
      { a: '2', b: '1' }
    ]

    expect(inputCaseA).toEqual(expectedCaseA)
    expect(inputCaseB).toEqual(expectedCaseB)
  })

  it('getComparator() should return the comparator as anonymous function', () => {
    type TestType = 'a' | 'b' | 'c'
    const input = getComparator<TestType>('asc', 'c')

    expect(input).toEqual(expect.any(Function))
  })
})
