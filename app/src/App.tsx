import * as React from 'react';
import styles from './App.module.css';
import {FieldSettings, FieldType} from "./components/configuration/FieldConfiguration";
import {FieldView} from "./components/view/FieldView";
import CloseIcon from '@mui/icons-material/Close';
import ZoomOutMapSharpIcon from '@mui/icons-material/ZoomOutMapSharp';
import {Badge, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import {TextFieldVariants} from "@mui/material/TextField/TextField";
import {FormSettings} from "./components/configuration/FormSettings";
import {FormConfiguration} from "./components/configuration/FormConfiguration";
import {ResponsesTable} from "./components/view/ResponsesTable";

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
        <Box sx={{p: 3, pt: 1}}>
          <Typography component="div" sx={{
            overflowY: 'scroll',
            maxHeight: '70vh',
            minHeight: '70vh',
            minWidth: '40vh',
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
  formStyle: TextFieldVariants,
  fieldsSettings: FieldSettings[],
}

type TabsConfProps = {
  fieldsSettings: FieldSettings[],
  onFieldSettingsChanged: (index: number) => (newFieldSettings: FieldSettings) => void,
  onFieldDeleted: (i: number) => () => void,
  fieldsCount: number,
  onAddField: (event: object) => void,
  onStyleSelected: (event: React.ChangeEvent, value: string) => void,
  formStyle: TextFieldVariants,
}
type FieldsValueErrors = { [index: string]: { message: string } }

function ViewTabs(tabsProps: TabsProps) {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
  React.useEffect(() => {
    setTableHeaders(['#', ...tabsProps.fieldsSettings.map((s: FieldSettings) => s.label || '')])
    setTableRows([])
  }, [tabsProps.fieldsSettings])
  const [responsesCount, setResponsesCount] = React.useState<number>(0);
  const [tableHeaders, setTableHeaders] = React.useState<string[]>(
    tabsProps.fieldsSettings.map((s: FieldSettings, i: number) => (s.label || '') + i)
  );
  const [tableRows, setTableRows] = React.useState<string[][]>([]);
  const [open, setOpen] = React.useState(false);
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const {current: descriptionElement} = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const onTabSelected = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTabIndex(newValue);
    if (newValue === 1) {
      setResponsesCount(0)
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className={styles.card}>
      <Box sx={{borderBottom: 1, borderColor: 'divider', p: 0}}>
        <Tabs value={selectedTabIndex} onChange={onTabSelected} aria-label="basic tabs example">
          <Tab label="Preview" {...a11yProps(0)} sx={{textTransform: 'none',}}/>

          <Tab label={
            <Badge variant="dot" badgeContent={responsesCount} color="primary" {...a11yProps(1)}
              sx={{textTransform: 'none',}}>
              Responses
            </Badge>}/>

        </Tabs>
      </Box>
      <CustomTabPanel value={selectedTabIndex} index={0}>
        <React.Fragment>
          <Box mt={0}
            display="flex"
            justifyContent="right">
            <IconButton sx={{
              mt: 0,
              mb: 1,
              pb: 0,
              pt: 0,
              pr: 0
            }} aria-label="see" onClick={handleClickOpen}>
              <ZoomOutMapSharpIcon/>
            </IconButton>
          </Box>
          <Dialog
            open={open}
            onClose={handleClose}
            scroll="paper"
            component="div"
            fullWidth
            maxWidth="md"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">Form Preview</DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon/>
            </IconButton>
            <DialogContent dividers
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              sx={{minHeight: '70vh'}}
              tabIndex={-1}
            >
              <FormView formStyle={tabsProps.formStyle} fieldsSettings={tabsProps.fieldsSettings}
                responsesCount={responsesCount} tableRows={tableRows}
                setTableRows={setTableRows} setResponsesCount={setResponsesCount}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
        <FormView formStyle={tabsProps.formStyle} fieldsSettings={tabsProps.fieldsSettings}
          responsesCount={responsesCount} tableRows={tableRows}
          setTableRows={setTableRows} setResponsesCount={setResponsesCount}
        />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTabIndex} index={1}>
        <ResponsesTable headers={tableHeaders} rows={tableRows}/>
      </CustomTabPanel>

    </Box>
  );
}

type FormViewProps = {
  responsesCount: number;
  formStyle: TextFieldVariants,
  fieldsSettings: FieldSettings[],
  tableRows: string[][],
  setTableRows: (tableRows: string[][]) => void,
  setResponsesCount: (n: number) => void,
}

function FormView(_props: FormViewProps) {
  const [fieldValues, setFieldValues] = React.useState<string[]>([]);
  const [errors, setErrors] = React.useState<FieldsValueErrors>({});

  function validateValues(
    fieldValues: string[],
    fieldsSettings: FieldSettings[]): FieldsValueErrors {
    let _errors: FieldsValueErrors = {};
    fieldsSettings.forEach((settings: FieldSettings, index: number) => {
      if (settings.isRequired && (fieldValues[index] === '' || fieldValues[index] === undefined)) {
        _errors[index] = {message: 'Required field'}
      }
    })

    return _errors;
  }

  const onSubmitResponse = () => {
    const errorsUpdated = validateValues(fieldValues, _props.fieldsSettings)
    setErrors(errorsUpdated)
    if (Object.keys(errorsUpdated).length === 0) {
      _props.tableRows.push([new Date().toLocaleString(), ...fieldValues])
      _props.setTableRows([..._props.tableRows])
      setFieldValues([])
      _props.setResponsesCount(_props.responsesCount + 1)
    }
  };

  function onFieldValueChange(fieldIndex: number) {
    return (event?: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event) {
        fieldValues[fieldIndex] = event.target.value
        setFieldValues([...fieldValues])
      }
    }
  }

  return <>
    <Box
      display="flex"
      justifyContent="center"
    >
      <form style={{minWidth: "30vw"}}>
        <Typography variant="body1" component="div">
          {_props.fieldsSettings.map((s: FieldSettings, i: number) => (
            <div key={i}>
              <Box component="section" sx={{pr: 0, pl: 0}}>
                <FieldView settings={s} onChange={onFieldValueChange(i)} value={fieldValues[i]}
                  variant={_props.formStyle}
                  error={errors[i]}/>
              </Box>
            </div>
          ))}
        </Typography>
        <Box
          mt={2}
          display="flex"
          justifyContent="center"
        >
          <Button variant="contained" onClick={onSubmitResponse}
            disabled={_props.fieldsSettings.length === 0}>Test Submit</Button>

        </Box>
      </form>
    </Box>
  </>
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

        <FormConfiguration fieldsSettings={tabsProps.fieldsSettings}
          onFieldSettingsChanged={tabsProps.onFieldSettingsChanged}
          onAddField={tabsProps.onAddField}
          onFieldDeleted={tabsProps.onFieldDeleted}
        />

      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>

        <FormSettings onStyleSelected={tabsProps.onStyleSelected} formStyle={tabsProps.formStyle}/>
      </CustomTabPanel>

    </Box>
  );
}

export default function App() {
  const defaultSettings: FieldSettings = {type: FieldType.input}
  const defaultFieldsSettings: FieldSettings[] = [
    defaultSettings,
  ]
  const [formStyle, setFormStyle] = React.useState<TextFieldVariants>('filled');
  const [fieldsSettings, setFieldsSettings] = React.useState<FieldSettings[]>(defaultFieldsSettings);

  function onStyleSelected(event: React.ChangeEvent, value: string) {
    setFormStyle(value as TextFieldVariants)
  }

  const onAddField = (event: object) => {
    setFieldsSettings([...fieldsSettings, defaultSettings])
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
    }
  }
  const fieldsCount: number = fieldsSettings.length

  return (
    <div className={styles.content}>
      <ConfigTabs {...{
        onStyleSelected,
        formStyle,
        fieldsSettings,
        fieldsCount,
        onAddField,
        onFieldDeleted,
        onFieldSettingsChanged
      }}/>
      <ViewTabs {...{fieldsSettings, formStyle}}/>
    </div>
  );
}