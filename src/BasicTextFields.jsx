import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react'

export default function BasicTextFields() {
    const [search, setSearch] = useState('')
    console.log(search)
    
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Enter Search Filter" variant="outlined" onChange={(e) => setSearch(e.target.value)}/>
    </Box>
  );
}
