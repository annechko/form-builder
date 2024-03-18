import * as React from "react";
import {FieldSettings, FieldType} from "../configuration/FieldConfiguration";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

export type FieldViewProps = {
  settings: FieldSettings
};

export function FieldView(viewProps: FieldViewProps) {
  const settings = viewProps.settings
  if (settings.type === FieldType.input) {
    return <div>
      <FormControl fullWidth margin="normal">
        <TextField id="outlined-basic" label={settings.label || "Field name"} variant="filled" size="small"/>
      </FormControl>
    </div>
  } else if (settings.type === FieldType.textarea) {
    return <div>
      <FormControl fullWidth margin="normal">
        <TextField id="outlined-basic" label={settings.label || "Field name"} variant="filled" size="small"
          multiline rows={3}/>
      </FormControl>
    </div>
  }
}