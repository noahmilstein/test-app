import BasicTabs from './components/BasicTabs/BasicTabs'

function App() {
  // You are tasked with creating a single web page that has the following components:
  // A collapsible table to display the grouped findings
  // When click it expands to the raw findings within that group

  /*
    TODO:
    - add data viz
      - wrap table in tabs
      - tab 1 is table
      - tab 2 is data viz
      - refine pie chart
      - separate charts into accordions
      - add more charts
    - add test coverage
    - create node API to query for json
    - update README
    - simplify table structure/logic
    - create DB for API to query
      - seed DB
    - add prettier
  */

  return (
    <div className="App" data-testid="app-wrapper">
      <BasicTabs />
    </div>
  )
}

export default App
