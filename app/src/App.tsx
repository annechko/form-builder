import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styles from './App.module.css';
import Typography from '@mui/material/Typography';
import {FieldConfiguration} from "./configuration/FieldConfiguration";

export default function App() {

  return (
    <div className={styles.content}>
      <Card className={styles.card}>
        <CardContent>

         <FieldConfiguration/>
        </CardContent>

      </Card>
      <Card className={styles.card}>
        <CardContent>

          <Typography variant="h4" component="div">
            Preview
          </Typography>

          <Typography variant="body1">
            well meaning and kindly.
            <br/>
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>

      </Card>
    </div>
  );
}