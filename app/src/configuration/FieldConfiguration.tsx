import * as React from "react";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export function FieldConfiguration() {
  const [type, setType] = React.useState('input');
  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };
  return <>

      <TextField id="outlined-basic" label="Field name" variant="outlined" size="small" fullWidth />
      <FormControl sx={{mt: 2, minWidth: 120}} fullWidth size="small">
        <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={type}
          label="Type"
          onChange={handleTypeChange}
        >
          <MenuItem value={'input'}>input</MenuItem>
          <MenuItem value={'textarea'}>textarea</MenuItem>
        </Select>
      </FormControl>

  </>
}