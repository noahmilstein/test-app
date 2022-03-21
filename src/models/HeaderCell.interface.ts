export interface HeaderCell<T> {
  id: T
  label: string
  minWidth?: number
  align?: 'center' | 'inherit' | 'justify' | 'left' | 'right'
  columnValueFormat?: (value: string ) => string | JSX.Element
  tooltip?: string
}
