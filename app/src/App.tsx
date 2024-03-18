import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styles from './App.module.css';
import Typography from '@mui/material/Typography';
import {FieldConfiguration, FieldSettings, FieldType} from "./configuration/FieldConfiguration";
import {FieldView} from "./view/FieldView";
import {Box, Button, Divider, FormControlLabel, Switch} from "@mui/material";

function randColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export default function App() {
  const defaultSettings: FieldSettings = {type: FieldType.input}
  const defaultFieldsSettings: FieldSettings[] = [
    defaultSettings,
  ]
  const [fieldsSettings, setFieldsSettings] = React.useState<FieldSettings[]>(defaultFieldsSettings);
  const [debugMode, setDebugMode] = React.useState<boolean>(false);
  const [colors, setColors] = React.useState<string[]>([randColor()]);

  function onToggleDebug() {
    setDebugMode(!debugMode)
  }

  const onAddField = (event: object) => {
    setFieldsSettings([...fieldsSettings, defaultSettings])
    setColors([...colors, randColor()])
  }
  const onFieldSettingsChanged = (index: number) => {
    return (newFieldSettings: FieldSettings) => {
      const newSettings: FieldSettings[] = []
      for (let i = 0; i < fieldsSettings.length; i++) {
        if (i === index) {
          newSettings[i] = newFieldSettings
        } else {
          newSettings[i] = fieldsSettings[i]
        }
      }
      setFieldsSettings(newSettings)
    }
  }
  const fieldsCount: number = fieldsSettings.length

  return (
    <div className={styles.content}>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h4" component="div">
            Configure
            <FormControlLabel control={
              <Switch onChange={onToggleDebug}/>} label="Debug" sx={{ml: 1}}/>
          </Typography>
          <Typography variant="body1" component="div" sx={{mt: 2}}>
            {fieldsSettings.map((s: FieldSettings, i: number) => (
              <div key={i}>
                <Box component="section" sx={{
                  p: 1,
                  border: debugMode ? '1px dashed ' + colors[i] : '1px dashed #ffffff00'
                }}>
                  <FieldConfiguration settings={s} onSettingsChanged={onFieldSettingsChanged(i)}/>
                </Box>
                {i < fieldsCount - 1 && <Divider sx={{mb: 2}}/>}
              </div>
            ))}

            <Button variant="contained" onClick={onAddField}>Add</Button>
          </Typography>
        </CardContent>

      </Card>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h4" component="div">
            Preview
          </Typography>
          <Typography variant="body1" component="div" sx={{mt: 2}}>
            {fieldsSettings.map((s: FieldSettings, i: number) => (
              <div key={i}>
                <Box component="section" sx={{
                  p: 1,
                  border: debugMode ? '1px dashed ' + colors[i] : '1px dashed #ffffff00'
                }}>
                  <FieldView settings={s}/>
                </Box>
              </div>
            ))}
          </Typography>

        </CardContent>

      </Card>
    </div>
  );
}