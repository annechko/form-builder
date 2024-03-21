import * as React from "react";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Checkbox, FormControlLabel, Stack} from "@mui/material";

const options = [
  'Delete',
];

const ITEM_HEIGHT = 48;

function LongMenu(props: { onDelete?: Function }) {
  const {onDelete} = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl !== null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    if (onDelete) {
      onDelete()
    }
  };

  return (
    <div>
      <IconButton sx={{m: 0}}
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon/>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export enum FieldType {
  input = "input",
  textarea = "textarea",
  title = "title",
}

export type FieldSettings = {
  type: FieldType,
  label?: string,
  isRequired?: boolean,
};

export type FieldConfigurationProps = {
  settings?: FieldSettings,
  onSettingsChanged?: (newSettings: FieldSettings) => void,
  onFieldDeleted?: () => void,
};

export function FieldConfiguration(configProps: FieldConfigurationProps) {
  const defaultSettings: FieldSettings = {type: FieldType.input}

  const [settings, setSettings] = React.useState<FieldSettings>(configProps.settings || defaultSettings);
  const updateSettings = (newSettings: FieldSettings) => {
    setSettings(newSettings)
    if (configProps.onSettingsChanged) {
      configProps.onSettingsChanged(newSettings)
    }
  }
  const handleTypeChange = (event: SelectChangeEvent) => {
    const typeStr = event.target.value as keyof typeof FieldType;
    updateSettings({...settings, type: FieldType[typeStr]})
  };
  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({...settings, label: event.target.value})
  };
  const handleRequiredChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    updateSettings({...settings, isRequired: checked})
  };
  return <div>
    <Stack direction="row" spacing={1}>
      <FormControl sx={{mb: 2, minWidth: 120}} fullWidth size="small">
        <Stack direction="row" spacing={1}>
          <TextField id="outlined-basic" label={settings.type === FieldType.title ? 'Title' : 'Field name'}
            variant="outlined" fullWidth size="small"
            value={settings.label || ''} onChange={handleLabelChange}
          />
        </Stack>
      </FormControl>
      <FormControl sx={{mb: 0, minWidth: 120}} fullWidth size="small">
        <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={settings.type}
          label="Type"
          onChange={handleTypeChange}
        >
          {Object.keys(FieldType).map((t, i) => <MenuItem key={i} value={t}>{t}</MenuItem>)}
        </Select>
      </FormControl>
    </Stack>
    <Stack direction="row" justifyContent="flex-end" spacing={0} sx={{mt: 1}}>
      <FormControlLabel sx={{m: 0, fontSize: "0.8rem"}}
        componentsProps={{typography: {sx: {fontSize: "0.8rem"}}}}
        control={<Checkbox size="small" onChange={handleRequiredChange} sx={{p: 0.5}}/>}
        label="Required"/>
      <LongMenu onDelete={configProps.onFieldDeleted}/>
    </Stack>
  </div>
}