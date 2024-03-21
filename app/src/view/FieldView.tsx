import * as React from "react";
import {FieldSettings, FieldType} from "../configuration/FieldConfiguration";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import {TextFieldVariants} from "@mui/material/TextField/TextField";

export const FieldViewStyles = ['outlined', 'standard', 'filled']
export type FieldViewProps = {
  settings: FieldSettings,
  onChange?: (event?: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  value?: string,
  variant?: TextFieldVariants,
  error?: { message: string },
};

export function FieldView(viewProps: FieldViewProps) {
  const settings = viewProps.settings
  const [value, setValue] = React.useState<string>(viewProps.value || '');
  const [error, setError] = React.useState<string | undefined>(viewProps.error?.message);
  React.useEffect(() => {
    setValue(viewProps.value || '')

  }, [viewProps.value])
  React.useEffect(() => {
    setError(viewProps.error?.message)

  }, [viewProps.error])
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    if (settings.isRequired && event.target.value) {
      setError(undefined)
    }
  };
  return <div>
    <FormControl fullWidth sx={{p: 0, pb: 1}}>
      <TextField id="outlined-basic" label={settings.label}
        variant={viewProps.variant}
        size="small"
        onBlur={viewProps.onChange}
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