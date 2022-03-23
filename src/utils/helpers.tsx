import { Link, Chip } from '@mui/material'
import { Order } from '../models/Order.type'
import { Severity } from '../models/Severity.enum'

export const capitalize = (words: string, replaceRegex?: RegExp): string => {
  return (replaceRegex ? words.replace(replaceRegex, ' ') : words)
    .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
}

export const uid = (length = 6): string => {
  return Math.random().toString(20).substr(2, length)
}

export function getSeverityChip(severity: string): JSX.Element {
  switch (severity) {
    case Severity.Low:
      return <Chip label={capitalize(severity)} color="success" />
    case Severity.Medium:
      return <Chip label={capitalize(severity)} color="info" />
    case Severity.High:
      return <Chip label={capitalize(severity)} color="warning" />
    case Severity.Critical:
      return <Chip label={capitalize(severity)} color="error" />
    default:
      return <Chip label={capitalize(severity)} color="primary" />
  }
}

export function formatUrl(urlStr: string): JSX.Element {
  const pathMatch = urlStr.match(/(.*: )/)
  const prefix = pathMatch ? pathMatch[0] : ''
  const hrefMatch = urlStr.match(/https:\/\/(.*)/)
  const linkPath = hrefMatch ? hrefMatch[0] : ''
  return <span>{prefix}<Link href={linkPath}>{linkPath}</Link></span>
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): 0 | 1 | -1 {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: string },
  b: { [key in Key]: string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  // This method is created for cross-browser compatibility to support IE11
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}