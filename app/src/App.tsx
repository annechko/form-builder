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
    {type: FieldType.textarea, label: 'Label'},
  ]
  const [fieldSettings, setFieldSettings] = React.useState<FieldSettings[]>(defaultSettings);

  const onFieldSettingsChanged = (index: number) => {
    return (newFieldSettings: FieldSettings) => {
      const newSettings: FieldSettings[] = []
      for (let i = 0; i < fieldSettings.length; i++) {
        if (i === index) {
          newSettings[i] = newFieldSettings
        } else {
          newSettings[i] = fieldSettings[i]
        }
      }
      setFieldSettings(newSettings)
    }
  }

  return (
    <div className={styles.content}>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h4" component="div">
            Configure
          </Typography>
          <Typography variant="body1" component="div" sx={{mt: 2}}>
            <FieldConfiguration settings={fieldSettings[0]} onSettingsChanged={onFieldSettingsChanged(0)}/>
            <Divider sx={{mb: 2}}/>
            <FieldConfiguration settings={fieldSettings[1]} onSettingsChanged={onFieldSettingsChanged(1)}/>
            <Button variant="contained">Add</Button>
          </Typography>
        </CardContent>

      </Card>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h4" component="div">
            Preview
          </Typography>
          <Typography variant="body1" component="div">
            <FieldView settings={fieldSettings[0]}/>
            <FieldView settings={fieldSettings[1]}/>
          </Typography>

        </CardContent>

      </Card>
    </div>
  );
}