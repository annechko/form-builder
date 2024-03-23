import * as React from "react";
import {
  FieldSettingsList,
  FieldSettingsListType,
  FieldType
} from "../configuration/FieldConfiguration";
import {ResponsesTable} from "./ResponsesTable";
import {FieldViewListType} from "./FieldView";

export type ResponsesViewValuesType = {
  date: string,
  values: FieldViewListType
}

type ResponsesViewProps = {
  fieldsSettings: FieldSettingsList,
  formValues: ResponsesViewValuesType[]
}
// todo move logic
export function buildTableRows(
  settings: FieldSettingsListType,
  values: ResponsesViewValuesType[]): string [][] {

  let tableHeaders: string[] = ['#']
  let tableRows: string [][] = []
  values.forEach((values: ResponsesViewValuesType, i) => {
    tableRows[i] = [values.date]
  })

  Object.keys(settings).forEach((fieldId: string) => {
    if (settings[fieldId].type === FieldType.title) {
      return;
    }
    tableHeaders.push(settings[fieldId].label || '')
    values.forEach((values: ResponsesViewValuesType, vIndex: number) => {
      tableRows[vIndex].push(values.values[fieldId])
    })
  })
  return [
    tableHeaders,
    ...tableRows
  ]
}

export function ResponsesView(props: ResponsesViewProps) {
  const settings: FieldSettingsListType = props.fieldsSettings.values
  const values: ResponsesViewValuesType[] = props.formValues
  const rows = buildTableRows(settings, values)
  const tableHeaders: string[] = rows.at(0) as string[]
  const tableRows: string [][] = rows.splice(1, rows.length)

  return <ResponsesTable headers={tableHeaders} rows={tableRows}/>
}