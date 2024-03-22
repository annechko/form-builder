import * as React from 'react';
import styles from './App.module.css';
import {
  FieldSettings,
  FieldSettingsList,
  FieldType
} from "./components/configuration/FieldConfiguration";
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
import {FormView} from "./components/view/FormView";
import {FieldViewListType} from "./components/view/FieldView";

interface AppTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function AppTabPanel(props: AppTabPanelProps) {
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

type ViewTabsProps = {
  formStyle: TextFieldVariants,
  fieldsSettings: FieldSettingsList
}

function filterFieldsForTable(fieldsSettings: FieldSettingsList): FieldSettingsList {
  return fieldsSettings.reduce((s: FieldSettings) => s.type !== FieldType.title);
}

function ViewTabs(props: ViewTabsProps) {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
  React.useEffect(() => {
    setTableHeaders([
      '#',
      ...filterFieldsForTable(props.fieldsSettings).map((s: FieldSettings) => s.label || '')
    ])
    // setTableRows([])
  }, [props.fieldsSettings])
  const [responsesCount, setResponsesCount] = React.useState<number>(0);
  const [tableHeaders, setTableHeaders] = React.useState<string[]>(
    filterFieldsForTable(props.fieldsSettings).map((s: FieldSettings, i: string) => (s.label || ''))
  );
  const [tableRows, setTableRows] = React.useState<{ [id: string]: string }>({});
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

  function handleFormSubmit(newValues: FieldViewListType): void {
    // newValues.reduce()
    // tableRows.push([new Date().toLocaleString(), ...newValues])
    // setTableRows([...tableRows])
    setResponsesCount(responsesCount + 1)
  }

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
      <AppTabPanel value={selectedTabIndex} index={0}>
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
              <FormView formStyle={props.formStyle} fieldsSettings={props.fieldsSettings}
                onSubmit={handleFormSubmit}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
        <FormView formStyle={props.formStyle} fieldsSettings={props.fieldsSettings}
          onSubmit={handleFormSubmit}
        />
      </AppTabPanel>
      <AppTabPanel value={selectedTabIndex} index={1}>
        <ResponsesTable headers={tableHeaders} rows={tableRows}/>
      </AppTabPanel>

    </Box>
  );
}

type ConfigTabsProps = {
  fieldsSettings: FieldSettingsList,
  onFieldSettingsChanged: (id: string) => (newFieldSettings: FieldSettings) => void,
  onFieldDeleted: (id: string/* todo type FieldId*/) => () => void,
  onAddField: (event: object) => void,
  onStyleSelected: (event: React.ChangeEvent, value: string) => void,
  formStyle: TextFieldVariants,
}

function ConfigTabs(props: ConfigTabsProps) {
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

      <AppTabPanel value={value} index={0}>
        <FormConfiguration fieldsSettings={props.fieldsSettings}
          onFieldSettingsChanged={props.onFieldSettingsChanged}
          onAddField={props.onAddField}
          onFieldDeleted={props.onFieldDeleted}
        />
      </AppTabPanel>

      <AppTabPanel value={value} index={1}>
        <FormSettings onStyleSelected={props.onStyleSelected} formStyle={props.formStyle}/>
      </AppTabPanel>

    </Box>
  );
}

export default function App() {
  const defaultSettings: FieldSettings = {type: FieldType.input, label: 'Field'}
  let defaultFieldsSettings: FieldSettingsList = new FieldSettingsList({})
  defaultFieldsSettings.add({type: FieldType.title, label: 'New Form Title'})
  defaultFieldsSettings.add(defaultSettings)

  const [formStyle, setFormStyle] = React.useState<TextFieldVariants>('filled');
  const [fieldsSettings, setFieldsSettings] = React.useState<FieldSettingsList>(defaultFieldsSettings);

  function onStyleSelected(event: React.ChangeEvent, value: string) {
    setFormStyle(value as TextFieldVariants)
  }

  const onAddField = (event: object) => {
    fieldsSettings.add(defaultSettings)
    setFieldsSettings(fieldsSettings.clone())
  }
  const onFieldSettingsChanged = (id: string) => {
    return (newFieldSettings: FieldSettings) => {
      fieldsSettings.update(id, newFieldSettings)
      setFieldsSettings(fieldsSettings.clone())
    }
  }
  const onFieldDeleted = (id: string) => {
    return () => {
      fieldsSettings.remove(id)
      setFieldsSettings(fieldsSettings.clone())
    }
  }

  return (
    <div className={styles.content}>
      <ConfigTabs {...{
        onStyleSelected,
        formStyle,
        fieldsSettings,
        onAddField,
        onFieldDeleted,
        onFieldSettingsChanged
      }}/>
      <ViewTabs {...{fieldsSettings, formStyle}}/>
    </div>
  );
}