import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styles from './App.module.css';
import Typography from '@mui/material/Typography';
import {FieldConfiguration, FieldSettings, FieldType} from "./configuration/FieldConfiguration";
import {FieldView} from "./view/FieldView";


export default function App() {
  const defaultSettings: FieldSettings[] = [{type: FieldType.textarea, label: 'Label'}]
  const [fieldSettings, setFieldSettings] = React.useState<FieldSettings[]>(defaultSettings);
  const onSettingsChanged = (newFieldSettings: FieldSettings) => {
    const newSettings: FieldSettings[] = [newFieldSettings]
    setFieldSettings(newSettings)
  }
  return (
    <div className={styles.content}>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h4" component="div">
            Configure
          </Typography>
          <Typography variant="body1" component="div" sx={{mt: 2}}>
            <FieldConfiguration settings={fieldSettings[0]} onSettingsChanged={onSettingsChanged}/>
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
          </Typography>

        </CardContent>

      </Card>
    </div>
  );
}