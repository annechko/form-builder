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

export type FieldSettings = {
  type: FieldType,
  label?: string,
};
export type FieldConfigurationProps = {
  settings?: FieldSettings
};

export function FieldConfiguration(configProps: FieldConfigurationProps) {
  const defaultSettings: FieldSettings = {type: FieldType.input, label: ''}

  const [settings, setSettings] = React.useState<FieldSettings>(configProps.settings||defaultSettings);
  const handleTypeChange = (event: SelectChangeEvent) => {
    const typeStr = event.target.value as keyof typeof FieldType;
    const updated: FieldSettings = {type: FieldType[typeStr], label:settings.label}
    setSettings(updated)
  };
  return <>
    <FormControl sx={{mb: 2, minWidth: 120}} fullWidth size="small">
    <TextField id="outlined-basic" label="Field name" variant="outlined" size="small" fullWidth
      value={settings.label}
    />
    </FormControl>
    <FormControl sx={{mb: 2, minWidth: 120}} fullWidth size="small">
      <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={settings.type}
        label="Type"
        onChange={handleTypeChange}
      >
        <MenuItem value={FieldType.input}>input</MenuItem>
        <MenuItem value={FieldType.textarea}>textarea</MenuItem>
      </Select>
    </FormControl>

  </>
}