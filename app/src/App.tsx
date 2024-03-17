import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styles from './App.module.css';
import Typography from '@mui/material/Typography';
import {FieldConfiguration} from "./configuration/FieldConfiguration";

enum FieldType {
  input = "input",
  textarea = "textarea",
}

type FieldViewProps = {
  type: FieldType
};

function FieldView(options: FieldViewProps) {
  if (options.type === FieldType.input) {
    return <>
      input
    </>
  } else if (options.type === FieldType.textarea) {
    return <>
      textarea
    </>
  }

}

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
          <Typography variant="body1" sx={{mt: 2}}>
            <FieldView type={FieldType.textarea}/>
          </Typography>

        </CardContent>

      </Card>
    </div>
  );
}