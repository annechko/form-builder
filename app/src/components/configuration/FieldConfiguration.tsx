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

export enum FieldType {
  input = "input",
  textarea = "textarea",
  title = "title",
}

export type FieldSettings = {
  id: string,
  type: FieldType,
  label?: string,
  isRequired?: boolean, // todo not for all fields
};

export type FieldConfigurationProps = {
  settings: FieldSettings,
  onSettingsChanged?: (newSettings: FieldSettings) => void,
  onFieldDeleted?: () => void,
};

export class FieldSettingsList {
  constructor(v: FieldSettingsListType = {}) {
    this._values = {...v}
  }

  _values: FieldSettingsListType

  get values(): FieldSettingsListType {
    return this._values;
  }

  add(s: FieldSettings): void {
    this._values[s.id] = s
  }

  clone(): FieldSettingsList {
    return new FieldSettingsList(this.values)
  }

  update(id: string, newFieldSettings: FieldSettings) {
    this._values[id] = newFieldSettings
  }

  remove(id: string) {
    delete this._values[id]
  }

  map<U>(callback: (s: FieldSettings, id: string) => U): U[] {
    let newValues: U[] = [];
    let oValues = this.values;
    Object.keys(oValues).forEach(function (id: string) {
      newValues.push(callback(oValues[id], id))
    });
    return newValues as U[]
  }

  reduce(this: FieldSettingsList, callback: (s: FieldSettings, id: string) => boolean): FieldSettingsList {
    let newList: FieldSettingsListType = {}
    let oValues = this.values;
    Object.keys(this.values).forEach(function (id: string) {
      if (callback(oValues[id], id)) {
        newList[id] = oValues[id]
      }
    });
    return new FieldSettingsList(newList)
  }

  length(): number {
    return Object.keys(this.values).length
  }
}

export type FieldSettingsListType = {
  [id: string]: FieldSettings
}

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

export function FieldConfiguration(configProps: FieldConfigurationProps) {
  const [settings, setSettings] = React.useState<FieldSettings>(configProps.settings);
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
          <TextField id="outlined-basic"
            label={settings.type === FieldType.title ? 'Title' : 'Field name'}
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
      {settings.type !== FieldType.title && <FormControlLabel sx={{m: 0, fontSize: "0.8rem"}}
        componentsProps={{typography: {sx: {fontSize: "0.8rem"}}}}
        control={<Checkbox size="small" onChange={handleRequiredChange} sx={{p: 0.5}}/>}
        label="Required"/>}
      <LongMenu onDelete={configProps.onFieldDeleted}/>
    </Stack>
  </div>
}