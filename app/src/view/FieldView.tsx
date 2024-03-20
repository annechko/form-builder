import * as React from "react";
import {FieldSettings, FieldType} from "../configuration/FieldConfiguration";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

export type FieldViewProps = {
  settings: FieldSettings,
  onChange?: (event?: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  value?: string
};

export function FieldView(viewProps: FieldViewProps) {
  const settings = viewProps.settings
  const [value, setValue] = React.useState<string>(viewProps.value||'');
  React.useEffect(() => {
    setValue( viewProps.value||'')

  }, [viewProps.value])
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue( event.target.value)
  };
  if (settings.type === FieldType.input) {
    return <div>
      <FormControl fullWidth>
        <TextField id="outlined-basic" label={settings.label} variant="filled" size="small"
          onBlur={viewProps.onChange}
          value={value}
          onChange={handleValueChange}
          required={settings.isRequired === true}/>
      </FormControl>
    </div>
  } else if (settings.type === FieldType.textarea) {
    return <div>
      <FormControl fullWidth>
        <TextField id="outlined-basic" label={settings.label} variant="filled" size="small"
          onBlur={viewProps.onChange}
          value={value}
          onChange={handleValueChange}
          required={settings.isRequired === true}
          multiline rows={3}/>
      </FormControl>
    </div>
  }
}