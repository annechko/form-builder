import * as React from "react";
import {FieldSettingsList} from "../configuration/FieldConfiguration";
import {FieldViewListType} from "./FieldView";
import {FormView} from "./FormView";
import {TextFieldVariants} from "@mui/material/TextField/TextField";
import {AppTabs, SingleTabType, TabViewIds} from "../common/AppTabs";
import {ZoomableView} from "./ZoomableView";
import {buildTableRows, ResponsesView, ResponsesViewValuesType} from "./ResponsesView";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from "@mui/material/IconButton";
import {Box} from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

type ViewTabsProps = {
  formStyle: TextFieldVariants,
  fieldsSettings: FieldSettingsList
}

function buildCsvContent(rows: string[][]): string {
  const separator: string = ",";
  return rows.map((row: string[]) => {
    return row.map((cell: string) => {
      cell = cell.replace(/"/g, '""');

      if (cell.search(/("|,|\n)/g) >= 0) {
        cell = `"${cell}"`;
      }
      return cell;
    }).join(separator);
  }).join('\n');
}

function downloadCsvFile(csvData: string): void {
  const CSVFile = new Blob([csvData], {type: "text/csv"});
  let tempLink = document.createElement('a');
  tempLink.download = "responses_preview.csv";
  tempLink.href = window.URL.createObjectURL(CSVFile);

  tempLink.style.display = "none";
  document.body.appendChild(tempLink);

  tempLink.click();
  document.body.removeChild(tempLink);
  tempLink.remove()
}

export function ViewTabs(props: ViewTabsProps) {
  const [newResponsesCount, setNewResponsesCount] = React.useState<number>(0);
  const [formValues, setFormValues] = React.useState<ResponsesViewValuesType[]>([]);

  function handleFormSubmit(newValues: FieldViewListType): void {
    const v: ResponsesViewValuesType = {date: new Date().toLocaleString(), values: newValues}
    formValues.push(v)
    setFormValues([...formValues])
    setNewResponsesCount(newResponsesCount + 1)
  }

  const onTabSelected = (newValue: TabViewIds) => {
    if (newValue === TabViewIds.ViewResponses) {
      setNewResponsesCount(0)
    }
  };

  function onDeleteClicked(): void {
    setFormValues([])
  }

  function onCsvClicked() {
    const rows = buildTableRows(props.fieldsSettings.values, formValues)
    downloadCsvFile(buildCsvContent(rows));
  }

  const tabsData: SingleTabType<TabViewIds>[] = [
    {
      id: TabViewIds.ViewForm,
      title: 'Preview',
      content: <>
        <ZoomableView title="Form Preview">
          <FormView formStyle={props.formStyle} fieldsSettings={props.fieldsSettings}
            onSubmit={handleFormSubmit}
          />
        </ZoomableView>
        <FormView formStyle={props.formStyle} fieldsSettings={props.fieldsSettings}
          onSubmit={handleFormSubmit}
        />
      </>
    },
    {
      id: TabViewIds.ViewResponses,
      title: 'Responses',
      badgeContent: newResponsesCount,
      content: <>
        <Box display="flex"
          justifyContent="right">
          <IconButton sx={{
            m: 0,
          }} aria-label="see" size="small" onClick={onCsvClicked}>
            <FileDownloadOutlinedIcon scale={0.5}/>
          </IconButton>
          <IconButton sx={{
            m: 0,
          }} aria-label="see" size="small" onClick={onDeleteClicked}>
            <DeleteForeverIcon scale={0.5}/>
          </IconButton>
          <ZoomableView title="Responses Preview">
            <ResponsesView fieldsSettings={props.fieldsSettings} formValues={formValues}/>
          </ZoomableView>
        </Box>
        <ResponsesView fieldsSettings={props.fieldsSettings} formValues={formValues}/>
      </>
    },
  ]
  return <>
    <AppTabs tabsData={tabsData} onTabSelected={onTabSelected}/>
  </>
}