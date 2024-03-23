import * as React from "react";
import {FormConfiguration} from "./FormConfiguration";
import {FormSettings} from "./FormSettings";
import {FieldSettings, FieldSettingsList, FieldType} from "./FieldConfiguration";
import {TextFieldVariants} from "@mui/material/TextField/TextField";
import {AppTabs, SingleTabType, TabConfigIds} from "../common/AppTabs";
import {nanoid} from "nanoid";

type ConfigTabsProps = {
  onFieldsSettingsChanged: (newSettings: FieldSettingsList) => void,
  onFormStyleChanged: (event: React.ChangeEvent, value: string) => void,
  formStyle: TextFieldVariants,
}

export function ConfigTabs(props: ConfigTabsProps) {
  function defaultSettings(): FieldSettings {
    return {id: nanoid(), type: FieldType.input, label: 'Field'};
  }

  let defaultFieldsSettings: FieldSettingsList = new FieldSettingsList({})
  defaultFieldsSettings.add({id: nanoid(), type: FieldType.title, label: 'New Form Title'})
  defaultFieldsSettings.add(defaultSettings())

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
    fieldsSettings.add(defaultSettings())
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

  const tabsData: SingleTabType<TabConfigIds>[] = [
    {
      id: TabConfigIds.ConfigForm,
      title: 'Configure',
      content: <FormConfiguration
        fieldsSettings={fieldsSettings}
        onFieldAdded={onFieldAdded}
        onFieldDeleted={onFieldDeleted}
        onFieldSettingsChanged={onFieldSettingsChanged}
      />
    },
    {
      id: TabConfigIds.ConfigSettings,
      title: 'Form settings',
      content:
        <FormSettings onStyleSelected={props.onFormStyleChanged} formStyle={props.formStyle}/>
    },
  ]
  return <>
    <AppTabs tabsData={tabsData}/>
  </>

}