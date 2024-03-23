import * as React from "react";
import {FieldSettings, FieldSettingsList, FieldType} from "../configuration/FieldConfiguration";
import {FieldViewListType} from "./FieldView";
import {FormView} from "./FormView";
import {ResponsesTable} from "./ResponsesTable";
import {TextFieldVariants} from "@mui/material/TextField/TextField";
import {AppTabs, SingleTabType, TabViewIds} from "../common/AppTabs";
import {ZoomableView} from "./ZoomableView";

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

  const onTabSelected = (newValue: TabViewIds) => {
    if (newValue === TabViewIds.ViewResponses) {
      setNewResponsesCount(0)
    }
  };

  const tabsData: SingleTabType<TabViewIds>[] = [
    {
      id: TabViewIds.ViewForm,
      title: 'Preview',
      content: <ZoomableView title="Form Preview">
        <FormView formStyle={props.formStyle} fieldsSettings={props.fieldsSettings}
          onSubmit={handleFormSubmit}
        />
      </ZoomableView>
    },
    {
      id: TabViewIds.ViewResponses,
      title: 'Responses',
      badgeContent: newResponsesCount,
      content: <ZoomableView title="Responses Preview">
        <ResponsesTable headers={tableHeaders} rows={tableRows}/>
      </ZoomableView>
    },
  ]
  return <>
    <AppTabs tabsData={tabsData} onTabSelected={onTabSelected}/>
  </>
}