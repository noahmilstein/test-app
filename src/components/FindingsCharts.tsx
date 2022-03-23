import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { capitalize } from '../utils/helpers'
import { Box } from '@mui/material'
import { GroupedFindingDataOutput } from '../models/GroupedFindingDataOutput.interface'
import { Severity } from '../models/Severity.enum'

interface FindingsChartsProps {
  rows: GroupedFindingDataOutput[]
}

interface SeverityFrequency {
  [Severity.Low]: number
  [Severity.Medium]: number
  [Severity.High]: number
  [Severity.Critical]: number
}

interface Colors {
  backgroundColor: string[]
  borderColor: string[]
}

export default function FindingsCharts(props: FindingsChartsProps) {
  const { rows } = props

  const groupBySeverity = rows.reduce((acc, curr): SeverityFrequency => {
    const accSeverity = acc[curr.severity as Severity] += 1
    return {...acc, [curr.severity]: accSeverity }
  }, {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0
  })

  const severityColors = {
    [Severity.Low]: {
      background: 'rgba(255, 99, 132, 0.2)',
      border: 'rgba(255, 99, 132, 1)',
    },
    [Severity.Medium]: {
      background: 'rgba(54, 162, 235, 0.2)',
      border: 'rgba(54, 162, 235, 1)',
    },
    [Severity.High]: {
      background: 'rgba(255, 206, 86, 0.2)',
      border: 'rgba(255, 206, 86, 1)',
    },
    [Severity.Critical]: {
      background: 'rgba(75, 192, 192, 0.2)',
      border: 'rgba(75, 192, 192, 1)',
    }
  }

  const severityKeys = Object.keys(groupBySeverity)

  const colors = severityKeys.reduce((acc, curr): Colors => {
    const background = severityColors[curr as Severity].background
    const border = severityColors[curr as Severity].border
    return {
      backgroundColor: [...acc.backgroundColor, background],
      borderColor: [...acc.borderColor, border]
    }
  }, {
    backgroundColor: [],
    borderColor: []
  } as Colors)

  /*
    WORKING HERE
    - refine chart size
    - move chart into accordion
    - add more charts
    - add tests
  */ 
  const data = {
    labels: severityKeys.map(key => capitalize(key)),
    datasets: [
      {
        label: 'Grouped Findings by Severity',
        data: Object.values(groupBySeverity),
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor,
        borderWidth: 1,
      },
    ],
  }

  // const style = {}

  ChartJS.register(ArcElement, Tooltip, Legend)
  // grouped findings by severity
  // raw findings by severity
  // raw by finding_created time series
  // group by grouped_finding_created time series

  return (
    <Box data-testid="pie-chart">
      <Pie data={data} options={{responsive: true}} />
    </Box>
  )
}