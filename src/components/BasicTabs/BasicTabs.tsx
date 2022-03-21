import React from 'react'
import TabContent from './TabContent'
import { Tabs, Tab } from '@mui/material'
import GroupedFindingsTable from '../FindingsTable/FindingsTable'
import FindingsCharts from '../FindingsCharts'
import groupedFindingsJson from '../../assets/grouped_findings.json'
import rawFindingsJson from '../../assets/raw_findings.json'
import { convertGroupToOutput, GroupedFindingDataInput } from '../../models'

export default function BasicTabs() {
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  // WORKING HERE :: make data available via context instead of prop drilling
  const groupedFindingsData = [...groupedFindingsJson] // WORKING HERE : make API GET call
  const rawFindingsData = [...rawFindingsJson] // WORKING HERE : make API GET call

  const rows = groupedFindingsData.map((datum: GroupedFindingDataInput) => convertGroupToOutput({...datum}, rawFindingsData))

  return (
    <>
      <Tabs value={value} onChange={handleChange} aria-label="findings tabs">
        <Tab label="Findings Table" {...a11yProps(0)} />
        <Tab label="Findings Graphs" {...a11yProps(0)} />
      </Tabs>
      <TabContent value={value} index={0}>
        <GroupedFindingsTable rows={rows} />
      </TabContent>
      <TabContent value={value} index={1}>
        <FindingsCharts rows={rows} />
      </TabContent>
    </>
  )
}