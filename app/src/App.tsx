import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styles from './App.module.css';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

export default function App() {
  const [age, setAge] = React.useState('input');
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <div className={styles.content}>
      <Card className={styles.card}>
        <CardContent>

          <Typography variant="h4" component="div">
            Configure
          </Typography>
          <Typography variant="body1" component="div">
            <TextField id="outlined-basic" label="Field name" variant="outlined" size="small" fullWidth sx={{mt: 2}}/>
            <FormControl sx={{mt: 2, minWidth: 120}} fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"

                value={age}
                label="Type"
                onChange={handleChange}
              >

                <MenuItem value={'input'}>input</MenuItem>
                <MenuItem value={'textarea'}>textarea</MenuItem>
              </Select>
            </FormControl>
          </Typography>
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