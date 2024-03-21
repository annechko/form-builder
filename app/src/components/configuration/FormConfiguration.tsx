import Typography from "@mui/material/Typography";
import {FieldConfiguration, FieldSettings} from "./FieldConfiguration";
import {Box, Divider} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";

type FormConfigurationProps = {
  fieldsSettings: FieldSettings[],
  onFieldSettingsChanged: (i: number) => (newFieldSettings: FieldSettings) => void,
  onFieldDeleted: (i: number) => () => void,
  onAddField: (event: object) => void,
}

export function FormConfiguration(props: FormConfigurationProps) {
  return <>
    <Typography variant="body1" component="div" sx={{mt: 2, minWidth: '30vw'}}>
      {props.fieldsSettings.map((s: FieldSettings, i: number) => (
        <div key={i}>
          <Box component="section" sx={{
            p: 1,
            pb: 0,
            pt: 2,
            mb: 1,
          }}>
            <FieldConfiguration settings={s} onSettingsChanged={props.onFieldSettingsChanged(i)}
              onFieldDeleted={props.onFieldDeleted(i)}
            />
          </Box>
          <Divider/>
        </div>
      ))}
      <IconButton aria-label="delete" onClick={props.onAddField}>
        <AddIcon/>
      </IconButton>
    </Typography>
  </>;
}