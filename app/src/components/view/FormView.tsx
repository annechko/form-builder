import * as React from "react";
import {FieldSettings, FieldSettingsList, FieldType} from "../configuration/FieldConfiguration";
import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FieldView, FieldViewListType} from "./FieldView";
import {TextFieldVariants} from "@mui/material/TextField/TextField";

type FormViewProps = {
  formStyle: TextFieldVariants,
  fieldsSettings: FieldSettingsList,
  onSubmit: (fieldValues: FieldViewListType) => void;
}
export type FieldsValueErrors = { [index: string]: { message: string } }

export function FormView(props: FormViewProps) {
  const [fieldValues, setFieldValues] = React.useState<FieldViewListType>({});
  const [errors, setErrors] = React.useState<FieldsValueErrors>({});

  function validateValues(
    fieldValues: FieldViewListType,
    fieldsSettings: FieldSettingsList): FieldsValueErrors {
    let _errors: FieldsValueErrors = {};
    fieldsSettings.values.forEach((s: FieldSettings) => {
      if (s.type === FieldType.title) {
        return;
      }
      if (s.isRequired && (fieldValues[s.id] === '' || fieldValues[s.id] === undefined)) {
        _errors[s.id] = {message: 'Required field'}
      }
    })

    return _errors;
  }

  const onSubmitResponse = () => {
    const errorsUpdated = validateValues(fieldValues, props.fieldsSettings)
    setErrors(errorsUpdated)
    if (Object.keys(errorsUpdated).length === 0) {
      props.onSubmit(fieldValues)
      setFieldValues({})
    }
  };

  function onFieldValueChange(fieldId: string) {
    return (event?: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event) {
        fieldValues[fieldId] = event.target.value
        setFieldValues({...fieldValues})
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
          {props.fieldsSettings.values.map((s: FieldSettings) => (
            <div key={s.id}>
              <Box component="section" sx={{pr: 0, pl: 0}}>
                <FieldView settings={s} onChange={onFieldValueChange(s.id)} value={fieldValues[s.id]}
                  variant={props.formStyle}
                  error={errors[s.id]}/>
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
            disabled={props.fieldsSettings.values.length === 0}>Test Submit</Button>

        </Box>
      </form>
    </Box>
  </>
}