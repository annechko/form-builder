import * as React from 'react';
import styles from './App.module.css';
import {FieldConfiguration, FieldSettings, FieldType} from "./configuration/FieldConfiguration";
import {FieldView} from "./view/FieldView";
import AddIcon from '@mui/icons-material/Add';
import {
  Badge,
  Box,
  Button,
  Divider,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      className={styles.card}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3,}}>
          <Typography component="div" sx={{
            overflowY: 'scroll',
            maxHeight: '70vh',
            minHeight: '70vh',
            height: 'fit-content'
          }}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type TabsProps = {
  debugMode: boolean,
  colors: string[],
  fieldsSettings: FieldSettings[],

}

type TabsConfProps = {
  debugMode: boolean,
  colors: string[],
  fieldsSettings: FieldSettings[],
  onFieldSettingsChanged: (index: number) => (newFieldSettings: FieldSettings) => void,
  onFieldDeleted: Function,
  fieldsCount: number,
  onAddField: (event: object) => void,
  onToggleDebug: () => void,

}

function ViewTabs(tabsProps: TabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className={styles.card}>
      <Box sx={{borderBottom: 1, borderColor: 'divider', p: 0}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Preview" {...a11yProps(0)} sx={{textTransform: 'none',}}/>

          <Tab label={
            <Badge variant="dot" badgeContent={1} color="primary" {...a11yProps(1)} sx={{textTransform: 'none',}}>
              Responses
            </Badge>}/>

        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>

        <Typography variant="body1" component="div" sx={{mt: 2}}>
          {tabsProps.fieldsSettings.map((s: FieldSettings, i: number) => (
            <div key={i}>
              <Box component="section" sx={{
                p: 1,
                border: tabsProps.debugMode ? '1px dashed ' + tabsProps.colors[i] : '1px dashed #ffffff00'
              }}>
                <FieldView settings={s}/>
              </Box>
            </div>
          ))}
        </Typography>
        <Box
          mt={2}
          display="flex"
          justifyContent="center"

        >
          <Button variant="contained">Test Submit</Button>

        </Box>


      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BasicTable/>
      </CustomTabPanel>

    </Box>
  );
}

function ConfigTabs(tabsProps: TabsConfProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className={styles.card}>
      <Box sx={{borderBottom: 1, borderColor: 'divider', p: 0}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Configure" {...a11yProps(0)} sx={{textTransform: 'none',}}/>
          <Tab label="Form settings" {...a11yProps(1)} sx={{textTransform: 'none',}}/>

        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>

        <Typography variant="body1" component="div" sx={{mt: 2}}>
          {tabsProps.fieldsSettings.map((s: FieldSettings, i: number) => (
            <div key={i}>
              <Box component="section" sx={{
                p: 1,
                pb: 0,
                pt: 2,
                mb: 1,
                border: tabsProps.debugMode ? '1px dashed ' + tabsProps.colors[i] : '1px dashed #ffffff00'
              }}>
                <FieldConfiguration settings={s} onSettingsChanged={tabsProps.onFieldSettingsChanged(i)}
                  onFieldDeleted={tabsProps.onFieldDeleted(i)}
                />
              </Box>
              <Divider/>
            </div>
          ))}
          <IconButton aria-label="delete" onClick={tabsProps.onAddField}>
            <AddIcon/>
          </IconButton>
        </Typography>


      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FormControlLabel control={
          <Switch onChange={tabsProps.onToggleDebug}/>} label="Debug" checked={tabsProps.debugMode === true}/>
      </CustomTabPanel>

    </Box>
  );
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return {name, calories, fat};
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function BasicTable() {
  return (
    <TableContainer component={Paper} sx={{maxWidth: 400, overflowX: 'scroll'}}>
      <Table sx={{minWidth: 500, overflowX: 'scroll'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">D&nbsp;(g)</TableCell>
            <TableCell align="right">D&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

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
          newSettings.push(newFieldSettings)
        } else {
          newSettings.push(fieldsSettings[i])
        }
      }
      setFieldsSettings(newSettings)
    }
  }
  const onFieldDeleted = (index: number) => {
    return () => {
      const newSettings: FieldSettings[] = []
      for (let i = 0; i < fieldsSettings.length; i++) {
        if (i !== index) {
          newSettings.push(fieldsSettings[i])
        }
      }
      setFieldsSettings(newSettings)
      colors.splice(index, 1)
      setColors([...colors])

    }
  }
  const fieldsCount: number = fieldsSettings.length

  return (
    <div className={styles.content}>
      <ConfigTabs {...{
        debugMode,
        onToggleDebug,
        colors,
        fieldsSettings,
        fieldsCount,
        onAddField,
        onFieldDeleted,
        onFieldSettingsChanged
      }}/>
      <ViewTabs {...{debugMode, colors, fieldsSettings}}/>
    </div>
  );
}