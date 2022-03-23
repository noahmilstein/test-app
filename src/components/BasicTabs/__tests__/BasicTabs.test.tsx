import { fireEvent, screen, render } from '@testing-library/react'
import BasicTabs from '../BasicTabs'

describe('BasicTabs', () => {
  it('should render expected tabs', () => {
    render(<BasicTabs />)
    const findingsTable = screen.getByLabelText('Findings Table')
    const findingsGraph = screen.getByLabelText('Findings Graphs')

    expect(findingsTable).toBeInTheDocument()
    expect(findingsGraph).toBeInTheDocument()
  })

  it('should render the table on the first tab', () => {
    render(<BasicTabs />)
    const findingsTable = screen.getByLabelText('Findings Table')
    fireEvent.click(findingsTable)

    const collapsibleRows = screen.getAllByTestId(/collapsible-row-/)
    expect(collapsibleRows).toBeDefined()
    expect(collapsibleRows.length).toEqual(5)
  })

  // WIP
  // it('should render the graph on the second tab', () => {
  //   render(<BasicTabs />)
  //   const findingsGraph = screen.getByLabelText('Findings Graphs')
  //   fireEvent.click(findingsGraph)

  //   const pieChart = screen.queryByTestId('pie-chart')
  //   console.log(pieChart)
  //   expect(pieChart).toBeDefined()
  // })
})
