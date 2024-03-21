import FormControl from "@mui/material/FormControl";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {FieldViewStyles} from "../view/FieldView";
import * as React from "react";
import {TextFieldVariants} from "@mui/material/TextField/TextField";

type FormSettingsProps = {
  onStyleSelected: (event: React.ChangeEvent, value: string) => void,
  formStyle: TextFieldVariants
}

export function FormSettings(props: FormSettingsProps) {
  return <>
    <FormControl fullWidth sx={{mt: 2}}>
      <FormLabel id="demo-row-radio-buttons-group-label">Fields Style</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={props.onStyleSelected}
      >
        {FieldViewStyles.map((t: string, i) =>
          <FormControlLabel key={i} value={t} control={
            <Radio checked={t === props.formStyle}/>} label={t}/>
        )}
      </RadioGroup>
    </FormControl>
  </>
}