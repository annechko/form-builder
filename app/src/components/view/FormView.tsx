import * as React from "react";
import {FieldSettings} from "../configuration/FieldConfiguration";
import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FieldView} from "./FieldView";
import {TextFieldVariants} from "@mui/material/TextField/TextField";

type FormViewProps = {
  responsesCount: number;
  formStyle: TextFieldVariants,
  fieldsSettings: FieldSettings[],
  tableRows: string[][],
  setTableRows: (tableRows: string[][]) => void,
  setResponsesCount: (n: number) => void,
}
export type FieldsValueErrors = { [index: string]: { message: string } }

export function FormView(props: FormViewProps) {
  const [fieldValues, setFieldValues] = React.useState<string[]>([]);
  const [errors, setErrors] = React.useState<FieldsValueErrors>({});

  function validateValues(
    fieldValues: string[],
    fieldsSettings: FieldSettings[]): FieldsValueErrors {
    let _errors: FieldsValueErrors = {};
    fieldsSettings.forEach((settings: FieldSettings, index: number) => {
      if (settings.isRequired && (fieldValues[index] === '' || fieldValues[index] === undefined)) {
        _errors[index] = {message: 'Required field'}
      }
    })

    return _errors;
  }

  const onSubmitResponse = () => {
    const errorsUpdated = validateValues(fieldValues, props.fieldsSettings)
    setErrors(errorsUpdated)
    if (Object.keys(errorsUpdated).length === 0) {
      props.tableRows.push([new Date().toLocaleString(), ...fieldValues])
      props.setTableRows([...props.tableRows])
      setFieldValues([])
      props.setResponsesCount(props.responsesCount + 1)
    }
  };

  function onFieldValueChange(fieldIndex: number) {
    return (event?: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event) {
        fieldValues[fieldIndex] = event.target.value
        setFieldValues([...fieldValues])
      }
    }
  }

  return <>
    <Box
      display="flex"
      justifyContent="center"
    >
      <form style={{minWidth: "30vw"}}>
        <Typography variant="body1" component="div">
          {props.fieldsSettings.map((s: FieldSettings, i: number) => (
            <div key={i}>
              <Box component="section" sx={{pr: 0, pl: 0}}>
                <FieldView settings={s} onChange={onFieldValueChange(i)} value={fieldValues[i]}
                  variant={props.formStyle}
                  error={errors[i]}/>
              </Box>
            </div>
          ))}
        </Typography>
        <Box
          mt={2}
          display="flex"
          justifyContent="center"
        >
          <Button variant="contained" onClick={onSubmitResponse}
            disabled={props.fieldsSettings.length === 0}>Test Submit</Button>

        </Box>
      </form>
    </Box>
  </>
}