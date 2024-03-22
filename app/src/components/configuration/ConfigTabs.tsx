import * as React from "react";
import {AppTabPanel, TabConfigIds, tabProps} from "../common/AppTabPanel";
import {Box} from "@mui/material";
import styles from "../../App.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {FormConfiguration} from "./FormConfiguration";
import {FormSettings} from "./FormSettings";
import {FieldSettings, FieldSettingsList, FieldType} from "./FieldConfiguration";
import {TextFieldVariants} from "@mui/material/TextField/TextField";

type ConfigTabsProps = {
  onFieldsSettingsChanged: (newSettings: FieldSettingsList) => void,
  onFormStyleChanged: (event: React.ChangeEvent, value: string) => void,
  formStyle: TextFieldVariants,
}

export function ConfigTabs(props: ConfigTabsProps) {
  const [value, setValue] = React.useState<TabConfigIds>(TabConfigIds.Fields);
  const defaultSettings: FieldSettings = {type: FieldType.input, label: 'Field'}

  let defaultFieldsSettings: FieldSettingsList = new FieldSettingsList({})
  defaultFieldsSettings.add({type: FieldType.title, label: 'New Form Title'})
  defaultFieldsSettings.add(defaultSettings)

  const [fieldsSettings, setFieldsSettings] = React.useState<FieldSettingsList>(defaultFieldsSettings);
  React.useEffect(() => {
    props.onFieldsSettingsChanged(fieldsSettings)
  })
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
  const handleTabChange = (event: React.SyntheticEvent, newValue: TabConfigIds) => {
    setValue(newValue);
  };

  return (
    <Box className={styles.card}>
      <Box sx={{borderBottom: 1, borderColor: 'divider', p: 0}}>
        <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Configure" {...tabProps(TabConfigIds.Fields)} sx={{textTransform: 'none',}}/>
          <Tab label="Form settings" {...tabProps(TabConfigIds.FormSettings)} sx={{textTransform: 'none',}}/>
        </Tabs>
      </Box>

      <AppTabPanel value={value} index={TabConfigIds.Fields}>
        <FormConfiguration
          fieldsSettings={fieldsSettings}
          onFieldAdded={onFieldAdded}
          onFieldDeleted={onFieldDeleted}
          onFieldSettingsChanged={onFieldSettingsChanged}
        />
      </AppTabPanel>

      <AppTabPanel value={value} index={TabConfigIds.FormSettings}>
        <FormSettings onStyleSelected={props.onFormStyleChanged} formStyle={props.formStyle}/>
      </AppTabPanel>

    </Box>
  );
}