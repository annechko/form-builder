import Typography from "@mui/material/Typography";
import {
  FieldConfiguration,
  FieldSettings,
  FieldSettingsList,
  FieldType
} from "./FieldConfiguration";
import {Box, Divider} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";

type FormConfigurationProps = {
  fieldsSettings: FieldSettingsList,
  onFieldsSettingsChanged: (newFieldSettings: FieldSettingsList) => void,
}

export function FormConfiguration(props: FormConfigurationProps) {
  const [fieldsSettings, setFieldsSettings] = React.useState<FieldSettingsList>(props.fieldsSettings);
  const defaultSettings: FieldSettings = {type: FieldType.input, label: 'Field'}

  const updateSettings = (s: FieldSettingsList) => {
    const newSettings = s.clone()
    setFieldsSettings(newSettings)
    props.onFieldsSettingsChanged(newSettings)
  }
  const onFieldAdded = (event: object) => {
    fieldsSettings.add(defaultSettings)
    updateSettings(fieldsSettings)
  }
  const onFieldSettingsChanged = (id: string) => {
    return (newFieldSettings: FieldSettings) => {
      fieldsSettings.update(id, newFieldSettings)
      updateSettings(fieldsSettings)
    }
  }
  const onFieldDeleted = (id: string) => {
    return () => {
      fieldsSettings.remove(id)
      updateSettings(fieldsSettings)
    }
  }
  return <>
    <Typography variant="body1" component="div" sx={{mt: 2, minWidth: '30vw'}}>
      {fieldsSettings.map((s: FieldSettings, id: string) => (
        <div key={id}>
          <Box component="section" sx={{
            p: 1,
            pb: 0,
            pt: 2,
            mb: 1,
          }}>
            <FieldConfiguration settings={s}
              onSettingsChanged={onFieldSettingsChanged(id)}
              onFieldDeleted={onFieldDeleted(id)}
            />
          </Box>
          <Divider/>
        </div>
      ))}
      <IconButton aria-label="delete" onClick={onFieldAdded}>
        <AddIcon/>
      </IconButton>
    </Typography>
  </>;
}