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


enum TabConfigIds {
  Fields = 0,
  FormSettings = 1,
}

enum TabViewIds {
  Preview = 0,
  Responses = 1,
}

interface AppTabPanelProps {
  children?: React.ReactNode;
  index: TabConfigIds | TabViewIds,
  value: TabConfigIds | TabViewIds,
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

function tabProps(index: TabConfigIds | TabViewIds) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
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
  const [selectedTabIndex, setSelectedTabIndex] = React.useState<TabViewIds>(TabViewIds.Preview);
  React.useEffect(() => {
    setTableHeaders([
      '#',
      ...filterFieldsForTable(props.fieldsSettings).map((s: FieldSettings) => s.label || '')
    ])
    setTableRows([])
  }, [props.fieldsSettings])
  const [newResponsesCount, setNewResponsesCount] = React.useState<number>(0);
  const [tableHeaders, setTableHeaders] = React.useState<string[]>(
    filterFieldsForTable(props.fieldsSettings).map((s: FieldSettings, i: string) => (s.label || ''))
  );
  const [tableRows, setTableRows] = React.useState<string [][]>([]);
  const [open, setOpen] = React.useState(false);
  const descriptionElementRef = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    if (open) {
      const {current: descriptionElement} = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const onTabSelected = (event: React.SyntheticEvent, newValue: TabViewIds) => {
    setSelectedTabIndex(newValue);
    if (newValue === TabViewIds.Responses) {
      setNewResponsesCount(0)
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleFormSubmit(newValues: FieldViewListType): void {
    let newRow = [new Date().toLocaleString()]
    Object.keys(newValues).forEach((id: string) => {
      newRow.push(newValues[id])
    })

    setTableRows([...tableRows, newRow])
    setNewResponsesCount(newResponsesCount + 1)
  }

  return (
    <Box className={styles.card}>
      <Box sx={{borderBottom: 1, borderColor: 'divider', p: 0}}>
        <Tabs value={selectedTabIndex} onChange={onTabSelected} aria-label="basic tabs example">
          <Tab label="Preview" {...tabProps(TabViewIds.Preview)} sx={{textTransform: 'none',}}/>

          <Tab label={
            <Badge variant="dot" badgeContent={newResponsesCount} color="primary"
              {...tabProps(TabViewIds.Responses)}
              sx={{textTransform: 'none',}}>
              Responses
            </Badge>}/>

        </Tabs>
      </Box>
      <AppTabPanel value={selectedTabIndex} index={TabViewIds.Preview}>
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
      <AppTabPanel value={selectedTabIndex} index={TabViewIds.Responses}>
        <ResponsesTable headers={tableHeaders} rows={tableRows}/>
      </AppTabPanel>

    </Box>
  );
}

type ConfigTabsProps = {
  onFieldsSettingsChanged: (newSettings: FieldSettingsList) => void,
  onFormStyleChanged: (event: React.ChangeEvent, value: string) => void,
  formStyle: TextFieldVariants,
}

function ConfigTabs(props: ConfigTabsProps) {
  const [value, setValue] = React.useState<TabConfigIds>(TabConfigIds.Fields);

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabConfigIds) => {
    setValue(newValue);
  };

  return (
    <Box className={styles.card}>
      <Box sx={{borderBottom: 1, borderColor: 'divider', p: 0}}>
        <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Configure" {...tabProps(TabConfigIds.Fields)} sx={{textTransform: 'none',}}/>
          <Tab label="Form settings" {...tabProps(TabConfigIds.FormSettings)} sx={{textTransform: 'none',}}/>
        </Tabs>
      </Box>

      <AppTabPanel value={value} index={TabConfigIds.Fields}>
        <FormConfiguration
          onFieldsSettingsChanged={props.onFieldsSettingsChanged}
        />
      </AppTabPanel>

      <AppTabPanel value={value} index={TabConfigIds.FormSettings}>
        <FormSettings onStyleSelected={props.onFormStyleChanged} formStyle={props.formStyle}/>
      </AppTabPanel>

    </Box>
  );
}

export default function App() {
  const [formStyle, setFormStyle] = React.useState<TextFieldVariants>('filled');
  const [fieldsSettings, setFieldsSettings] = React.useState<FieldSettingsList>(new FieldSettingsList());

  function onFormStyleChanged(event: React.ChangeEvent, value: string) {
    setFormStyle(value as TextFieldVariants)
  }

  function onFieldsSettingsChanged(settings: FieldSettingsList) {
    setFieldsSettings(settings)
  }

  return (
    <div className={styles.content}>
      <ConfigTabs {...{
        formStyle,
        onFormStyleChanged,
        onFieldsSettingsChanged
      }}/>
      <ViewTabs {...{fieldsSettings, formStyle}}/>
    </div>
  );
}