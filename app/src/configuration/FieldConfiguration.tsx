import * as React from "react";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export enum FieldType {
  input = "input",
  textarea = "textarea",
}

export type FieldViewProps = {
  type: FieldType,
  label?: string,
};

export function FieldConfiguration() {
  const [type, setType] = React.useState<FieldType>(FieldType.input);
  const handleTypeChange = (event: SelectChangeEvent) => {
    const typeStr = event.target.value as keyof typeof FieldType;
    setType(FieldType[typeStr]);
  };
  return <>

    <TextField id="outlined-basic" label="Field name" variant="outlined" size="small" fullWidth/>
    <FormControl sx={{mt: 2, minWidth: 120}} fullWidth size="small">
      <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={type}
        label="Type"
        onChange={handleTypeChange}
      >
        <MenuItem value={FieldType.input}>input</MenuItem>
        <MenuItem value={FieldType.textarea}>textarea</MenuItem>
      </Select>
    </FormControl>

  </>
}