import * as React from "react";
import {FieldSettings, FieldSettingsList, FieldType} from "../configuration/FieldConfiguration";
import {FieldViewListType} from "./FieldView";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ZoomOutMapSharpIcon from "@mui/icons-material/ZoomOutMapSharp";
import CloseIcon from "@mui/icons-material/Close";
import {FormView} from "./FormView";
import {ResponsesTable} from "./ResponsesTable";
import {TextFieldVariants} from "@mui/material/TextField/TextField";
import {AppTabs, SingleTabType, TabViewIds} from "../common/AppTabs";

type ViewTabsProps = {
  formStyle: TextFieldVariants,
  fieldsSettings: FieldSettingsList
}

function filterFieldsForTable(fieldsSettings: FieldSettingsList): FieldSettingsList {
  return fieldsSettings.reduce((s: FieldSettings) => s.type !== FieldType.title);
}

export function ViewTabs(props: ViewTabsProps) {
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

  function handleFormSubmit(newValues: FieldViewListType): void {
    let newRow = [new Date().toLocaleString()]
    Object.keys(newValues).forEach((id: string) => {
      newRow.push(newValues[id])
    })

    setTableRows([...tableRows, newRow])
    setNewResponsesCount(newResponsesCount + 1)
  }

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

  const onTabSelected = (newValue: TabViewIds) => {
    if (newValue === TabViewIds.ViewResponses) {
      setNewResponsesCount(0)
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const tabsData: SingleTabType<TabViewIds>[] = [
    {
      id: TabViewIds.ViewForm,
      title: 'Preview',
      content: <>
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
      </>
    },
    {
      id: TabViewIds.ViewResponses,
      title: 'Responses',
      badgeContent: newResponsesCount,
      content: <ResponsesTable headers={tableHeaders} rows={tableRows}/>
    },
  ]
  return <>
    <AppTabs tabsData={tabsData} onTabSelected={onTabSelected}/>
  </>
}