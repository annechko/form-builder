import * as React from "react";
import {FieldSettings, FieldType} from "../configuration/FieldConfiguration";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import {TextFieldVariants} from "@mui/material/TextField/TextField";

export type FieldViewList = {
  [id: string]: string
}

export const FieldViewStyles = ['outlined', 'standard', 'filled']

export function FieldView(props: {
  settings: FieldSettings,
  onChange?: (event?: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  value?: string,
  variant?: TextFieldVariants,
  error?: { message: string },
}) {
  const settings = props.settings
  const [value, setValue] = React.useState<string>(props.value || '');
  const [error, setError] = React.useState<string | undefined>(props.error?.message);
  React.useEffect(() => {
    setValue(props.value || '')
  }, [props.value])
  React.useEffect(() => {
    setError(props.error?.message)
  }, [props.error])
  if (settings.type === FieldType.title) {
    return <>
      <h3 style={{
        marginTop: 0,
        textAlign: 'center'
      }}>{settings.label}</h3>
    </>
  }
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    if (settings.isRequired && event.target.value) {
      setError(undefined)
    }
  };
  return <div>
    <FormControl fullWidth sx={{p: 0, pb: 1}}>
      <TextField id="outlined-basic" label={settings.label}
        variant={props.variant}
        size="small"
        onBlur={props.onChange}
        value={value}
        onChange={handleValueChange}
        required={settings.isRequired === true}
        error={error !== undefined}
        helperText={error}

        multiline={settings.type === FieldType.textarea}
        rows={3}/>
    </FormControl>
  </div>

}