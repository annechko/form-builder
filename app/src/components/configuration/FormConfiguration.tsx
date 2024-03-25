import Typography from "@mui/material/Typography";
import {FieldConfiguration, FieldSettings, FieldSettingsList} from "./FieldConfiguration";
import {Box, Divider} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";

type FormConfigurationProps = {
  fieldsSettings: FieldSettingsList,
  onFieldSettingsChanged: (id: string) => (newFieldSettings: FieldSettings) => void,
  onFieldDeleted: (id: string) => () => void,
  onFieldAdded: (event: object) => void,
}

export function FormConfiguration(props: FormConfigurationProps) {

  return <>
    <Typography variant="body1" component="div" sx={{mt: 2, minWidth: '30vw'}}>
      {props.fieldsSettings.values.map((s: FieldSettings) => (
        <div key={s.id}>
          <Box component="section" sx={{
            p: 1,
            pb: 0,
            pt: 2,
            mb: 1,
          }}>
            <FieldConfiguration settings={s}
              onSettingsChanged={props.onFieldSettingsChanged(s.id)}
              onFieldDeleted={props.onFieldDeleted(s.id)}
            />
          </Box>
          <Divider/>
        </div>
      ))}
      <IconButton aria-label="delete" onClick={props.onFieldAdded}>
        <AddIcon/>
      </IconButton>
    </Typography>
  </>;
}