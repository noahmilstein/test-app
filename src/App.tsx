import './App.css'
import GroupedFindingsTable from './components/Table/GroupedFindingsTable'

function App() {
  // You are tasked with creating a single web page that has the following components:
  // A collapsible table to display the grouped findings
  // When click it expands to the raw findings within that group

  /*
    TODO:
    - push to github
    - add data viz
      - wrap table in tabs
      - tab 1 is table
      - tab 2 is data viz
    - add test coverage
    - create node API to query for json
    - update README
    - simplify table structure/logic
    - create DB for API to query
      - seed DB
    - add prettier
  */
  return (
    <div className="App">
      <GroupedFindingsTable />
    </div>
  );
}

export default App;
