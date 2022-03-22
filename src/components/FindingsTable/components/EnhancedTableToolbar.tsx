import React, { ChangeEvent } from 'react'
import {
  alpha,
  Toolbar,
  Typography,
  TextField
  // IconButton,
  // Tooltip,
} from '@mui/material'
// import { FilterList } from '@mui/icons-material'

interface EnhancedTableToolbarProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { setSearchTerm } = props
  // working here :: add filter
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setSearchTerm(e.target.value)
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...( 
            {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
        </Typography>
        <TextField 
          id="search-input" 
          label="Enter Search Term" 
          variant="standard"
          onChange={handleChange} 
        />
        {/* WOKRING HERE : develop filter */}
        {/* <Tooltip title="Filter list">
          <IconButton>
            <FilterList />
          </IconButton>
        </Tooltip> */}
    </Toolbar>
  )
}