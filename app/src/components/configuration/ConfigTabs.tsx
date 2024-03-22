import * as React from "react";
import {AppTabPanel, TabConfigIds, tabProps} from "../common/AppTabPanel";
import {Box} from "@mui/material";
import styles from "../../App.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {FormConfiguration} from "./FormConfiguration";
import {FormSettings} from "./FormSettings";
import {FieldSettingsList} from "./FieldConfiguration";
import {TextFieldVariants} from "@mui/material/TextField/TextField";

type ConfigTabsProps = {
  onFieldsSettingsChanged: (newSettings: FieldSettingsList) => void,
  onFormStyleChanged: (event: React.ChangeEvent, value: string) => void,
  formStyle: TextFieldVariants,
}

export function ConfigTabs(props: ConfigTabsProps) {
  const [value, setValue] = React.useState<TabConfigIds>(TabConfigIds.Fields);

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
          onFieldsSettingsChanged={props.onFieldsSettingsChanged}
        />
      </AppTabPanel>

      <AppTabPanel value={value} index={TabConfigIds.FormSettings}>
        <FormSettings onStyleSelected={props.onFormStyleChanged} formStyle={props.formStyle}/>
      </AppTabPanel>

    </Box>
  );
}