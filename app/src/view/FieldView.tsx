import * as React from "react";
import {FieldType, FieldViewProps} from "../configuration/FieldConfiguration";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

export function FieldView(options: FieldViewProps) {
  if (options.type === FieldType.input) {
    return <>
      <FormControl fullWidth margin="normal">
        <TextField id="outlined-basic" label={options.label || "Field name"} variant="filled" size="small"/>
      </FormControl>
    </>
  } else if (options.type === FieldType.textarea) {
    return <>
      <FormControl fullWidth margin="normal">
        <TextField id="outlined-basic" label={options.label || "Field name"} variant="filled" size="small"
          multiline rows={3}/>
      </FormControl>
    </>
  }

}