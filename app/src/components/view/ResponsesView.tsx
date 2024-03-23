import * as React from "react";
import {FieldSettings, FieldSettingsList, FieldType} from "../configuration/FieldConfiguration";
import {ResponsesTable} from "./ResponsesTable";
import {FieldViewListType} from "./FieldView";

type ResponsesViewProps = {
  fieldsSettings: FieldSettingsList,
  formValues: ResponsesViewValuesType[]
}

function filterFieldsForTable(fieldsSettings: FieldSettingsList): FieldSettingsList {
  return fieldsSettings.reduce((s: FieldSettings) => s.type !== FieldType.title);
}

export type ResponsesViewValuesType = {
  date: string,
  values: FieldViewListType
}

export function ResponsesView(props: ResponsesViewProps) {
  const tableHeaders: string[] = [
    '#',
    ...filterFieldsForTable(props.fieldsSettings).map((s: FieldSettings) => s.label || '')
  ]

  const tableRows: string [][] = []

  //setresponses
  let newRow = []
  props.formValues.forEach((rowData: ResponsesViewValuesType) => {
    newRow.push(rowData.date)
    Object.keys(rowData.values).forEach((fieldId: string) => {
      newRow.push(rowData.values[fieldId])
    })
    tableRows.push(newRow)
  })


  return <ResponsesTable headers={tableHeaders} rows={tableRows}/>
}