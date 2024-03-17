import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styles from './App.module.css';
import Typography from '@mui/material/Typography';
import {FieldConfiguration, FieldType} from "./configuration/FieldConfiguration";
import {FieldView} from "./view/FieldView";


export default function App() {

  return (
    <div className={styles.content}>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h4" component="div">
            Configure
          </Typography>
          <Typography variant="body1" component="div" sx={{mt: 2}}>
            <FieldConfiguration/>
          </Typography>
        </CardContent>

      </Card>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h4" component="div">
            Preview
          </Typography>
          <Typography variant="body1" component="div">
            <FieldView type={FieldType.textarea} label="Label"/>
            <FieldView type={FieldType.input}/>
          </Typography>

        </CardContent>

      </Card>
    </div>
  );
}