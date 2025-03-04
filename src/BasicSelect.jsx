import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [filmsFilter, setFilter] = React.useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
    <Box sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filters</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filmsFilter}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"title"}>Film Title</MenuItem>
          <MenuItem value={"actor_name"}>Actor Name</MenuItem>
          <MenuItem value={"genre"}>Genre</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </>
  );
}
