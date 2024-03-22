import * as React from 'react';
import styles from './App.module.css';
import {FieldSettingsList} from "./components/configuration/FieldConfiguration";
import {TextFieldVariants} from "@mui/material/TextField/TextField";
import {ViewTabs} from "./components/view/ViewTabs";
import {ConfigTabs} from "./components/configuration/ConfigTabs";

export default function App() {
  const [formStyle, setFormStyle] = React.useState<TextFieldVariants>('filled');
  const [fieldsSettings, setFieldsSettings] = React.useState<FieldSettingsList>(new FieldSettingsList());

  function onFormStyleChanged(event: React.ChangeEvent, value: string) {
    setFormStyle(value as TextFieldVariants)
  }

  function onFieldsSettingsChanged(settings: FieldSettingsList) {
    setFieldsSettings(settings)
  }

  return (
    <div className={styles.content}>
      <ConfigTabs {...{formStyle, onFormStyleChanged, onFieldsSettingsChanged}}/>
      <ViewTabs {...{fieldsSettings, formStyle}}/>
    </div>
  );
}