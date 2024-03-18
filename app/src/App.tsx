import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styles from './App.module.css';
import Typography from '@mui/material/Typography';
import {FieldConfiguration, FieldSettings, FieldType} from "./configuration/FieldConfiguration";
import {FieldView} from "./view/FieldView";
import {Button, Divider} from "@mui/material";

export default function App() {
  const defaultSettings: FieldSettings[] = [
    {type: FieldType.textarea, label: 'Label'},
  ]
  const [fieldsSettings, setFieldsSettings] = React.useState<FieldSettings[]>(defaultSettings);

  const onAddField = (event: object) => {
    const newSettings: FieldSettings[] = []
    for (let i = 0; i < fieldsSettings.length; i++) {
      newSettings[i] = fieldsSettings[i]
    }
    newSettings.push({type: FieldType.input, label: 'Label'})
    setFieldsSettings(newSettings)
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
          </Typography>
          <Typography variant="body1" component="div" sx={{mt: 2}}>
            {fieldsSettings.map((s: FieldSettings, i: number) => (
              <div key={i}>
                <FieldConfiguration settings={s} onSettingsChanged={onFieldSettingsChanged(i)}/>
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
          <Typography variant="body1" component="div">
            {fieldsSettings.map((s: FieldSettings, i: number) => (
              <FieldView key={i} settings={s}/>
            ))}
          </Typography>

        </CardContent>

      </Card>
    </div>
  );
}